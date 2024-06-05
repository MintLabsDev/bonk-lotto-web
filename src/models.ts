import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export class Game {
  number1: number = 0;
  number2: number = 0;
  number3: number = 0;
  number4: number = 0;
  number5: number = 0;
  number6: number = 0;
  player: number[] = Array.from({ length: 32 }, () => 1);
  wins: number = 0;
  lottery_no: number = 0;
  counter_no: number = 0;
  main_counter_no: number = 0;
  game_no: number = 0;
  constructor(
    fields:
      | {
          number1: number;
          number2: number;
          number3: number;
          number4: number;
          number5: number;
          number6: number;
          player: number[];
          wins: number;
          lottery_no: number;
          counter_no: number;
          main_counter_no: number;
          game_no: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.number1 = fields.number1;
      this.number2 = fields.number2;
      this.number3 = fields.number3;
      this.number4 = fields.number4;
      this.number5 = fields.number5;
      this.number6 = fields.number6;
      this.player = fields.player;
      this.wins = fields.wins;
      this.lottery_no = fields.lottery_no;
      this.counter_no = fields.counter_no;
      this.main_counter_no = fields.main_counter_no;
      this.game_no = fields.game_no;
    }
  }
}
export class Records {
  is_init: number = 0;
  lottery_no: number = 0;
  active_main_counter_no: number = 0;

  constructor(
    fields:
      | {
          is_init: number;
          lottery_no: number;
          active_main_counter_no: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.lottery_no = fields.lottery_no;
      this.active_main_counter_no = fields.active_main_counter_no;
    }
  }
}
export class Terms {
  is_init: number = 0;
  coupon_price_as_usd: number = 0;
  rent: number = 0;

  constructor(
    fields:
      | {
          is_init: number;
          coupon_price_as_usd: number;
          rent: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.coupon_price_as_usd = fields.coupon_price_as_usd;
      this.rent = fields.rent;
    }
  }
}
export class Lottery {
  is_init: number = 0;
  lottery_time: number = 0;
  how_often: number = 0;
  random: number[] = Array.from({ length: 32 }, () => 0);
  constructor(
    fields:
      | {
          is_init: number;
          lottery_time: number;
          how_often: number;
          random: number[];
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.lottery_time = fields.lottery_time;
      this.how_often = fields.how_often;
      this.random = fields.random;
    }
  }
}
export class Counter {
  is_init: number = 0;
  counter: number = 0;
  counter_no: number = 0;
  belong_to_main_counter_no: number = 0;
  random: number[] = Array.from({ length: 32 }, () => 0);
  number_of_meme_ata: number = 0;
  number_of_meme_ata_collected: number = 0;

