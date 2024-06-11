import { PublicKey } from "@solana/web3.js";
import { deserialize } from "borsh";
import { program_id } from "./accounts";
import { connection } from "./connection";
import { Dist, Distribution, DistributionSchema, LuckNumbers, LuckNumbersSchema } from "./models";

export const current_lottery_no = 2;
export const number_of_counters = 2;
export const active_main_counter = 2;
export const meme_of_the_week = 1;

export const get_distribution = async (lottery_no: number) => {
  const distribution_account = PublicKey.findProgramAddressSync(
    [Buffer.from("dist"), Buffer.from(lottery_no.toString())],
    program_id,
  );

  const seed = [Buffer.from("luck"),Buffer.from(lottery_no)]
  const lucky_numbers_account = PublicKey.findProgramAddressSync(seed,program_id);

  const account_info = await connection.getAccountInfo(lucky_numbers_account[0]);
  const data = deserialize(LuckNumbersSchema,LuckNumbers,account_info?.data!);

  const distribution_account_info = await connection.getAccountInfo(
    distribution_account[0],
  );

  const distribution_account_data = deserialize(
    DistributionSchema,
    Distribution,
    distribution_account_info!.data,
  );

  const dist = new Dist();

  dist.lucky_number1 = data.lucky_number1;
  dist.lucky_number2 = data.lucky_number2;
  dist.lucky_number3 = data.lucky_number3;
  dist.lucky_number4 = data.lucky_number4;
  dist.lucky_number5 = data.lucky_number5;
  dist.lucky_number6 = data.lucky_number6;

  dist.lottery = distribution_account_data.lottery_no;
  dist.prize_amount_3 = distribution_account_data.three_match_get;
  dist.prize_amount_4 = distribution_account_data.four_match_get;
  dist.prize_amount_5 = distribution_account_data.five_match_get;
  dist.prize_amount_6 = distribution_account_data.six_match_get;

  return dist;
};

export const get_lucky_numbers = async (lottery_no: number) => {

  const seed = [Buffer.from("luck"),Buffer.from(lottery_no)]
  const lucky_numbers_account = PublicKey.findProgramAddressSync(seed,program_id);

  const account_info = await connection.getAccountInfo(lucky_numbers_account[0]);
  const data = deserialize(LuckNumbersSchema,LuckNumbers,account_info?.data!);

  const lucky_numbers:number[]=[data.number1, data.number2, data.number3, data.number4, data.number5, data.number6]

  return lucky_numbers;
}