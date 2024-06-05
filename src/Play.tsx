import {
  Box,
  Button,
  Center,
  Grid,
  GridCol,
  Group,
  Image,
  rem,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
  useMatches,
} from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { notifications } from "@mantine/notifications";
import classes from "./Play.module.css";
import LuckyDog from "./assets/lucky-dog.png";
import { play } from "./service";
import { bonk } from "./memes";
import { active_main_counter, number_of_counters } from "./distribution";

const Play: React.FC = () => {
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);
  const areasFilled = useMemo(
    () => lotteryNumbers.length >= 6,
    [lotteryNumbers],
  );
  const wallet = useWallet();
  const meme = bonk;

  const toggleLotteryNumber = useCallback(
    (num: number) => {
      if (lotteryNumbers.includes(num)) {
        setLotteryNumbers((prev) => prev.filter((val) => val !== num));
      } else if (!areasFilled) {
        setLotteryNumbers((prev) => [...prev, num].sort((a, b) => a - b));
      }
    },
    [lotteryNumbers, areasFilled],
  );
  const luckyDog = () => {
    const arr = [];
    while (arr.length < 6) {
      const rnd = Math.floor(Math.random() * 49) + 1;
      if (arr.indexOf(rnd) === -1) {
        arr.push(rnd);
      }
    }
    setLotteryNumbers(arr.sort((a, b) => a - b));
  };
  const handlePlay = async () => {
    // TODO: show error
    if (lotteryNumbers.length !== 6) return;

    if (!wallet.connected) {
      notifications.show({
        title: "Not Connected",
        message: "Please connect a wallet",
        color: "red",
      });
      return;
    }

    const id = notifications.show({
      loading: true,
      title: "Play status: Pending",
      message: "",
      autoClose: false,
      withCloseButton: false,
    });

    play(
      meme.mint,
      meme.token_program,
      meme.price_feed,
      number_of_counters,
      active_main_counter,
      lotteryNumbers[0],
      lotteryNumbers[1],
      lotteryNumbers[2],
      lotteryNumbers[3],
      lotteryNumbers[4],
      lotteryNumbers[5],
      wallet,
    )
      .then(() => {
        notifications.update({
          id,
          title: "Play status: Done",
          message: "May the Lucky Dog be with you",
          color: "green",
          loading: false,
          autoClose: true,
          withCloseButton: true,
        });
      })
      .catch((reason) => {
        console.error({ reason });

        notifications.update({
          id,
          title: "Play status: Rejected",
          message: "An error occured",
          color: "red",
          loading: false,
          autoClose: true,
          withCloseButton: true,
        });
      });
  };

  const numpadCols = useMatches({
    xs: 10,
    base: 5,
  });

  return (
    <>
      <Grid grow>
        <GridCol span={{ md: 9, xs: "auto" }}>
          <Center>
            <Group className={classes.lotteryNumbersContainer}>
              {lotteryNumbers.map((num) => (
                <Box className={classes.lotteryNumber} data-filled key={num}>
                  {num}
                </Box>
              ))}
              {!areasFilled &&
                Array(6 - lotteryNumbers.length)
                  .fill(null)
                  .map((_, i) => (
                    <Box
                      className={classes.lotteryNumber}
                      key={"blank-" + i}
                    ></Box>
                  ))}
            </Group>
          </Center>
        </GridCol>
        <GridCol span={{ md: 3, xs: "content" }}>
          <Center h="100%">
            <UnstyledButton
              onClick={luckyDog}
              size="lg"
              className={classes.luckyDogButton}
            >
              <Group gap={0}>
                <Box className={classes.luckyDogText}>
                  <Text fw="bold" size="lg">
                    Lucky Dog helps me!
                  </Text>
                </Box>
                <Image
                  className={classes.luckyDogImg}
                  w={rem(72)}
                  h={rem(80)}
                  src={LuckyDog}
                  radius="md"
                />
              </Group>
            </UnstyledButton>
          </Center>
        </GridCol>

        <GridCol span="auto">
          <Center>
            <SimpleGrid cols={numpadCols} className={classes.numpad}>
              {Array(49)
                .fill(null)
                .map((_, i) => {
                  const num = i + 1;
                  const active = lotteryNumbers.includes(num);
                  return (
                    <UnstyledButton
                      onClick={() => toggleLotteryNumber(num)}
                      className={classes.numberButton}
                      data-active={active}
                      disabled={areasFilled && !active}
                      key={"number-button-" + num}
                    >
                      {num}
                    </UnstyledButton>
                  );
                })}
            </SimpleGrid>
          </Center>
        </GridCol>

        <GridCol span={3}>
          <Stack justify="flex-end" h={"100%"}>
            <Box p="md" c="dark">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                veritatis amet dolorem fugiat!
              </Text>
            </Box>
            <Button
              fullWidth
              variant="gradient"
              // TODO: adjust colors
              gradient={{ from: "pink", to: "#f58000", deg: 90 }}
              size="lg"
              onClick={handlePlay}
              disabled={!areasFilled}
            >
              Play
            </Button>
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
};

export default Play;
