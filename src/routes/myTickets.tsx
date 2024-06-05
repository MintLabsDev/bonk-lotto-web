import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { notifications } from "@mantine/notifications";
import { Box, Button, Group, Loader, Space, Text, Title } from "@mantine/core";
import classes from "./myTickets.module.css";
import { Ticket } from "../models";
import { claim_your_reward_or_return_deposit } from "../service";
import { get_my_tickets } from "../utils";
import { memes } from "../memes";

const MyTickets: React.FC = () => {
  const wallet = useWallet();
  const [tickets, setTickets] = useState<Ticket[] | null>(null);

  useEffect(() => {
    document.title = "My Entries | Meme Lotto";
  });

  useEffect(() => {
    const getAccounts = async () => {
      if (!wallet.connected) return;
      try {
        const myTickets = await get_my_tickets(wallet);
        if (Array.isArray(myTickets)) {
          setTickets(myTickets);
        } else {
          setTickets([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTickets([]);
      }
    };

    getAccounts();
  }, [wallet]);

  const handleClaimRewardorReturnDeposit = async (ticket: Ticket) => {
    if (!wallet.connected) {
      notifications.show({
        title: "Not Connected",
        message: "Please connect a wallet",
        color: "red",
      });
      return;
    }
    const meme = memes[ticket.meme];
    claim_your_reward_or_return_deposit(
      meme.mint,
      meme.token_program,
      ticket.account_address,
      ticket.lottery_no,
      wallet,
    );
  };

  return (
    <>
      <Title>My Entries</Title>
      <Space h="md" />
      {tickets === null && <Loader color="blue" />}
      {tickets?.length === 0 && <Text>No Entries</Text>}
      {tickets &&
        tickets.length > 0 &&
        tickets.map((ticket, i) => (
          <Group
            className={classes.ticketContainer}
            justify="space-between"
            key={i}
          >
            <Group className={classes.ticketNumbersContainer} gap="xs">
              <Box
                className={classes.ticketNumber}
                bg={ticket.lucky_number1 === ticket.number1 ? "green" : "red"}
              >
                {ticket.number1}
              </Box>
              <Box
                className={classes.ticketNumber}
                bg={ticket.lucky_number2 === ticket.number2 ? "green" : "red"}
              >
                {ticket.number2}
              </Box>
              <Box
                className={classes.ticketNumber}
                bg={ticket.lucky_number3 === ticket.number3 ? "green" : "red"}
              >
                {ticket.number3}
              </Box>
              <Box
                className={classes.ticketNumber}
                bg={ticket.lucky_number4 === ticket.number4 ? "green" : "red"}
              >
                {ticket.number4}
              </Box>
              <Box
                className={classes.ticketNumber}
                bg={ticket.lucky_number5 === ticket.number5 ? "green" : "red"}
              >
                {ticket.number5}
              </Box>
              <Box
                className={classes.ticketNumber}
                bg={ticket.lucky_number6 === ticket.number6 ? "green" : "red"}
              >
                {ticket.number6}
              </Box>
            </Group>
            <Button
              disabled={!ticket.can_be_claimed}
              onClick={() => handleClaimRewardorReturnDeposit(ticket)}
            >
              {ticket.can_be_claimed
                ? (ticket.wins ? "Claim Reward: " : "Return Deposit: ") +
                  ticket.prize_amount +
                  "$BONK"
                : "In Progress"}
            </Button>
          </Group>
        ))}
    </>
  );
};

export default MyTickets;
