import { Center, Title } from "@mantine/core";

import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useEffect, useState } from "react";
import { get_lottery_schema } from "../utils";
import Play from "../Play";
import Info from "../Info";

const Home: React.FC = () => {
  const [lotteryDate, setLotteryDate] = useState<null | Date>(null);

  useEffect(() => {
    get_lottery_schema().then((time) => {
      // time is in seconds but we need millis
      const date = new Date(time.toNumber() * 1000);
      date.setDate(date.getDate() );
      setLotteryDate(date);
    });
    document.title = "Meme Lotto";
  }, []);

  return (
    <>
      <Info lotteryDate={lotteryDate} />
      <Center>
        <Title order={2} py="md">
          Pick the Lucky Numbers
        </Title>
      </Center>
      <Play />
    </>
  );
};

export default Home;
