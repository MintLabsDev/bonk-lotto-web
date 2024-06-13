import {
  Box,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Image,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { IconMenu2 } from "@tabler/icons-react";
import classes from "./Navigation.module.css";
import LuckyDogLogo from "./assets/lucky-dog-logo.png";
import { useDisclosure } from "@mantine/hooks";

const Navigation: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex className={classes.bar}>
        <Link to={"/"}>
          <Image className={classes.logo} src={LuckyDogLogo} radius="md" />
        </Link>
        <Group className={classes.navbarGroup}>
          <Group className={classes.navButtonsGroup}>
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
          </Group>
          <WalletMultiButton className={classes.walletButton} />
          <UnstyledButton className={classes.menuButton} onClick={open}>
            <IconMenu2 size={24} color="white" />
          </UnstyledButton>
        </Group>
      </Flex>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        classNames={{ content: classes.darkBg, header: classes.darkBg }}
        styles={{ body: { height: "100%" } }}
        withCloseButton={false}
      >
        <Stack justify="space-between" h="100%">
          <Stack justify="center">
            <Box m="auto" mb="md">
              <Link to={"/"}>
                <Image
                  className={classes.logo}
                  src={LuckyDogLogo}
                  data-in-drawer
                  radius="md"
                />
              </Link>
            </Box>
            <Button
              component={Link}
              to="/#how-it-works"
              className={classes.navButton}
              size="lg"
            >
              How it works
            </Button>
            <Button
              component={Link}
              to="/mytickets"
              className={classes.navButton}
              size="lg"
            >
              My Entries
            </Button>
          </Stack>
          <Button variant="outline" onClick={close}>
            Close
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default Navigation;
