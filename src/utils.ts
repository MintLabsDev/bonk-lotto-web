import { WalletContextState } from "@solana/wallet-adapter-react";
import { deserialize } from "borsh";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import BN from "bn.js";
import {
  Dist,
  Game,
  GameSchema,
  Lottery,
  LotterySchema,
  Records,
  RecordsSchema,
  Ticket,
} from "./models";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  //TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { bonk_mint, lottery_account, program_id, record_account } from "./accounts";
import { connection } from "./connection";
import { current_lottery_no, get_distribution } from "./distribution";

// var BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
// var bs58 = require("base-x")(BASE58);

export const get_ticket_by_lottery_no = async (
  wallet: WalletContextState,
  lottery_no: number,
) => {
  const lottery_no_str = bs58.encode([lottery_no]);

  const coupons_of_the_player = await connection.getProgramAccounts(
    program_id,
    {
      filters: [
        {
          dataSize: 47,
        },
        {
          memcmp: {
            offset: 6,
            bytes: wallet.publicKey!.toString(),
          },
        },
        {
          memcmp: {
            offset: 39,
            bytes: lottery_no_str,
          },
        },
      ],
    },
  );

  return coupons_of_the_player[0].pubkey;
};

export const get_my_tickets = async (wallet: WalletContextState) => {
  const tickets: Ticket[] = [];

  const coupons_of_the_player = await connection.getProgramAccounts(
    program_id,
    {
      filters: [
        {
          dataSize: 47,
        },
        {
          memcmp: {
            offset: 6,
            bytes: wallet.publicKey!.toString(),
          },
        },
      ],
    },
  );
  for (let index = 0; index < coupons_of_the_player.length; index++) {
    const key = coupons_of_the_player[index].pubkey;
    const data = coupons_of_the_player[index].account.data;
    const coupon = deserialize(GameSchema, Game, data);
    const ticket = await create_ticket(coupon, key);

    tickets.push(ticket);
  }
  return tickets;
};

export const get_lottery_schema = async () => {
  const lotto = await connection.getAccountInfo(lottery_account);

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const lotto_data = deserialize(LotterySchema, Lottery, lotto?.data!);

  return new BN(lotto_data.lottery_time);
};

export const get_current_lottery_no = async () => {
  const record = await connection.getAccountInfo(record_account);

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const record_data = deserialize(RecordsSchema, Records, record?.data!);

  return record_data.lottery_no;
};

export const get_prize_pool = async () => {
  const record_info = await connection.getAccountInfo(record_account)
  const record = deserialize(RecordsSchema,Records,record_info?.data)
  const active_main_counter_no = record.active_main_counter_no;
  const counter_no_1 = 1;
  const counter_no_2 = 2;
  const seed_1 = [Buffer.from("m"),Buffer.from(active_main_counter_no.toString()),Buffer.from("c"),Buffer.from(counter_no_1.toString())];
  const seed_2 = [Buffer.from("m"),Buffer.from(active_main_counter_no.toString()),Buffer.from("c"),Buffer.from(counter_no_2.toString())];
  const counter_account_1 = PublicKey.findProgramAddressSync(seed_1,program_id);
  const counter_account_2 = PublicKey.findProgramAddressSync(seed_2,program_id);
  const counter_ata_1 = getAssociatedTokenAddressSync(bonk_mint,counter_account_1[0],true,TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID);
  const counter_ata_2 = getAssociatedTokenAddressSync(bonk_mint,counter_account_2[0],true,TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID);

  const balance = (await connection.getTokenAccountBalance(counter_ata_1)).value.uiAmount!
  const balance2 = (await connection.getTokenAccountBalance(counter_ata_2)).value.uiAmount!

  const total = Math.floor(balance+balance2)

  return total;
}

const check_matches = (game: Game, dist: Dist) => {
  const arr: number[] = [
    game.number1,
    game.number2,
    game.number3,
    game.number4,
    game.number5,
    game.number6,
    dist.lucky_number1,
    dist.lucky_number2,
    dist.lucky_number3,
    dist.lucky_number4,
    dist.lucky_number5,
    dist.lucky_number6,
  ];

  const unique = new Set(arr);

  let matches = 0;
  let prize_amount = 0;

  if (unique.size == 6) {
    matches = 6;
    prize_amount = dist.prize_amount_6;
  } else if (unique.size == 7) {
    matches = 5;
    prize_amount = dist.prize_amount_5;
  } else if (unique.size == 8) {
    matches = 4;
    prize_amount = dist.prize_amount_4;
  } else if (unique.size == 9) {
    matches = 3;
    prize_amount = dist.prize_amount_3;
  } else {
    matches = 0;
    prize_amount = 0;
  }

  return [matches, prize_amount];
};

const create_ticket = async (coupon: Game, key: PublicKey) => {
  const ticket = new Ticket();
  ticket.number1 = coupon.number1;
  ticket.number2 = coupon.number2;
  ticket.number3 = coupon.number3;
  ticket.number4 = coupon.number4;
  ticket.number5 = coupon.number5;
  ticket.number6 = coupon.number6;
  ticket.lottery_no = coupon.lottery_no;
  ticket.account_address = key;

  if (coupon.lottery_no < current_lottery_no) {
    ticket.can_be_claimed = true;

    const distribution = await get_distribution(coupon.lottery_no);

    const [matches, prize_amount] = check_matches(coupon, distribution);

    ticket.lucky_number1 = distribution.lucky_number1;
    ticket.lucky_number2 = distribution.lucky_number2;
    ticket.lucky_number3 = distribution.lucky_number3;
    ticket.lucky_number4 = distribution.lucky_number4;
    ticket.lucky_number5 = distribution.lucky_number5;
    ticket.lucky_number6 = distribution.lucky_number6;
    ticket.matches = matches;

    if (matches > 0) {
      ticket.wins = true;
    }

    ticket.prize_amount = prize_amount;
    ticket.meme = distribution.meme;
  } else {
    ticket.can_be_claimed = false;
  }

  return ticket;
};
function getAssociatedTokenAddressSync(bonk_mint: any, arg1: any, arg2: boolean, TOKEN_PROGRAM_ID: any, ASSOCIATED_TOKEN_PROGRAM_ID: any) {
  throw new Error("Function not implemented.");
}

