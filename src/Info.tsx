import {
  Box,
  Button,
  Center,
  Grid,
  Group,
  Loader,
  rem,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "./Info.module.css";
import { get_prize_pool } from "./utils";
import { current_lottery_no, get_lucky_numbers } from "./distribution";

export type Prop = {
  lotteryDate: Date | null;
};

const Navigation: React.FC<Prop> = ({ lotteryDate }) => {
  const theme = useMantineTheme();

  const [prizePool, setPrizePool] = useState(0);
  const [latestDrawNumbers, setLatestDrawnumbers] = useState<
    number[] | null | undefined
  >();

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const prize = await get_prize_pool();
        setPrizePool(prize);
      } catch (error) {
        console.error("Error fetching prize pool:", error);
        setPrizePool(0);
      }
    };

    getAccounts();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const lucky_numbers = await get_lucky_numbers(current_lottery_no - 1);
        setLatestDrawnumbers(lucky_numbers.sort((a, b) => a - b));
      } catch (error) {
        console.error("Error fetching lucky numbers:", error);
        setLatestDrawnumbers(null);
      }
    };

    getAccounts();
  }, []);

  return (
    <Grid py={rem(32)} align="flex-start" gutter="xs">
      <Grid.Col span={{ md: 4, xs: 6 }} order={{ base: 2, md: 1 }}>
        <Box className={classes.infoBox}>
          <Title order={3} className={classes.title}>
            Prize Pool
          </Title>
          <Center>
            <Text size="lg">
              {prizePool.toLocaleString()}{" "}
              <Text fw="bold" c={theme.primaryColor} span>
                $BONK
              </Text>
            </Text>
          </Center>
        </Box>
      </Grid.Col>
      <Grid.Col span={{ md: 4, xs: 12 }} order={{ md: 2, base: 1 }}>
        <Box className={classes.infoBox}>
          <Title order={3} className={classes.title}>
            Countdown
          </Title>
          <Center>
            {lotteryDate && (
              <FlipClockCountdown
                renderMap={[true, true, true, false]}
                labels={["DAYS", "HOURS", "MINUTES", ""]}
                showSeparators={false}
                to={new Date(lotteryDate)}
                digitBlockStyle={{
                  backgroundColor: theme.colors[theme.primaryColor][5],
                  fontSize: rem(36),
                  width: rem(36),
                  height: rem(54),
                }}
                labelStyle={{
                  color: theme.colors[theme.primaryColor][5],
                  fontFamily: theme.fontFamily,
                  fontSize: "var(--mantine-font-size-sm)",
                  fontWeight: "bold",
                }}
                separatorStyle={{ size: 0 }}
                spacing={{ clock: rem(8) }}
              >
                <Text>Done</Text>
              </FlipClockCountdown>
            )}
          </Center>
        </Box>
      </Grid.Col>
      <Grid.Col span={{ md: 4, xs: 6 }} order={3}>
        <Box className={classes.infoBox}>
          <Title order={3} className={classes.title}>
            Latest Draw Results
          </Title>
          <Center>
            <Stack gap="lg">
              <Group className={classes.latestDrawContainer} gap="xs">
                {latestDrawNumbers === undefined ? (
                  <Loader color="blue" />
                ) : latestDrawNumbers !== null ? (
                  latestDrawNumbers.map((num) => (
                    <Box className={classes.latestDrawNumber} key={num}>
                      {num}
                    </Box>
                  ))
                ) : (
                  // TODO: error msg
                  <></>
                )}
              </Group>
              <Button
                component={Link}
                to="/mytickets"
                rightSection={<IconArrowRight size={14} />}
                className={classes.checkMyEntriesButton}
                size="compact-sm"
              >
                Check my entries
              </Button>
            </Stack>
          </Center>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default Navigation;
