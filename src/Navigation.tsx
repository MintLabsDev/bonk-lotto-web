import { Button, Divider, Flex, Group, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import classes from "./Navigation.module.css";
import LuckyDogLogo from "./assets/lucky-dog-logo.png";

const Navigation: React.FC = () => {
  return (
    <>
      <Flex className={classes.bar}>
        <Link to={"/"}>
          <Image className={classes.logo} src={LuckyDogLogo} radius="md" />
        </Link>
        <Group className={classes.navGroup}>
          <Button
            component={Link}
            to="/#how-it-works"
            className={classes.navButton}
          >
            How it works
          </Button>
          <Button
            component={Link}
            to="/mytickets"
            className={classes.navButton}
          >
            My Entries
          </Button>
          <Divider
            orientation="vertical"
            h="80%"
            style={{ alignSelf: "inherit" }}
            color="main"
          />
          <WalletMultiButton />
        </Group>
      </Flex>
    </>
  );
};

export default Navigation;
