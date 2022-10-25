import { HStack, Button, Icon, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea } from "@chakra-ui/react";
import { Box, Container, Stack, Text } from "@chakra-ui/layout";
import { Dispatch, SetStateAction, useState } from "react";
import { ethers } from 'ethers';
import MarketPlaceFacotory from "../../../../backend/artifacts/contracts/MarketPlaceFactory.sol/MarketPlaceFactory.json"


interface Props {
  previewMode: string;
  setPreviewMode: Dispatch<SetStateAction<string>>;
  collectionAddress: string;
  setCollectionAddress: Dispatch<SetStateAction<string>>;
  collectionDescription: string;
  setCollectionDescription: Dispatch<SetStateAction<string>>;
  // isGotCollectionData: boolean;
  // setIsGotCollectionData: Dispatch<SetStateAction<boolean>>; 
};


export function CreateForm(props: Props) {
  const format = (val) => val + `%`
  const parse = (val) => val.replace(/%$/, '')

  // const [contractAddress, setContractAddress] = useState('');
  const [creatorFee, setCreatorFee] = useState(0);

  const marketPlaceFactoryAddress = "0x0be934D7f224E559CD02eC604C543aEc3eAAAD10";

  // console.log(MarketPlaceFacotory);
  async function createMarketPlace() {
    if (!window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // console.log(accounts[0]);
    }
    // if (window.ethereum) {
    //   return;
    // }
    // setIsConnected(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const marketPlaceFactoryContract = new ethers.Contract(
      marketPlaceFactoryAddress, 
      MarketPlaceFacotory.abi,
      provider
    );
    // const tx = await marketPlaceFactoryContract.connect(signer).createMarketPlace(
    //   "firstMarket",
    //   creatorFee,
    // );
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // console.log(accounts[0]);
    const tx2 = await marketPlaceFactoryContract.connect(signer).listOfMarketPlaces(
      accounts[0]
    )
    // console.log(tx);
    // console.log(tx2);
  }

  return (
    <Container style={{
      padding: '10px'
    }}>
      <Stack spacing={4}>
        <Box>
          <Text as="b" fontSize='4xl'>
            {`[Logo(TODO)]`}
          </Text>
        </Box>
        <Stack width={'100%'}>
          <Text as="b" fontSize="1xl">
            Contract Address
          </Text>
          <Input
            placeholder="0x000000....."
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
            }}
            value={props.collectionAddress}
            onChange={(event) => {
              // props.setIsGotCollectionData(false);
              // setContractAddress(event.target.value);
              props.setCollectionAddress(event.target.value);
            }}
          />
        </Stack>
        <Stack width={'100%'}>
          <Text as="b" fontSize="1xl">
            MarketPlace Free
          </Text>
          <NumberInput
            value={format(creatorFee)}
            onChange={(valueString) => {
              setCreatorFee(parse(valueString))
            }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
            }}
            min={0}
            max={100}
            step={1}
            precision={0}
          >
            <NumberInputField/>
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <Stack width={'100%'}>
          <Text as="b" fontSize="1xl">
            Preview Mode
          </Text>
          <Container style={{
            backgroundColor: '#ffffff',
            height: '46px',
            borderRadius: '10px',
            padding: 7
          }}>
            <HStack height='100%' spacing={2} style={{
              padding: 0
            }}>
              {/* <Box width='50%' textAlign="center">
                
              </Box> */}
              <Button
                style={{
                  width: '50%',
                  height: '35px',
                  backgroundColor: props.previewMode == 'market' ? '#0f0f0f' : '#ffffff',
                  color: props.previewMode == 'market' ? '#f0f0f0': '#0f0f0f',
                }}
                onClick={() => {
                  props.setPreviewMode('market');
                }}
              >
                MarketPlace
              </Button>
              <Button
                style={{
                  width: '50%',
                  height: '36px',
                  backgroundColor: props.previewMode == 'item' ? '#0f0f0f' : '#ffffff',
                  color: props.previewMode == 'item' ? '#f0f0f0': '#0f0f0f',
                }}
                onClick={() => {
                  props.setPreviewMode('item');
                }}
              >
                Item
              </Button>
            </HStack>
          </Container>
        </Stack>
        <Button
          style={{
            backgroundColor: '#0f0f0f',
            color: '#ffffff'
          }}
          onClick={createMarketPlace}
        >
          Create
        </Button>
        <Stack>
          <Text as="b" fontSize="1xl">
            Discription
          </Text>
          <Textarea
            backgroundColor='#ffffff'
            height="100px"
            borderRadius='10px'
            resize='none'
            onChange={(event) => props.setCollectionDescription(event.target.value)}
          />
        </Stack>
      </Stack>
    </Container>
  )
}
