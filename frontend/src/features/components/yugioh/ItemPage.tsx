import { Box, Button, Center, Container, Flex, Grid, HStack, Image, others, Spacer, Square, Stack, Text, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import { constAddress } from "src/features/constant/constAddress";
import MarketPlaceFacotory from "../../../../../backend/artifacts/contracts/MarketPlaceFactory.sol/MarketPlaceFactory.json";
import MarketPlace from "../../../../../backend/artifacts/contracts/MarketPlace.sol/MarketPlace.json";
import SampleGameNFT from "../../../contracts/SampleGameNFT.sol/SampleGameNFT.json";
import axios from "axios";
import { constUrl } from "src/features/constant/constURL";
import { env } from "process";
import { useState } from "react";

interface Props {
  tokenId: number;
  contractAddress: string;
  nftdata: any;
}

export function YuGiOhItem(props: Props) {
  // const marketPlaceFactoryAddress = "0x0be934D7f224E559CD02eC604C543aEc3eAAAD10";
  // const [nftAbi, setNftAbi] = useState<any>();


  async function listingItem(value) {
    // console.log('click listingItem');
    if (!window.ethereum) {
      return;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    console.log(accounts, constAddress.marketPlaceAddress);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    /**
     * create MarketPlace
     */
    // const marketPlaceFactoryContract = new ethers.Contract(
    //   constAddress.marketPlaceFactoryAddress, 
    //   MarketPlaceFacotory.abi,
    //   provider
    // );
    // const tx = await marketPlaceFactoryContract.connect(signer).createMarketPlace(
    //   "firstMarket",
    //   1,
    // );
    // console.log(tx);
    // const marketAddress = await marketPlaceFactoryContract.connect(signer).listOfMarketPlaces(
    //   accounts[0]
    // );
    // console.log(marketAddress);

    /**
     * get NFT Contract and approval all
     */
    // let abi = SampleGameNFT.abi;
    // let abi;
    // await axios
    //   .get(constUrl.etherscanGoerliNetApiURL, {
    //   // .get(constUrl.polygonscanMumbaiNetApiURL, {
    //     params: {
    //       module: 'contract',
    //       action: 'getabi',
    //       address: props.contractAddress,
    //       apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
    //       // apiKey: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY,
    //     }
    //   })
    //   .then((res) => {
    //     abi = JSON.parse(res?.data?.result);
    //   });
    // console.log(abi);
    // const nftContract = new ethers.Contract(
    //   props.contractAddress,
    //   abi,
    //   provider
    // );
    // console.log(nftContract);
    // const approval = await nftContract.connect(signer).setApprovalForAll(
    //   constAddress.marketPlaceAddress,
    //   true
    // );
    // console.log(approval);

    /**
     * listItem
     */
    const marketPlaceContract = new ethers.Contract(
      constAddress.marketPlaceAddress, 
      MarketPlace.abi,
      provider
    );
    const tx = await marketPlaceContract.connect(signer).listItem(
      props.contractAddress,
      props.tokenId,
      value,
      { gasLimit: 1 * 10 ** 6 }
    );
    console.log(tx);
    // console.log(await(tx).wait());
  
    // const item = await marketPlaceContract.connect(signer).items(
    //   1
    // );
    // console.log(item);
  }

  async function purchaseItem(tokenId, value) {
    if (!window.ethereum) {
      return;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    console.log(accounts, constAddress.marketPlaceAddress);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    /**
     * BuyItem
     */
    const marketPlaceContract = new ethers.Contract(
      constAddress.marketPlaceAddress, 
      MarketPlace.abi,
      provider
    );
    // const itemCount = await marketPlaceContract.connect(signer).itemCount();
    // console.log(itemCount);
    const tx = await marketPlaceContract.connect(signer).purchaseItem(
      // props.tokenId,
      tokenId,
      {
        value: value,
        gasLimit: 1 * 10 ** 6,
      }
    );
    console.log(tx);
  } 

  // console.log(nftAbi);

  return (
    <Box padding="80px 96px">
      <Grid templateColumns='6fr 4fr' gap={10}>
        <Box>
          <Box style={{
              paddingTop: '100%',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '45px',
              // height: '100%',
            }}
            shadow='2xl'
          >
            <Image
              // src={`${props.nftdata?.metadata?.image}`}
              src={`${props.nftdata?.media[0]?.gateway}`}
              style={{
                borderRadius: '45px',
                objectFit: 'contain',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </Box>
        </Box>
        <Box>
          <Stack>
            <Text as="b" fontSize='5xl' lineHeight='45px'>
              {props.nftdata?.metadata?.name}
            </Text>
            <Container h="100px" padding="25px" borderRadius='30px' shadow='md' borderWidth="1px" style={{marginTop: '40px'}}>
              <Flex h="100%">
                <Box h="100%">
                  <Center h="100%">
                    <Text as="b" fontSize='2xl' alignContent='center'>
                      4.0 ETH (TODO)
                    </Text>
                  </Center>
                </Box>
                <Spacer/>
                <Box h="100%">
                  <Button 
                    h="100%" 
                    bg="#3772ff" 
                    color="#ffffff" 
                    borderRadius="full" 
                    onClick={() => purchaseItem(3, 1)}
                  >
                    Buy now
                  </Button>
                </Box>
              </Flex>
            </Container>
            <Container h="100px" padding="25px" borderRadius='30px' shadow='md' borderWidth="1px" style={{marginTop: '40px'}}>
              <Flex h="100%">
                <Box h="100%" w="45%">
                  <Button
                    h="100%" 
                    w="100%" 
                    bg="#3772ff" 
                    color="#ffffff" 
                    borderRadius="full"
                    onClick={() => listingItem(1)}
                  >
                    Fixed Price
                  </Button>
                </Box>
                <Spacer/>
                <Box h="100%" w="45%">
                  <Button h="100%" w="100%" bg="#3772ff" color="#ffffff" borderRadius="full">
                    Auction
                  </Button>
                </Box>
              </Flex>
            </Container>
            <Box style={{marginTop: '45px'}}>
              <Stack>
                <Text color="gray">
                  {props.nftdata?.metadata?.description}
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}
