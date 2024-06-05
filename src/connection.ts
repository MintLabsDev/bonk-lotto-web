import { Connection } from "@solana/web3.js";

const ws = "ws://api.devnet.solana.com";

export const connection = new Connection("https://api.devnet.solana.com", {
  wsEndpoint: ws,
});
//export const connection= new Connection("https://api.mainnet-beta.solana.com","confirmed");