  constructor(
    fields:
      | {
          is_init: number;
          counter: number;
          counter_no: number;
          belong_to_main_counter_no: number;
          random: number[];
          number_of_meme_ata: number;
          number_of_meme_ata_collected: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.counter = fields.counter;
      this.counter_no = fields.counter_no;
      this.belong_to_main_counter_no = fields.belong_to_main_counter_no;
      this.random = fields.random;
      this.number_of_meme_ata = fields.number_of_meme_ata;
      this.number_of_meme_ata_collected = fields.number_of_meme_ata_collected;
    }
  }
}
export class MainCounter {
  is_init: number = 0;
  lottey_no: number = 0;
  counter_no: number = 0;
  random: number[] = Array.from({ length: 32 }, () => 0);
  total_number_of_counters: number = 0;
  total_number_of_memes: number = 0;
  number_of_whitelist_checked: number = 0;
  constructor(
    fields:
      | {
          is_init: number;
          lottey_no: number;
          counter_no: number;
          random: number[];
          total_number_of_counters: number;
          total_number_of_memes: number;
          number_of_whitelist_checked: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.lottey_no = fields.lottey_no;
      this.counter_no = fields.counter_no;
      this.random = fields.random;
      this.total_number_of_counters = fields.total_number_of_counters;
      this.total_number_of_memes = fields.total_number_of_memes;
      this.number_of_whitelist_checked = fields.number_of_whitelist_checked;
    }
  }
}
export class WhiteList {
  is_init: number = 0;
  is_disabled: number = 0;
  whitelist_no: number = 0;
  mint: number[] = Array.from({ length: 32 }, () => 0);
  random: number[] = Array.from({ length: 32 }, () => 0);
  decimals: number = 0;
  number_of_counters: number = 0;
  number_of_counters_checked: number = 0;
  total_tokens_collected: number = 0;
  total_lamports_collected: number = 0;
  bump: number = 0;
  constructor(
    fields:
      | {
          is_init: number;
          is_disabled: number;
          whitelist_no: number;
          mint: number[];
          random: number[];
          decimals: number;
          number_of_counters: number;
          number_of_counters_checked: number;
          total_tokens_collected: number;
          total_lamports_collected: number;
          bump: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.is_disabled = fields.is_disabled;
      this.whitelist_no = fields.whitelist_no;
      this.mint = fields.mint;
      this.random = fields.random;
      this.decimals = fields.decimals;
      this.number_of_counters = fields.number_of_counters;
      this.number_of_counters_checked = fields.number_of_counters_checked;
      this.total_tokens_collected = fields.total_tokens_collected;
      this.total_lamports_collected = fields.total_lamports_collected;
      this.bump = fields.bump;
    }
  }
}
export class Manager {
  is_init: number = 0;
  lottery_no: number = 0;
  main_counter_no: number = 0;
  collection_allowed: number = 0;
  distribution_allowed: number = 0;
  buy_allowed: number = 0;
  sell_allowed: number = 0;
  mint_of_the_week: number[] = Array.from({ length: 32 }, () => 0);
  buy_rate: string = "000000000000";
  sell_rate: string = "000000000000";
  constructor(
    fields:
      | {
          is_init: number;
          lottery_no: number;
          main_counter_no: number;
          collection_allowed: number;
          distribution_allowed: number;
          buy_allowed: number;
          sell_allowed: number;
          mint_of_the_week: number[];
          buy_rate: string;
          sell_rate: string;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.lottery_no = fields.lottery_no;
      this.main_counter_no = fields.main_counter_no;
      this.collection_allowed = fields.collection_allowed;
      this.distribution_allowed = fields.distribution_allowed;
      this.buy_allowed = fields.buy_allowed;
      this.sell_allowed = fields.sell_allowed;
      this.mint_of_the_week = fields.mint_of_the_week;
      this.buy_rate = fields.buy_rate;
      this.sell_rate = fields.sell_rate;
    }
  }
}
export class InitPDA {
  bump: number = 0;
  decimals: number = 0;
  lamports: number = 0;
  constructor(
    fields:
      | {
          bump: number;
          decimals: number;
          lamports: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.bump = fields.bump;
      this.decimals = fields.decimals;
      this.lamports = fields.lamports;
    }
  }
}
export class Distribution {
  is_init: number = 0;
  three_match_get: number = 0;
  four_match_get: number = 0;
  five_match_get: number = 0;
  six_match_get: number = 0;
  organization_get: number = 0;
  dao_get: number = 0;
  authority_received: number = 0;
  lottery_no: number = 0;
  bump: number = 0;
  decimals: number = 0;
  constructor(
    fields:
      | {
          is_init: number;
          three_match_get: number;
          four_match_get: number;
          five_match_get: number;
          six_match_get: number;
          organization_get: number;
          dao_get: number;
          authority_received: number;
          lottery_no: number;
          bump: number;
          decimals: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.three_match_get = fields.three_match_get;
      this.four_match_get = fields.four_match_get;
      this.five_match_get = fields.five_match_get;
      this.six_match_get = fields.six_match_get;
      this.organization_get = fields.organization_get;
      this.dao_get = fields.dao_get;
      this.authority_received = fields.authority_received;
      this.lottery_no = fields.lottery_no;
      this.bump = fields.bump;
      this.decimals = fields.decimals;
    }
  }
}
export class Amount {
  lamports: bigint = BigInt(0);
  constructor(
    fields:
      | {
          lamports: bigint;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.lamports = fields.lamports;
    }
  }
}
export class Price {
  is_init: number = 0;
  token_per_usd: string = "0000000000000000000";
  sol_per_token: string = "0000000000000000000";
  mint: number[] = Array.from({ length: 32 }, () => 0);
  decimals: number = 0;
  constructor(
    fields:
      | {
          is_init: number;
          token_per_usd: string;
          sol_per_token: string;
          mint: number[];
          decimals: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.token_per_usd = fields.token_per_usd;
      this.sol_per_token = fields.sol_per_token;
      this.mint = fields.mint;
      this.decimals = fields.decimals;
    }
  }
}
export class LuckNumbers {
  is_init: number = 0;
  lottery_no: number = 0;
  number1: number = 0;
  number2: number = 0;
  number3: number = 0;
  number4: number = 0;
  number5: number = 0;
  number6: number = 0;
  constructor(
    fields:
      | {
          is_init: number;
          lottery_no: number;
          number1: number;
          number2: number;
          number3: number;
          number4: number;
          number5: number;
          number6: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.is_init = fields.is_init;
      this.lottery_no = fields.lottery_no;
      this.number1 = fields.number1;
      this.number2 = fields.number2;
      this.number3 = fields.number3;
      this.number4 = fields.number4;
      this.number5 = fields.number5;
      this.number6 = fields.number6;
    }
  }
}
export class Ticket {
  number1: number = 0;
  number2: number = 0;
  number3: number = 0;
  number4: number = 0;
  number5: number = 0;
  number6: number = 0;
  lucky_number1: number = 0;
  lucky_number2: number = 0;
  lucky_number3: number = 0;
  lucky_number4: number = 0;
  lucky_number5: number = 0;
  lucky_number6: number = 0;
  lottery_no: number = 0;
  matches: number = 0;
  prize_amount: number = 0;
  meme: number = 0;
  can_be_claimed: boolean = false;
  wins: boolean = false;
  account_address: PublicKey = TOKEN_PROGRAM_ID;
  constructor(
    fields:
      | {
          number1: number;
          number2: number;
          number3: number;
          number4: number;
          number5: number;
          number6: number;
          lucky_number1: number;
          lucky_number2: number;
          lucky_number3: number;
          lucky_number4: number;
          lucky_number5: number;
          lucky_number6: number;
          lottery_no: number;
          matches: number;
          prize_amount: number;
          meme: number;
          can_be_claimed: boolean;
          wins: boolean;
          account_address: PublicKey;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.number1 = fields.number1;
      this.number2 = fields.number2;
      this.number3 = fields.number3;
      this.number4 = fields.number4;
      this.number5 = fields.number5;
      this.number6 = fields.number6;
      this.lucky_number1 = fields.lucky_number1;
      this.lucky_number2 = fields.lucky_number2;
      this.lucky_number3 = fields.lucky_number3;
      this.lucky_number4 = fields.lucky_number4;
      this.lucky_number5 = fields.lucky_number5;
      this.lucky_number6 = fields.lucky_number6;
      this.lottery_no = fields.lottery_no;
      this.matches = fields.matches;
      this.prize_amount = fields.prize_amount;
      this.meme = fields.meme;
      this.can_be_claimed = fields.can_be_claimed;
      this.wins = fields.wins;
      this.account_address = fields.account_address;
    }
  }
}
export class Dist {
  lucky_number1: number = 0;
  lucky_number2: number = 0;
  lucky_number3: number = 0;
  lucky_number4: number = 0;
  lucky_number5: number = 0;
  lucky_number6: number = 0;
  lottery: number = 0;
  prize_amount_3: number = 0;
  prize_amount_4: number = 0;
  prize_amount_5: number = 0;
  prize_amount_6: number = 0;
  meme: number = 0;
  constructor(
    fields:
      | {
          lucky_number1: number;
          lucky_number2: number;
          lucky_number3: number;
          lucky_number4: number;
          lucky_number5: number;
          lucky_number6: number;
          lottery: number;
          prize_amount_3: number;
          prize_amount_4: number;
          prize_amount_5: number;
          prize_amount_6: number;
          meme: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.lucky_number1 = fields.lucky_number1;
      this.lucky_number2 = fields.lucky_number2;
      this.lucky_number3 = fields.lucky_number3;
      this.lucky_number4 = fields.lucky_number4;
      this.lucky_number5 = fields.lucky_number5;
      this.lucky_number6 = fields.lucky_number6;
      this.lottery = fields.lottery;
      this.prize_amount_3 = fields.prize_amount_3;
      this.prize_amount_4 = fields.prize_amount_4;
      this.prize_amount_5 = fields.prize_amount_5;
      this.prize_amount_6 = fields.prize_amount_6;
      this.meme = fields.meme;
    }
  }
}
export class MeMe {
  mint: PublicKey = TOKEN_PROGRAM_ID;
  token_program: PublicKey = TOKEN_PROGRAM_ID;
  price_feed: PublicKey = TOKEN_PROGRAM_ID;
  name: string = "";
  meme_no: number = 0;
  constructor(
    fields:
      | {
          mint: PublicKey;
          token_program: PublicKey;
          price_feed: PublicKey;
          name: string;
          meme_no: number;
        }
      | undefined = undefined,
  ) {
    if (fields) {
      this.mint = fields.mint;
      this.token_program = fields.token_program;
      this.price_feed = fields.price_feed;
      this.name = fields.name;
      this.meme_no = fields.meme_no;
    }
  }
}

