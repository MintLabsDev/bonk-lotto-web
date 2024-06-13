import {
  Keypair,
  PublicKey,
  SignatureStatusConfig,
  SystemProgram,
  TransactionConfirmationStrategy,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  //   TOKEN_2022_PROGRAM_ID,
  //   TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { /* deserialize, */ serialize } from "borsh";
import { WalletContextState } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { Amount, AmountSchema, Game, GameSchema } from "./models";
import {
  manager_account,
  program_id,
  record_account,
  terms_account,
} from "./accounts";

import { connection } from "./connection";

// var BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
// var bs58 = require("base-x")(BASE58);

export const play = async (
  meme_mint: PublicKey,
  token_program: PublicKey,
  price_feed_account: PublicKey,
  number_of_counters: number,
  active_main_counter_no: number,
  pickedNumber_1: number,
  pickedNumber_2: number,
  pickedNumber_3: number,
  pickedNumber_4: number,
  pickedNumber_5: number,
  pickedNumber_6: number,
  wallet: WalletContextState,
) => {
  const game = new Game();

  game.number1 = pickedNumber_1;
  game.number2 = pickedNumber_2;
  game.number3 = pickedNumber_3;
  game.number4 = pickedNumber_4;
  game.number5 = pickedNumber_5;
  game.number6 = pickedNumber_6;

  const encoded = serialize(GameSchema, game);

  const concated = Uint8Array.of(1, ...encoded);

  const counter_no = Math.floor(Math.random() * number_of_counters) + 1;

  const seed = [
    Buffer.from("m"),
    Buffer.from(active_main_counter_no.toString()),
    Buffer.from("c"),
    Buffer.from(counter_no.toString()),
  ];

  const coupon_account = Keypair.generate();
  const counter_account = PublicKey.findProgramAddressSync(seed, program_id);
  const player_meme_ata = getAssociatedTokenAddressSync(
    meme_mint,
    wallet.publicKey!,
    false,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const counter_ata = getAssociatedTokenAddressSync(
    meme_mint,
    counter_account[0],
    true,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  const whitelist_seed = [Buffer.from("w"), meme_mint.toBytes()];
  const whitelist_account = PublicKey.findProgramAddressSync(
    whitelist_seed,
    program_id,
  );

  const ix = new TransactionInstruction({
    programId: program_id,
    keys: [
      { isSigner: true, isWritable: true, pubkey: wallet.publicKey! }, //player
      { isSigner: true, isWritable: true, pubkey: coupon_account.publicKey }, //coupon_account
      { isSigner: false, isWritable: true, pubkey: player_meme_ata }, //player_meme_ata
      { isSigner: false, isWritable: true, pubkey: counter_account[0] }, //counter_account
      { isSigner: false, isWritable: true, pubkey: counter_ata }, //counter_ata
      { isSigner: false, isWritable: true, pubkey: meme_mint }, //meme_mint
      { isSigner: false, isWritable: true, pubkey: token_program }, //token_program_id
      { isSigner: false, isWritable: false, pubkey: record_account }, //records_account
      { isSigner: false, isWritable: false, pubkey: terms_account }, //terms_account
      { isSigner: false, isWritable: false, pubkey: price_feed_account }, //price_feed_account
      { isSigner: false, isWritable: false, pubkey: whitelist_account[0] }, //whitelist
      { isSigner: false, isWritable: true, pubkey: SystemProgram.programId },
    ],
    data: Buffer.from(concated),
  });

  const message = new TransactionMessage({
    instructions: [ix],
    payerKey: wallet.publicKey!,
    recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);

  tx.sign([coupon_account]);

  return send_transaction(wallet, tx);
};

export const claim_your_reward_or_return_deposit = async (
  meme_mint: PublicKey,
  token_program: PublicKey,
  coupon_account: PublicKey,
  lottery_no: number,
  wallet: WalletContextState,
) => {
  const player_ata = getAssociatedTokenAddressSync(
    meme_mint,
    wallet.publicKey!,
    false,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const distribution_account = PublicKey.findProgramAddressSync(
    [Buffer.from("dist"), Buffer.from(lottery_no.toString())],
    program_id,
  );
  const distribution_ata = getAssociatedTokenAddressSync(
    meme_mint,
    distribution_account[0],
    true,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const lucky_numbers_account = PublicKey.findProgramAddressSync(
    [Buffer.from("luck"), Buffer.from(lottery_no.toString())],
    program_id,
  );

  const ix = new TransactionInstruction({
    programId: program_id,
    keys: [
      { isSigner: true, isWritable: true, pubkey: wallet.publicKey! },
      { isSigner: false, isWritable: true, pubkey: player_ata },
      { isSigner: false, isWritable: true, pubkey: meme_mint },
      { isSigner: false, isWritable: true, pubkey: coupon_account },
      { isSigner: false, isWritable: false, pubkey: lucky_numbers_account[0] },
      { isSigner: false, isWritable: false, pubkey: distribution_account[0] },
      { isSigner: false, isWritable: true, pubkey: distribution_ata },
      { isSigner: false, isWritable: true, pubkey: token_program },
    ],
    data: Buffer.from([13]),
  });

  const message = new TransactionMessage({
    instructions: [ix],
    payerKey: wallet.publicKey!,
    recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);

  return send_transaction(wallet, tx);
};
export const buy_other_tokens_from_program = async (
  meme_mint: PublicKey,
  token_program: PublicKey,
  price_feed: PublicKey,
  whitelist_account_mint_of_the_week: PublicKey,
  lottery_no: number,
  token_amount: bigint,
  wallet: WalletContextState,
) => {
  const seed = [Buffer.from("w"), meme_mint.toBytes()];
  const whitelist_account = PublicKey.findProgramAddressSync(seed, program_id);

  const temp = Keypair.generate();
  const amount = new Amount();
  amount.lamports = token_amount;
  const encoded = serialize(AmountSchema, amount);
  const concated = Uint8Array.of(8, ...encoded);

  const player_ata = getAssociatedTokenAddressSync(
    meme_mint,
    wallet.publicKey!,
    false,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const whitelist_ata = getAssociatedTokenAddressSync(
    meme_mint,
    whitelist_account[0],
    true,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

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

  const coupon_account = coupons_of_the_player[0].pubkey;

  const ix = new TransactionInstruction({
    programId: program_id,
    keys: [
      { isSigner: true, isWritable: true, pubkey: wallet.publicKey! },
      { isSigner: false, isWritable: true, pubkey: player_ata },
      {
        isSigner: false,
        isWritable: true,
        pubkey: whitelist_account_mint_of_the_week,
      },
      { isSigner: false, isWritable: true, pubkey: whitelist_account[0] },
      { isSigner: false, isWritable: true, pubkey: whitelist_ata },
      { isSigner: false, isWritable: false, pubkey: manager_account },
      { isSigner: false, isWritable: true, pubkey: meme_mint },
      { isSigner: false, isWritable: true, pubkey: token_program },
      { isSigner: false, isWritable: false, pubkey: price_feed },
      { isSigner: false, isWritable: false, pubkey: coupon_account },
      { isSigner: true, isWritable: true, pubkey: temp.publicKey },
      { isSigner: false, isWritable: true, pubkey: SystemProgram.programId },
    ],
    data: Buffer.from(concated),
  });

  const message = new TransactionMessage({
    instructions: [ix],
    payerKey: wallet.publicKey!,
    recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);
  tx.sign([temp]);

  send_transaction(wallet, tx);
};
export const sell_token_of_the_week_to_program = async (
  meme_mint: PublicKey,
  token_program: PublicKey,
  price_feed: PublicKey,
  lamports: bigint,
  lottery_no: number,
  wallet: WalletContextState,
) => {
  // const temp = Keypair.generate();
  const amount = new Amount();
  amount.lamports = lamports;
  const encoded = serialize(AmountSchema, amount);
  const concated = Uint8Array.of(9, ...encoded);

  const seed = [Buffer.from("w"), meme_mint.toBytes()];
  const whitelist_account_mint_of_the_week = PublicKey.findProgramAddressSync(
    seed,
    program_id,
  );

  const player_ata = getAssociatedTokenAddressSync(
    meme_mint,
    wallet.publicKey!,
    false,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const whitelist_account_mint_of_the_week_ata = getAssociatedTokenAddressSync(
    meme_mint,
    whitelist_account_mint_of_the_week[0],
    true,
    token_program,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

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

  const coupon_account = coupons_of_the_player[0].pubkey;

  const ix = new TransactionInstruction({
    programId: program_id,
    keys: [
      { isSigner: true, isWritable: true, pubkey: wallet.publicKey! },
      { isSigner: false, isWritable: true, pubkey: player_ata },
      {
        isSigner: false,
        isWritable: true,
        pubkey: whitelist_account_mint_of_the_week[0],
      },
      {
        isSigner: false,
        isWritable: true,
        pubkey: whitelist_account_mint_of_the_week_ata,
      },
      { isSigner: false, isWritable: false, pubkey: manager_account },
      { isSigner: false, isWritable: true, pubkey: meme_mint },
      { isSigner: false, isWritable: true, pubkey: token_program },
      { isSigner: false, isWritable: false, pubkey: price_feed },
      { isSigner: false, isWritable: false, pubkey: coupon_account },
    ],
    data: Buffer.from(concated),
  });

  const blockhash = (await connection.getLatestBlockhash()).blockhash;
  const lastvalidblockheigt = (await connection.getLatestBlockhash())
    .lastValidBlockHeight;

  const message = new TransactionMessage({
    instructions: [ix],
    payerKey: wallet.publicKey!,
    recentBlockhash: blockhash,
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);

  send_transaction(wallet, tx);

  const strategy: TransactionConfirmationStrategy = {
    blockhash: blockhash,
    lastValidBlockHeight: lastvalidblockheigt,
    signature: sig,
  };

  await connection.confirmTransaction(strategy);
};

const send_transaction = (
  wallet: WalletContextState,
  tx: VersionedTransaction,
) => {
  return new Promise((resolve, reject) => {
    wallet
      .sendTransaction(tx, connection)
      .then((sig) => {
        const config: SignatureStatusConfig = {
          searchTransactionHistory: true,
        };

        connection.onSignature(
          sig,
          async (_check_sig) => {
            try {
              const confirmation = await connection.getSignatureStatus(
                sig,
                config,
              );
              if (confirmation.value?.confirmationStatus === "confirmed") {
                console.log("success");
                resolve("Transaction confirmed");
              } else {
                console.error("Transaction not confirmed");
                reject(new Error("Transaction not confirmed"));
              }
            } catch (error) {
              console.error("Error getting signature status:", error);
              reject(new Error("Error getting signature status"));
            }
          },
          "confirmed",
        );
      })
      .catch((error) => {
        console.error("Error sending transaction:", error);
        reject(new Error("Error sending transaction"));
      });
  });
};
