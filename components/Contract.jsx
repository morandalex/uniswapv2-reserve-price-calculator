import React from "react";
import { useContract, useProvider, useSigner, useNetwork } from "wagmi";
import abiUniswapV2Pair from "../abi/uniswapV2Pair.json";
import abiUniswapV2Factory from "../abi/uniswapV2Factory";
import {Link, HStack,Box, Button,Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";


const ETHEREUM_UNISWAPV2FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";


//const ETHEREUM_TK0 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //WETH


const ETHEREUM_TK1 = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; //USDT
const ETHEREUM_TK2 = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; //USDC
const ETHEREUM_TK3 = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; //DAI


const ETHEREUM_UNISWAP_ADDRESS_PAIRTK1TK2 = "0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f"
const ETHEREUM_UNISWAP_ADDRESS_PAIRTK1TK3 = "0xB20bd5D04BE54f870D5C0d3cA85d82b34B836405"
const ETHEREUM_UNISWAP_ADDRESS_PAIRTK2TK3 = "0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5"

export default function Contract() {

  //wagmi
  //const [{ data: networkData, error, loading }, switchNetwork] = useNetwork()
  const provider = useProvider();
  //const [{ data: signer, error: signerError, loading: signerLoading }, getSigner] = useSigner()
  //state
  const [tkA, setTkA] = React.useState("");
  const [tkB, setTkB] = React.useState("");
  const [table, setTable] = React.useState([]);
  const [blockTimeStamp, setBlockTimeStamp] = React.useState("");
  const [addressPairTK1TK2, setaddressPairTK1TK2] = React.useState(ETHEREUM_UNISWAP_ADDRESS_PAIRTK1TK2);

  const [addressPairTK1TK3, setaddressPairTK1TK3] = React.useState(ETHEREUM_UNISWAP_ADDRESS_PAIRTK1TK3);
  const [addressPairTK2TK3, setaddressPairTK2TK3] = React.useState(ETHEREUM_UNISWAP_ADDRESS_PAIRTK2TK3);
  //contracts
  const UniswapV2Factory = useContract({
    addressOrName: ETHEREUM_UNISWAPV2FACTORY,
    contractInterface: abiUniswapV2Factory,
    signerOrProvider: provider
  });

  const UniswapV2PairTK1TK2 = useContract({
    addressOrName: addressPairTK1TK2,
    contractInterface: abiUniswapV2Pair,
    signerOrProvider: provider
  });
  const UniswapV2PairTK1TK3 = useContract({
    addressOrName: addressPairTK1TK3,
    contractInterface: abiUniswapV2Pair,
    signerOrProvider: provider
  });

  const UniswapV2PairTK2TK3 = useContract({
    addressOrName: addressPairTK2TK3,
    contractInterface: abiUniswapV2Pair,
    signerOrProvider: provider
  });



  //functions
  async function getPair() {
    var pairTK1TK2 = await UniswapV2Factory.getPair(ETHEREUM_TK1, ETHEREUM_TK2);
    setaddressPairTK1TK2(pairTK1TK2);

    var pairTK1TK3 = await UniswapV2Factory.getPair(ETHEREUM_TK1, ETHEREUM_TK3);
    setaddressPairTK1TK3(pairTK1TK3);

    var pairTK2TK3 = await UniswapV2Factory.getPair(ETHEREUM_TK2, ETHEREUM_TK3);
    setaddressPairTK2TK3(pairTK2TK3);
  }

function flushTable(){
  setTable([])
}

  async function getReserves() {
    //setTable([])
    let arr = []
    var resTK1TK2 = await UniswapV2PairTK1TK2.getReserves();

    let rowTK1TK2 = {
      tkA:ETHEREUM_TK1,
      tkB:ETHEREUM_TK2,
      pair: "usdT/usdC",
      pairAddress: addressPairTK1TK2,
      lastBlockTimeStamp: resTK1TK2[2].toString(),
      timestamp:new Date().getTime(),
      resA: String(parseFloat(resTK1TK2[0].toString()) / 10 ** 6),
      resB: String(parseFloat(resTK1TK2[1].toString()) / 10 ** 6),
      price: String(parseFloat(resTK1TK2[0].toString()) / 10 ** 6 / (parseFloat(resTK1TK2[1].toString()) / 10 ** 6)),

    }
    console.log(rowTK1TK2)
    //arr.push(rowTK1TK2);
    setTable((previousState) => [
      ...previousState,
      rowTK1TK2
    ]);
    var resTK1TK3 = await UniswapV2PairTK1TK3.getReserves();

    let rowTK1TK3 = {
      tkA:ETHEREUM_TK1,
      tkB:ETHEREUM_TK3,
      pair: "usdT/dai",
      pairAddress: addressPairTK1TK3,
      lastBlockTimeStamp: resTK1TK3[2].toString(),
      timestamp:new Date().getTime(),
      resA: String(parseFloat(resTK1TK3[0].toString()) / 10 ** 18),
      resB: String(parseFloat(resTK1TK3[1].toString()) / 10 ** 6),
      price: String(parseFloat(resTK1TK3[0].toString()) / 10 ** 18 / (parseFloat(resTK1TK3[1].toString()) / 10 ** 6))
    }
    console.log(rowTK1TK3)
   // arr.push(rowTK1TK3);
   setTable((previousState) => [
    ...previousState,
    rowTK1TK3
  ]);
    var resTK2TK3 = await UniswapV2PairTK2TK3.getReserves();

    let rowTK2TK3 = {
      tkA:ETHEREUM_TK2,
      tkB:ETHEREUM_TK3,
      pair: "usdC/dai",
      pairAddress: addressPairTK2TK3,
      lastBlockTimeStamp: resTK2TK3[2].toString(),
      timestamp:new Date().getTime(),
      resA: String(parseFloat(resTK2TK3[0].toString()) / 10 ** 18),
      resB: String(parseFloat(resTK2TK3[1].toString()) / 10 ** 6),
      price: String(parseFloat(resTK2TK3[0].toString()) / 10 ** 18 / (parseFloat(resTK2TK3[1].toString()) / 10 ** 6))
    }
    console.log(rowTK2TK3)
   // arr.push(rowTK2TK3);

  
    setTable((previousState) => [
      ...previousState,
      rowTK2TK3
    ]);

  }

  React.useEffect(() => {
    async function get() {
      await getPair();
      await getReserves();
    }
    get();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <HStack m='5' p='2'>
      <Button onClick={()=>getReserves()}>update</Button>
    <Button onClick={()=>flushTable()}>reset</Button>

      </HStack>
   
      <Table >
        <Thead>
          <Tr>
          <Th>timestamp</Th>
            <Th>addr tkA</Th>
            <Th>addr tkB</Th>
            <Th>pair</Th>
            <Th>addr pair</Th>
            <Th>blocktimestamp</Th>
           
            <Th>res tkA</Th>
            <Th>res tkB</Th>
            
            <Th>price</Th>
            <Th>price *10k</Th>
            <Th>inverse price</Th>
           
            <Th>inverse price *10k</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            table && table.map((item, i) => {
              return (
                <Tr key={i}>
             <Td>{item.timestamp}</Td>
             <Td><Link isExternal href={'https://etherscan.io/address/' + item.tkA}>{item.tkA.substr(0,4)}...{item.tkA.substr(-4)}</Link></Td>
             <Td><Link isExternal href={'https://etherscan.io/address/' + item.tkB}>{item.tkB.substr(0,4)}...{item.tkB.substr(-4)}</Link></Td>
                  <Td>{item.pair}</Td>
                  <Td><Link isExternal href={'https://etherscan.io/address/' + item.pairAddress}>{item.pairAddress.substr(0,4)}...{item.pairAddress.substr(-4)}</Link></Td>
                  <Td>{item.lastBlockTimeStamp}</Td>
                  
                 < Td>{item.resA}</Td>
                  <Td>{item.resB}</Td>
            
                  <Td>{item.price}</Td>
                  <Td>{String(parseFloat(item.price)*10000)}</Td>
                  <Td>{String(1/parseFloat(item.price))}</Td>
                  <Td>{String((1/parseFloat(item.price))*10000)}</Td>
                </Tr>)
            })
          }


        </Tbody>
      </Table>
    </Box>
  );
}
