import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  bome_mint,
  bome_price_feed,
  bonk_mint,
  bonk_price_feed,
  wen_mint,
  wen_price_feed,
  wif_mint,
  wif_price_feed,
} from "./accounts";
import { MeMe } from "./models";

export const bonk: MeMe = {
  mint: bonk_mint,
  token_program: TOKEN_PROGRAM_ID,
  price_feed: bonk_price_feed,
  name: "bonk",
  meme_no: 0,
};

export const wen: MeMe = {
  mint: wen_mint,
  token_program: TOKEN_PROGRAM_ID,
  price_feed: wen_price_feed,
  name: "wen",
  meme_no: 1,
};

export const wif: MeMe = {
  mint: wif_mint,
  token_program: TOKEN_PROGRAM_ID,
  price_feed: wif_price_feed,
  name: "wif",
  meme_no: 2,
};

export const bome: MeMe = {
  mint: bome_mint,
  token_program: TOKEN_PROGRAM_ID,
  price_feed: bome_price_feed,
  name: "bome",
  meme_no: 3,
};

export const memes: MeMe[] = [bonk, wen, wif, bome];
