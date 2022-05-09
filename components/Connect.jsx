import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {Button} from '@chakra-ui/react'
export default function Profile() {
  const { data: account } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector()
  });

  if (account) return <div>Connected to {account.address}</div>;
  return <Button onClick={() => connect()}>Connect Wallet</Button>;
}