export const GameSchema = new Map([
  [
    Game,
    {
      kind: "struct",
      fields: [
        ["number1", "u8"],
        ["number2", "u8"],
        ["number3", "u8"],
        ["number4", "u8"],
        ["number5", "u8"],
        ["number6", "u8"],
        ["player", ["u8", 32]],
        ["wins", "u8"],
        ["lottery_no", "u16"],
        ["counter_no", "u8"],
        ["main_counter_no", "u8"],
        ["game_no", "u32"],
      ],
    },
  ],
]);

export const RecordsSchema = new Map([
  [
    Records,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["lottery_no", "u16"],
        ["active_main_counter_no", "u8"],
      ],
    },
  ],
]);

export const TermsSchema = new Map([
  [
    Terms,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["coupon_price_as_usd", "u64"],
        ["rent", "u64"],
      ],
    },
  ],
]);

export const LotterySchema = new Map([
  [
    Lottery,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["lottery_time", "u64"],
        ["how_often", "u64"],
        ["random", ["u8", 32]],
      ],
    },
  ],
]);

export const CounterSchema = new Map([
  [
    Counter,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["counter", "u32"],
        ["counter_no", "u8"],
        ["belong_to_main_counter_no", "u8"],
        ["random", ["u8", 32]],
        ["number_of_meme_ata", "u8"],
        ["number_of_meme_ata_collected", "u8"],
      ],
    },
  ],
]);

