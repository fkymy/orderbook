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
import NftAbi from './assets/ABI/yugidama_abi.json'
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
  const [accounts, setAccounts] = useState<string[]>([]);
  const [metadata, setmetadata] = useState<any>()
  const [parsedMetadata, setParsedMetadata] = useState<CollectionMetadataType>();
  const [price, setPrice] = useState<string>("0");
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
  }, []);

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

    let abi = NftAbi;
    const nftContract = new ethers.Contract(
      props.contractAddress,
      abi,
      provider
    );
    console.log(nftContract);
    const approval = await nftContract.connect(signer).setApprovalForAll(
      constAddress.marketPlaceAddress,
      true
    );
    console.log(approval);

    /**
     * listItem
     */
    const marketPlaceContract = new ethers.Contract(
      constAddress.marketPlaceAddress,
      MarketPlace.abi,
      provider
    )
    const tx = await marketPlaceContract.connect(signer).listItem(
      props.contractAddress, 
      props.tokenId, 
      ethers.utils.parseEther(value), 
      {
        gasLimit: 1 * 10 ** 6
      }
    );
    // console.log("transaction", tx);

    // console.log({
    //   contract: props.contractAddress,
    //   tokenId: props.tokenId,
    //   maker: accounts.at(0),
    //   decimalAmount: parseFloat(value),
    // });
    axios
      .post(`${constUrl.orderbookApiURL}/orders/orderbook/listings`, {
        contract: props.contractAddress,
        tokenId: props.tokenId,
        maker: accounts.at(0),
        decimalAmount: parseFloat(value),
      })
      .then((res) => {
        console.log(res);
      })

    // console.log(await(tx).wait());

    // const item = await marketPlaceContract.connect(signer).items(
    //   1
    // );
    // console.log(item);
  }

  async function purchaseItem(value, orderId) {
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
    // console.log(ethers.utils.parseEther(`${value}`));
    const tx = await marketPlaceContract.connect(signer).purchaseItem(
      // props.tokenId,
      props.contractAddress,
      props.tokenId,
      {
        value: ethers.utils.parseEther(`${value}`),
        gasLimit: 1 * 10 ** 6,
      }
    )
    // console.log(tx);

    axios
      .post(`${constUrl.orderbookApiURL}/orders/orderbook/buy`, {
        id: orderId,
        taker: accounts?.at(0)
      })
      .then((res) => {
        console.log(res)
      })
  }

  // console.log(props?.nftAllData?.nativeOrders?.at(0)?.id);

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
              <Tilt className="box" options={{scale: 1.1, speed: 3000, max: 30, glare: true, "max-glare": 0.98}}>
                <Image
                  src={metadata?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                  // src={props.nftdata?.media[0]?.gateway}
                  alt='card image'
                  height='360px'
                />
              </Tilt>
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
                      <Button 
                        bg='#4114C2' 
                        height='51px' 
                        width='100%' 
                        margin='24px 0px 36px 0px'
                        onClick={() => purchaseItem(props?.nftAllData?.nativeOrders?.at(0)?.decimalAmount, props?.nftAllData?.nativeOrders?.at(0)?.id)}
                      >
                        今すぐ購入
                      </Button>
                    </>
                  )
                }
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
                      <NumberInput
                        onChange={(p) => {
                          setPrice(p);
                          console.log(p);
                        }}
                      >
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
                  <Button 
                    width="187px" 
                    height="51px" 
                    bg="#4114C2" 
                    borderRadius="12px" 
                    onClick={() => listingItem(price)}
                  >
                    出品開始
                  </Button>
                </Center>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
