import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import { ethers } from 'ethers'
import NextImage, { StaticImageData } from 'next/image'
import { useEffect, useState, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import MarketPlace from '../../../../../contracts/artifacts/contracts/MarketPlace.sol/MarketPlace.json'
import MarketPlaceFacotory from '../../../../../contracts/artifacts/contracts/MarketPlaceFactory.sol/MarketPlaceFactory.json'
import { getRarityIcon } from './getRarityIcon'
import { YugidamaHeader } from './header'
import { MonstorMetadataTable } from './mostorMetadataTable'
import { StorePriceCard } from './storeCard'
import { TrapAndMagicMetadataTable } from './trapAndMagicMetadataTable'
import { constAddress } from 'src/features/constant/constAddress'
import { constUrl } from 'src/features/constant/constURL'
import { CardType, CollectionMetadataType, RarityType } from 'src/types/collectionMetadata'
import { SiEthereum } from 'react-icons/si';

interface Props {
  tokenId: number
  contractAddress: string
  nftdata: any
  nftAllData: any
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
)

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

export function YuGiOhItem(props: Props) {

  console.log(props.nftAllData);
  // const [ attribute, setAttribute ] = useState<string>("");
  // const [ level, setLevel ] = useState<string>("");
  const [accounts, setAccounts] = useState<string[]>([]);
  const [metadata, setmetadata] = useState<any>()
  const [parsedMetadata, setParsedMetadata] = useState<CollectionMetadataType>()
  // console.log(props.nftdata.tokenUri.gateway);
  // console.log(props.tokenId);
  // console.log(props.nftdata);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // let response;
    // return;
    const getAccount = async () => {
      // if (!window.ethereum) {
      //   const accounts = await window.ethereum.request({
      //     method: 'eth_requestAccounts',
      //   });
      //   console.log(accounts);
      // } else {
      //   const accounts = await window.ethereum.request({
      //     method: 'eth_requestAccounts',
      //   });
      //   console.log(accounts);
      // }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      // console.log(accounts);
      setAccounts(accounts);
    }
    getAccount();

    setmetadata(props.nftAllData?.rawMetadata);

    let type: CardType;
    let rarity: RarityType;
    let attribute: string;
    let level: number;
    let atk: number;
    let def: number;
    let effect: string;
    props.nftAllData?.rawMetadata?.attributes?.map((elem) => {
      // console.log(elem.trait_type, elem.value);
      switch (elem.trait_type) {
        case 'type':
          type = elem.value
          break
        case 'rarity':
          rarity = elem.value
          break
        case 'attribute':
          attribute = elem.value
          break
        case 'level':
          level = elem.value
          break
        case 'atk':
          atk = elem.value
          break
        case 'def':
          def = elem.value
          break
        case 'effect':
          effect = elem.value
          break
      }
    })
    // console.log("def", def);
    // console.log(type, rarity, level);
    if (type === 'モンスター') {
      setParsedMetadata({
        type,
        rarity,
        monsterAttributes: {
          attribute,
          level,
          atk,
          def,
        },
      })
    } else {
      setParsedMetadata({
        type,
        rarity,
        otherAttributes: {
          effect,
        },
      })
    }

    // axios.get(props.nftdata?.tokenUri?.gateway).then((res) => {
    //   // response = res?.data;
    //   // console.log(res?.data);
    //   setmetadata(res?.data)
    //   // console.log(res?.data?.attributes)
    //   // for (const attribute in res?.data?.attributes) {
    //   //   console.log("attr", attribute);
    //   // }
    //   let type: CardType
    //   let rarity: RarityType
    //   let attribute: string
    //   let level: number
    //   let atk: number
    //   let def: number
    //   let effect: string
    //   // console.log(res?.data);
    //   res?.data?.attributes?.map((elem) => {
    //     // console.log(elem.trait_type, elem.value);
    //     switch (elem.trait_type) {
    //       case 'type':
    //         type = elem.value
    //         break
    //       case 'rarity':
    //         rarity = elem.value
    //         break
    //       case 'attribute':
    //         attribute = elem.value
    //         break
    //       case 'level':
    //         level = elem.value
    //         break
    //       case 'atk':
    //         atk = elem.value
    //         break
    //       case 'def':
    //         def = elem.value
    //         break
    //       case 'effect':
    //         effect = elem.value
    //         break
    //     }
    //   })
    //   // console.log("def", def);
    //   // console.log(type, rarity, level);
    //   if (type === 'モンスター') {
    //     setParsedMetadata({
    //       type,
    //       rarity,
    //       monsterAttributes: {
    //         attribute,
    //         level,
    //         atk,
    //         def,
    //       },
    //     })
    //   } else {
    //     setParsedMetadata({
    //       type,
    //       rarity,
    //       otherAttributes: {
    //         effect,
    //       },
    //     })
    //   }
    // })
    // console.log();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(metadata?.image.replace("ipfs://", "https://ipfs.io/ipfs/"));

  async function listingItem(value) {
    // console.log('click listingItem');
    if (!window.ethereum) {
      return
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    // console.log(accounts, constAddress.marketPlaceAddress);

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

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
    )
    const tx = await marketPlaceContract
      .connect(signer)
      .listItem(props.contractAddress, props.tokenId, value, { gasLimit: 1 * 10 ** 6 })
    console.log(tx)
    // console.log(await(tx).wait());

    // const item = await marketPlaceContract.connect(signer).items(
    //   1
    // );
    // console.log(item);
  }

  async function purchaseItem(tokenId, value) {
    if (!window.ethereum) {
      return
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    console.log(accounts, constAddress.marketPlaceAddress)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    /**
     * BuyItem
     */
    const marketPlaceContract = new ethers.Contract(
      constAddress.marketPlaceAddress,
      MarketPlace.abi,
      provider
    )
    // const itemCount = await marketPlaceContract.connect(signer).itemCount();
    // console.log(itemCount);
    const tx = await marketPlaceContract.connect(signer).purchaseItem(
      // props.tokenId,
      tokenId,
      {
        value: value,
        gasLimit: 1 * 10 ** 6,
      }
    )
    console.log(tx)
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

  // console.log(accounts?.at(0) === props.nftAllData?.owners?.at(0));
  // console.log(props.nftAllData?.orders);

  return (
    <Box backgroundColor='#0B0134' minHeight='100vh'>
      <Stack spacing={0}>
        <YugidamaHeader />
        <Box>
          <Box
            backgroundImage='url("../../assets/back_ground.png")'
            backgroundPosition='center'
            backgroundSize='cover'
            objectFit='cover'
            height='432px'
          >
            <Center color='white' height='100%'>
              {/* <Box height="360px" width="245.89px"> */}
                <Tilt className="box" options={{scale: 1.1, speed: 3000, max: 30, glare: true, "max-glare": 0.98}}>
                  {/* <Box height='360px'> */}
                    <Image
                      src={metadata?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                      // src={props.nftdata?.media[0]?.gateway}
                      alt='card image'
                      height='360px'
                    />
                    {/* <Box
                      backgroundImage={metadata?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                      height="360px"
                      width="245.89px"
                      // bg="red"
                      backgroundSize="cover"
                    ></Box> */}
                  {/* </Box> */}
                </Tilt>
              {/* </Box> */}
            </Center>
          </Box>
        </Box>
        <Box color='white' padding='24px 230px'>
          <Grid templateColumns='480fr 400fr' gap='108px'>
            <Box>
              <Box>
                <Flex>
                  <Box marginRight='6px'>
                    <Center height='100%'>
                      <NextImage
                        src={getRarityIcon(parsedMetadata?.rarity)}
                        width='42px'
                        height='24px'
                      />
                    </Center>
                  </Box>
                  <Text as='b' fontSize='24px'>
                    {metadata?.name}
                  </Text>
                </Flex>
              </Box>
              <Box margin='24px 0px'>
                <Text fontSize='16px'>{metadata?.description}</Text>
              </Box>
              {
                parsedMetadata?.type === 'モンスター' ? (
                  <MonstorMetadataTable metadata={parsedMetadata} />
                ) : (
                  <TrapAndMagicMetadataTable metadata={parsedMetadata} />
                )
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
              <Divider margin='36px 0px' color='#4C4C4C' />
              <Box>
                <Stack>
                  <Box>
                    <Text as='b'>関連カード</Text>
                  </Box>
                  <Box>
                    <HStack spacing={'24px'}>
                      <Image
                        src='https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/1.jpg'
                        width='63px'
                        alt='card image'
                      />
                      <Image
                        src='https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/0.jpg'
                        width='63px'
                        alt='card image'
                      />
                      <Image
                        src='https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/3.jpg'
                        width='63px'
                        alt='card image'
                      />
                      <Image
                        src='https://ipfs.io/ipfs/QmT7YCnW6nv5awQPe3qrWwwFqku6kjP1e9fT8tDdRUjpDs/9.jpg'
                        width='63px'
                        alt='card image'
                      />
                    </HStack>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Box>
                {
                  accounts?.at(0) === props.nftAllData?.owners?.at(0) ? (
                    <>
                      <Grid templateColumns="1fr 1fr" gap="24px" marginBottom="36px">
                        <Button 
                          height="51px" 
                          borderRadius="12px" 
                          bg="#4114C2" 
                          onClick={onOpen}
                        >
                          出品
                        </Button>
                        <Button height="51px" bg="#0B0134" borderRadius="12px" borderWidth="1px" borderColor="#D8D8D8">
                          オークション
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Stack spacing="16px">
                        {
                          props?.nftAllData?.nativeOrders?.map((nft, idx) => {
                            if (nft?.status === "ACTIVE") {
                              return (
                                <StorePriceCard
                                  key={`orderbook${idx}`}
                                  price={nft?.decimalAmount}
                                  store={nft?.kind}
                                />
                              )
                            }
                          })
                        }
                        {
                          props.nftAllData?.orders?.map((nft, idx) => {
                            // console.log(nft?.price)
                            if (nft?.status === "active") {
                              return (
                                <StorePriceCard
                                key={`order${idx}`}
                                  price={nft?.price?.amount?.native}
                                  store={nft?.kind}
                                />
                              );
                            }
                          })
                        }
                      </Stack>
                      <Button bg='#4114C2' height='51px' width='100%' margin='24px 0px 36px 0px'>
                        今すぐ購入
                      </Button>
                    </>
                  )
                }
                {/* <Stack spacing='16px'> */}
                  {/* <StorePriceCard
                    price={1.1}
                    store={"opensea"}
                  />
                  <StorePriceCard
                    price={1.23}
                    store={"looksrare"}
                  /> */}
                  {/* <StorePriceCard price={1.1} store={'orderbook'} />
                  <StorePriceCard price={1.1} store={'x2y2'} /> */}
                {/* </Stack> */}
                <Box width='100%' paddingRight='6px'>
                  <Flex>
                    <Spacer />
                    <Center>
                      <Avatar width='36px' height='36px' bg='#D9D9D9' />
                    </Center>
                    <Box marginLeft='16px'>
                      <Text fontSize='12px'>オーナー</Text>
                      <Box>
                        <Link href={`https://goerli.etherscan.io/address/${props.nftAllData?.owners?.at(0)}`} isExternal>
                          <Box width='120px'>
                            <Flex>
                              <OverflowEllipsis>
                                {props.nftAllData?.owners?.at(0)}
                              </OverflowEllipsis>
                              <Center>
                                <ExternalLinkIcon />
                              </Center>
                            </Flex>
                          </Box>
                        </Link>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
                <Divider margin='36px 0px' />
                <Stack spacing='16px'>
                  <Text as='b'>情報</Text>
                  <Box marginTop='16px'>
                    <Box>
                      <Flex>
                        <Flex>
                          <Center>
                            {/* <Avatar
                              width="36px"
                              height="36px"
                            /> */}
                            <Box bg='#D9D9D9' width='36px' height='36px'></Box>
                            {/* <Image bg='#D9D9D9' width='36px' height='36px' alt='collection icon' /> */}
                          </Center>
                          <Box marginLeft='16px'>
                            <Text fontSize='12px'>コレクション</Text>
                            <Text as='b'>{props.nftAllData?.contract?.name}</Text>
                          </Box>
                        </Flex>
                        <Spacer />
                        <Flex>
                          <Center>
                            <Avatar width='36px' height='36px' bg='#D9D9D9' />
                          </Center>
                          <Box marginLeft='16px'>
                            <Text fontSize='12px'>クリエイター</Text>
                            <Box>
                              <Link
                                href={`https://goerli.etherscan.io/address/0xf6D84F6a47F74Ebbd644a388D64d8cBE7617d9A1`}
                                isExternal
                              >
                                <Box width='120px'>
                                  <Flex>
                                    <OverflowEllipsis>
                                      {'0xf6D84F6a47F74Ebbd644a388D64d8cBE7617d9A1'}
                                    </OverflowEllipsis>
                                    <Center>
                                      <ExternalLinkIcon />
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
                      <Text>コントラクト</Text>
                      <Spacer />
                      <Box>
                        <Link
                          href={`https://goerli.etherscan.io/address/${props.contractAddress}`}
                          isExternal
                        >
                          <Box width='120px'>
                            <Flex>
                              <OverflowEllipsis>{props.contractAddress}</OverflowEllipsis>
                              <Center>
                                <ExternalLinkIcon />
                              </Center>
                            </Flex>
                          </Box>
                        </Link>
                      </Box>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex>
                      <Text>トークンID</Text>
                      <Spacer />
                      <Text>{props.tokenId}</Text>
                    </Flex>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        
        <ModalContent bg="#242424" color="#ffffff" w="472px" borderWidth="1px" borderColor="#4d4d4d" borderRadius="12px">
          <ModalBody padding="24px">
            <Box>
              <Stack spacing="36px">
                <Box>
                  <Flex>
                    <Text fontSize="20px" as="b">
                      NFTを売る
                    </Text>
                    <Spacer/>
                    <ModalCloseButton />
                  </Flex>
                </Box>
                <Box height="62px">
                  <HStack spacing="24px">
                    <Image
                      src={metadata?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                      alt="card image"
                      height="62px"
                    />
                    <Box height="62px">
                      <Text as="b">
                        {metadata?.name}
                      </Text>
                      <Text fontSize="12px" color="gray.200">
                        {props.nftAllData?.contract?.name}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <Box>
                  <Text marginBottom="8px">
                    販売方法
                  </Text>
                  <Grid templateColumns="1fr 1fr" gap="16px">
                    <Button 
                      bg="#4D4D4D" 
                      height="57px" 
                      borderRadius="36px"
                      fontWeight="normal"
                    >
                      固定価格
                    </Button>
                    <Button 
                      height="57px" 
                      bg="#242424" 
                      borderColor="4D4D4D" 
                      borderWidth="1px" 
                      borderRadius="36px"
                      fontWeight="normal"
                    >
                      オークション
                    </Button>
                  </Grid>
                </Box>
                <Box>
                  <Text as="b">
                    価格
                  </Text>
                  <Grid templateColumns="1fr 50px" gap="16px">
                    <Box marginTop="8px">
                      <NumberInput>
                        <NumberInputField 
                          borderColor="#4D4D4D"
                          borderRadius="12px"
                        />
                      </NumberInput>
                    </Box>
                    <HStack>
                      <SiEthereum size="16px" color="#777E91"/>
                      <Text color="#D8D8D8">
                        ETH
                      </Text>
                    </HStack>
                  </Grid>
                </Box>
                <Box>
                  <Text as="b">
                    手数料
                  </Text>
                  <Text marginTop="8px">
                    遊戯玉公式へ2%
                  </Text>
                </Box>
                <Center>
                  <Button width="187px" height="51px" bg="#4114C2" borderRadius="12px">
                    出品開始
                  </Button>
                </Center>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
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
  )
}