export const MainCounterSchema = new Map([
  [
    MainCounter,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["lottey_no", "u16"],
        ["counter_no", "u8"],
        ["total_number_of_counters", "u8"],
        ["total_number_of_memes", "u16"],
        ["number_of_whitelist_checked", "u16"],
      ],
    },
  ],
]);

export const WhiteListSchema = new Map([
  [
    WhiteList,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["is_disabled", "u8"],
        ["whitelist_no", "u16"],
        ["mint", ["u8", 32]],
        ["random", ["u8", 32]],
        ["decimals", "u8"],
        ["number_of_counters", "u8"],
        ["number_of_counters_checked", "u8"],
        ["total_tokens_collected", "u64"],
        ["total_lamports_collected", "u64"],
        ["bump", "u8"],
      ],
    },
  ],
]);

export const ManagerSchema = new Map([
  [
    Manager,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["lottery_no", "u16"],
        ["main_counter_no", "u8"],
        ["collection_allowed", "u8"],
        ["distribution_allowed", "u8"],
        ["buy_allowed", "u8"],
        ["sell_allowed", "u8"],
        ["mint_of_the_week", ["u8", 32]],
        ["buy_rate", "String"],
        ["sell_rate", "String"],
      ],
    },
  ],
]);

export const InitPDASchema = new Map([
  [
    InitPDA,
    {
      kind: "struct",
      fields: [
        ["bump", "u8"],
        ["decimals", "u8"],
        ["lamports", "u64"],
      ],
    },
  ],
]);

export const DistributionSchema = new Map([
  [
    Distribution,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["three_match_get", "u64"],
        ["four_match_get", "u64"],
        ["five_match_get", "u64"],
        ["six_match_get", "u64"],
        ["organization_get", "u64"],
        ["dao_get", "u64"],
        ["authority_received", "u8"],
        ["lottery_no", "u16"],
        ["bump", "u8"],
        ["decimals", "u8"],
      ],
    },
  ],
]);

export const AmountSchema = new Map([
  [
    Amount,
    {
      kind: "struct",
      fields: [["lamports", "u64"]],
    },
  ],
]);

export const LuckNumbersSchema = new Map([
  [
    LuckNumbers,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["lottery_no", "u16"],
        ["number1", "u8"],
        ["number2", "u8"],
        ["number3", "u8"],
        ["number4", "u8"],
        ["number5", "u8"],
        ["number6", "u8"],
      ],
    },
  ],
]);

export const PriceSchema = new Map([
  [
    Price,
    {
      kind: "struct",
      fields: [
        ["is_init", "u8"],
        ["token_per_usd", "String"],
        ["sol_per_token", "String"],
        ["mint", ["u8", 32]],
        ["decimals", "u8"],
      ],
    },
  ],
]);
