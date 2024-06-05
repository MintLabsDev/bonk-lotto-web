import { PublicKey } from "@solana/web3.js";
import { deserialize } from "borsh";
import { program_id } from "./accounts";
import { connection } from "./connection";
import { Dist, Distribution, DistributionSchema } from "./models";

export const current_lottery_no = 1;
export const number_of_counters = 2;
export const active_main_counter = 1;
export const meme_of_the_week = 1;

export const get_distribution = async (lottery_no: number) => {
  const distribution_account = PublicKey.findProgramAddressSync(
    [Buffer.from("dist"), Buffer.from(lottery_no.toString())],
    program_id,
  );

  const distribution_account_info = await connection.getAccountInfo(
    distribution_account[0],
  );

  const distribution_account_data = deserialize(
    DistributionSchema,
    Distribution,
    distribution_account_info!.data,
  );

  const dist = new Dist();

  dist.lottery = distribution_account_data.lottery_no;
  dist.prize_amount_3 = distribution_account_data.three_match_get;
  dist.prize_amount_4 = distribution_account_data.four_match_get;
  dist.prize_amount_5 = distribution_account_data.five_match_get;
  dist.prize_amount_6 = distribution_account_data.six_match_get;

  return dist;
};
