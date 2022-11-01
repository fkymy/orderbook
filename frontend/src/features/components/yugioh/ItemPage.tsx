import { Avatar, Box, Button, Center, Container, Divider, Flex, Grid, HStack, Image, Link, others, Spacer, Square, Stack, Table, Text, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import { constAddress } from "src/features/constant/constAddress";
import MarketPlaceFacotory from "../../../../../backend/artifacts/contracts/MarketPlaceFactory.sol/MarketPlaceFactory.json";
import MarketPlace from "../../../../../backend/artifacts/contracts/MarketPlace.sol/MarketPlace.json";
import SampleGameNFT from "../../../contracts/SampleGameNFT.sol/SampleGameNFT.json";
import axios from "axios";
import { constUrl } from "src/features/constant/constURL";
import { env } from "process";
import { useEffect, useState } from "react";
import { YugidamaHeader } from "./header";
import BackgroundImage from "./assets/back_ground.png";
import NextImage, { StaticImageData } from 'next/image';
// import { url } from "inspector";
import StoreYugidamaIcon from "./assets/storeIcon/yugidama.png";
import StoreOpenseaIcon from "./assets/storeIcon/opensea.png";
import StoreLooksrareIcon from "./assets/storeIcon/looksrare.png";
import StoreX2Y2Icon from "./assets/storeIcon/x2y2.png";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { CardType, CollectionMetadataType, RarityType } from "src/types/collectionMetadata";
import { time } from "console";
import { MonstorMetadataTable } from "./mostorMetadataTable";
import { TrapAndMagicMetadataTable } from "./trapAndMagicMetadataTable";


interface Props {
  tokenId: number;
  contractAddress: string;
  nftdata: any;
}

interface StorePriceCardProps {
  store: "yugidama" | "opensea" | "x2y2" | "looksrare";
  price: number;
};

function StorePriceCard(props: StorePriceCardProps) {
  let storeIcon: StaticImageData;
  let storeName: string = "";

  switch (props.store) {
    case "yugidama":
      storeIcon = StoreYugidamaIcon;
      storeName = "Yugidama"
      break;
    case "opensea":
      storeIcon = StoreOpenseaIcon;
      storeName = "OpenSea"
      break;
    case "x2y2":
      storeIcon = StoreX2Y2Icon;
      storeName = "X2Y2";
      break;
    case "looksrare":
      storeIcon = StoreLooksrareIcon;
      storeName = "LooksRare";
      break;
  }

  return (
    <Box 
      // height="84px" 
      borderRadius="10px" 
      borderColor="#4D4762" 
      borderWidth="1px"
      padding="16px 18.5px"
    >
      <Grid templateColumns="52px 1fr">
        <Box height="52px">
          <NextImage
            src={storeIcon}
            width="52px"
            height="52px"
          />
        </Box>
        <Box>
          <Flex margin="8px 0px 8px 16px">
            <Flex>
              <Box marginRight="14px">
                <Text fontSize="24px" as="b">
                  {props.price.toFixed(2)}
                </Text>
              </Box>
              <Center>
                <Text>
                  ETH
                </Text>
              </Center>
            </Flex>
            <Spacer/>
            <Box padding="6px 0px">
              <Text alignContent="center">
                {"出品者："}<b>{storeName}</b>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
}

const OverflowEllipsis = ({ children }: { children: string }) => (
  <div style={{ display: 'table', width: '100%' }}>
    <p
      style={{
        display: 'table-cell',
        maxWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </p>
  </div>
);

export function YuGiOhItem(props: Props) {
  // const [ attribute, setAttribute ] = useState<string>("");
  // const [ level, setLevel ] = useState<string>("");
  const [ metadata, setmetadata ] = useState<any>();
  const [ parsedMetadata, setParsedMetadata ] = useState<CollectionMetadataType>();
  // console.log(props.nftdata.tokenUri.gateway);
  console.log(props.tokenId);
  console.log(props.nftdata);

  useEffect(() => {
    // let response;
    // return;
    axios
      .get(props.nftdata.tokenUri.gateway)
      .then((res) => {
        // response = res?.data;
        // console.log(res?.data);
        setmetadata(res?.data);
        // console.log(res?.data?.attributes)
        // for (const attribute in res?.data?.attributes) {
        //   console.log("attr", attribute);
        // }
        let type: CardType;
        let rarity: RarityType;
        let attribute: string;
        let level: number;
        let atk: number;
        let def: number;
        let effect: string;
        // console.log(res?.data);
        res?.data?.attributes?.map((elem) => {
          console.log(elem.trait_type, elem.value);
          switch (elem.trait_type) {
            case "type":
              type = elem.value;
              break;
            case "rarity":
              rarity = elem.value;
              break;
            case "attribute":
              attribute = elem.value;
              break;
            case "level":
              level = elem.value;
              break;
            case "atk":
              atk = elem.value;
              break;
            case "def":
              def = elem.value;
              // console.log("def", elem)
              break;
            case "effect":
              effect = elem.value;
              break;
          }
        });
        console.log("def", def);
        // console.log(type, rarity, level);
        if (type === "モンスター") {
          setParsedMetadata({
            type,
            rarity,
            monsterAttributes: {
              attribute, level, atk, def
            }
          });
        } else {
          setParsedMetadata({
            type,
            rarity,
            otherAttributes: {
              effect
            }
          });
        }
      });
    // console.log();
  }, []);

  // console.log(metadata?.image.replace("ipfs://", "https://ipfs.io/ipfs/"));

  async function listingItem(value) {
    // console.log('click listingItem');
    if (!window.ethereum) {
      return;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    // console.log(accounts, constAddress.marketPlaceAddress);

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

  // const metadata = {
  //   "name": "ホワイトマジシャンガール",
  //   "description": "1ターンに1度。このカードのXyz素材を1つ切り離し、相手がコントロールするモンスター1体を対象として、そのモンスターを破壊し、破壊した場合、相手に元々のATKと同じ値のダメージを与える。フェアリー・タイプXyz」のこの効果は1ターンに1度しか使用できない。",
  //   "image": "**",
  //   "attributes": [
  //     {
  //       "trait_type": "type",
  //       "value": "モンスター"
  //     },
  //     {
  //       "trait_type": "effect",
  //       "value": "効果モンスター"
  //     },
  //     {
  //       "trait_type": "rarity",
  //       "value": "R"
  //     },
  //     {
  //       "trait_type": "attribute",
  //       "value": "闇"
  //     },
  //     {
  //       "trait_type": "monster-type",
  //       "value": "魔法使い族"
  //     },
  //     {
  //       "trait_type": "level",
  //       "value": "6"
  //     },
  //     {
  //       "trait_type": "atk",
  //       "value": "2000"
  //     },
  //     {
  //       "trait_type": "def",
  //       "value": "1700"
  //     }
  //   ]
  // }

  return (
    <Box backgroundColor="#0B0134" minHeight="100vh">
      <Stack spacing={0}>
        <YugidamaHeader/>
        <Box>
          <Box
            backgroundImage='url("../../assets/back_ground.png")' 
            backgroundPosition="center"
            backgroundSize="cover"
            objectFit="cover"
            height="432px"
          >
            <Center color="white" height="100%">
              <Image
                src={metadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/")}
                // src={props.nftdata?.media[0]?.gateway}
                height="360px"
              />
            </Center>
          </Box>
        </Box>
        <Box color="white" padding="24px 230px">
          <Grid templateColumns="480fr 400fr" gap="108px">
            <Box>
              <Box>
                <Text as="b" fontSize="24px">
                  {metadata?.name}
                </Text>
              </Box>
              <Box margin="24px 0px">
                <Text fontSize="16px">
                  {metadata?.description}
                </Text>
              </Box>
              {
                parsedMetadata?.type === "モンスター"
                  ? <MonstorMetadataTable
                      metadata={parsedMetadata}
                    />
                  : <TrapAndMagicMetadataTable
                      metadata={parsedMetadata}
                    />
              }
              {/* <Box>
                <Grid templateColumns="repeat(4, 1fr)">
                  {
                    ["属性", "レベル", "攻撃力", "防御力"].map((colName, idx) => {
                      return (
                        <Box 
                          backgroundColor="#353052" 
                          borderColor="#8F8F8F"
                          borderTopWidth="1px"
                          borderBottomWidth="1px"
                          borderRightWidth="1px"
                          borderLeftWidth={idx === 0 ? "1px" : "0px"}
                          textAlign="center"
                          key={idx}
                        >
                          <Center height="32px">
                            {colName}
                          </Center>
                        </Box>
                      );
                    })
                  }
                </Grid>
                <Grid height="42px" templateColumns="repeat(4, 1fr)">
                  <Box
                    borderWidth="0px 1px 1px 1px"
                    borderColor="#8F8F8F"
                  >
                    <Flex alignItems="center" height="42px">
                      <Spacer/>
                      <Box>
                        <Center>
                          <NextImage
                            src={getTypeIcon(parsedMetadata?.monsterAttributes.attribute)}
                            width="24px"
                            height="24px"
                          />
                        </Center>
                      </Box>
                      <Spacer/>
                      <Text as="b" fontSize="20">
                        {`${parsedMetadata?.monsterAttributes.attribute}属性`}
                      </Text>
                      <Spacer/>
                    </Flex>
                  </Box>
                  <Box
                    borderWidth="0px 1px 1px 0px"
                    borderColor="#8F8F8F"
                  >
                    <Flex justify="center" alignItems="center" height="42px">
                      <Spacer/>
                      <Spacer/>
                      <Box>
                        <Center>
                          <NextImage
                            src={LevelIcon}
                            width="24px"
                            height="24px"
                          />
                        </Center>
                      </Box>
                      <Spacer/>
                      <Text as="b" fontSize="20">
                        {parsedMetadata?.monsterAttributes.level}
                      </Text>
                      <Spacer/>
                      <Spacer/>
                    </Flex>
                  </Box>
                  <Box
                    borderWidth="0px 1px 1px 0px"
                    borderColor="#8F8F8F"
                  >
                    <Center height="42px">
                      <Text as="b" fontSize="20">
                        {parsedMetadata?.monsterAttributes.atk}
                      </Text>
                    </Center>
                  </Box>
                  <Box
                    borderWidth="0px 1px 1px 0px"
                    borderColor="#8F8F8F"
                  >
                    <Center height="42px">
                      <Text as="b" fontSize="20">
                        {parsedMetadata?.monsterAttributes.def}
                      </Text>
                    </Center>
                  </Box>
                </Grid>
              </Box> */}
              <Divider margin="36px 0px" color="#4C4C4C"/>
              <Box>
                <Stack>
                  <Box>
                    <Text as="b">
                      関連カード
                    </Text>
                  </Box>
                  <Box>
                    <HStack spacing={"24px"}>
                      <Image
                        src="https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/1.jpg"
                        width="63px"
                      />
                      <Image
                        src="https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/0.jpg"
                        width="63px"
                      />
                      <Image
                        src="https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/3.jpg"
                        width="63px"
                      />
                      <Image
                        src="https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/9.jpg"
                        width="63px"
                      />
                    </HStack>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Box>
                <Stack spacing="16px">
                  {/* <StorePriceCard
                    price={1.1}
                    store={"opensea"}
                  />
                  <StorePriceCard
                    price={1.23}
                    store={"looksrare"}
                  /> */}
                  <StorePriceCard
                    price={1.1}
                    store={"yugidama"}
                  />
                  <StorePriceCard
                    price={1.1}
                    store={"x2y2"}
                  />
                </Stack>
                <Button bg="#4114C2" height="51px" width="100%" margin="24px 0px 36px 0px">
                  今すぐ購入
                </Button>
                <Box width="100%" paddingRight="6px">
                  <Flex>
                    <Spacer/>
                    <Center>
                      <Avatar
                        width="36px"
                        height="36px"
                        bg="#D9D9D9"
                      />
                    </Center>
                    <Box marginLeft="16px">
                      <Text fontSize="12px">
                        オーナー
                      </Text>
                      <Box>
                        <Link href="https://google.com" isExternal>
                          <Box width="120px">
                            <Flex>
                              <OverflowEllipsis>
                                {"0x7b9417B4cfcE6788F76367ACf1c4C456EF042524"} 
                              </OverflowEllipsis>
                              <Center>
                                <ExternalLinkIcon/>
                              </Center>
                            </Flex>
                          </Box>
                        </Link>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
                <Divider margin="36px 0px"/>
                <Stack spacing="16px">
                  <Text as="b">
                    情報
                  </Text>
                  <Box marginTop="16px">
                    <Box>
                      <Flex>
                        <Flex>
                          <Center>
                            {/* <Avatar
                              width="36px"
                              height="36px"
                            /> */}
                            <Image
                              bg="#D9D9D9"
                              width="36px"
                              height="36px"
                            />
                          </Center>
                          <Box marginLeft="16px">
                            <Text fontSize="12px">
                              コレクション
                            </Text>
                            <Text as="b">
                              第二世代
                            </Text>
                          </Box>
                        </Flex>
                        <Spacer/>
                        <Flex>
                          <Center>
                            <Avatar
                              width="36px"
                              height="36px"
                              bg="#D9D9D9"
                            />
                          </Center>
                          <Box marginLeft="16px">
                            <Text fontSize="12px">
                              クリエイター
                            </Text>
                            <Box>
                              <Link href={`https://goerli.etherscan.io/address/0xf6D84F6a47F74Ebbd644a388D64d8cBE7617d9A1`} isExternal>
                                <Box width="120px">
                                  <Flex>
                                    <OverflowEllipsis>
                                      {"0xf6D84F6a47F74Ebbd644a388D64d8cBE7617d9A1"} 
                                    </OverflowEllipsis>
                                    <Center>
                                      <ExternalLinkIcon/>
                                    </Center>
                                  </Flex>
                                </Box>
                              </Link>
                            </Box>
                          </Box>
                        </Flex>

                      </Flex>
                    </Box>
                  </Box>
                  <Box>
                    <Flex>
                      <Text>
                        コントラクト
                      </Text>
                      <Spacer/>
                      <Box>
                        <Link href={`https://goerli.etherscan.io/address/${props.contractAddress}`} isExternal>
                          <Box width="120px">
                            <Flex>
                              <OverflowEllipsis>
                                {props.contractAddress} 
                              </OverflowEllipsis>
                              <Center>
                                <ExternalLinkIcon/>
                              </Center>
                            </Flex>
                          </Box>
                        </Link>
                      </Box>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex>
                      <Text>
                        トークンID
                      </Text>
                      <Spacer/>
                      <Text>
                        {props.tokenId}
                      </Text>
                    </Flex>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Stack>
      {/* <Grid templateColumns='6fr 4fr' gap={10}>
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
      </Grid> */}
    </Box>
  );
}
