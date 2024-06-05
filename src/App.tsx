import { PropsWithChildren, useMemo } from "react";
import "./App.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { Notifications } from "@mantine/notifications";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, createTheme, MantineProvider, rem } from "@mantine/core";
import MyTickets from "./routes/myTickets";
import BuySell from "./routes/buySell";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import Home from "./routes/home";
import Navigation from "./Navigation";

const Context: React.FC<PropsWithChildren> = ({ children }) => {
  const network = WalletAdapterNetwork.Testnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: React.FC = () => {
  return (
    <div className="App">
      <Navigation />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/buy_sell" element={<BuySell />} />
        </Routes>
      </Container>
    </div>
  );
};

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <Context>
          <Content />
        </Context>
      </BrowserRouter>
    </MantineProvider>
  );
}

const theme = createTheme({
  primaryColor: "main",
  colors: {
    main: [
      "#fff0e4",
      "#ffe0cf",
      "#fac0a1",
      "#f69e6e",
      "#f28043",
      "#f06d27",
      "#f06418",
      "#d6530c",
      "#bf4906",
      "#a73c00",
    ],
  },
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",

  headings: {
    sizes: {
      h1: { fontSize: rem(36) },
      h2: { fontSize: rem(36) },
      h3: { fontSize: rem(26) },
    },
  },
});

export default App;
