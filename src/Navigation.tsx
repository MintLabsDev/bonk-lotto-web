import { Box, Button, Divider, Flex, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import classes from "./Navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <>
      <Flex className={classes.bar}>
        <Link to={"/"}>
          <Box className={classes.logo}></Box>
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
            color="pink"
          />
          <WalletMultiButton />
        </Group>
      </Flex>
    </>
  );
};

export default Navigation;
