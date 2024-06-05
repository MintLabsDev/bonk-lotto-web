import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MeMe } from "../models";
import {
  buy_other_tokens_from_program,
  sell_token_of_the_week_to_program,
} from "../service";
import { memes } from "../memes";
import { current_lottery_no, meme_of_the_week } from "../distribution";

const BuySell: React.FC = () => {
  const wallet = useWallet();
  const [token_amount, setTokenAmount] = useState("");
  const [sol_amount, setSolAmount] = useState("");

  const handleTokenAmountChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTokenAmount(event.target.value);
  };

  const handleSolAmountChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSolAmount(event.target.value);
  };

  const handleBuyToken = async (meme: MeMe) => {
    const amount_to_buy = parseInt(token_amount, 10);

    await buy_other_tokens_from_program(
      meme.mint,
      meme.token_program,
      meme.price_feed,
      memes[meme_of_the_week].mint,
      current_lottery_no - 1,
      BigInt(amount_to_buy),
      wallet,
    );
  };

  const handleSellToken = async (meme: MeMe) => {
    const amount_to_buy = parseInt(sol_amount, 10);

    await sell_token_of_the_week_to_program(
      meme.mint,
      meme.token_program,
      meme.price_feed,
      BigInt(amount_to_buy),
      current_lottery_no - 1,
      wallet,
    );
  };

  return (
    <div>
      <h1>Buy Tokens</h1>
      <div>
        {memes.map((meme: MeMe, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <h5 className="card-title">Ticket</h5>
              {
                //meme tokenin market fiyati
                //meme tokenin bizdeki fiyati
              }
            </div>
            <div>
              <button onClick={() => handleBuyToken(meme)}>
                buy {meme.name}
              </button>
              <input
                type="text"
                placeholder="Token amount"
                value={token_amount}
                onChange={handleTokenAmountChange}
              />
            </div>
          </div>
        ))}
        <h1>Sell Meme of the week</h1>
        <div>
          <button onClick={() => handleSellToken(memes[meme_of_the_week])}>
            sell {memes[meme_of_the_week].name}
          </button>
          <input
            type="text"
            placeholder="Sol amount"
            value={sol_amount}
            onChange={handleSolAmountChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BuySell;
