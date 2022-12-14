import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Checkbox,
  CheckboxGroup,
  Grid,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextImage, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdArrowForwardIos, MdDeck } from 'react-icons/md'
import Banner from './assets/banner.png'
import BannerAndGem from './assets/bannerAndGem.png'
import { getRarityIcon } from './getRarityIcon'
import { YugidamaHeader } from './header'
import { TrendCardDataType, TrendDataListType, TrendDataType } from 'src/types/trendData'
import { getStoreIcon } from './storeCard'
import { Router, useRouter } from 'next/router'

interface Props {
  collectionData: any
}

interface listProps {
  title: string
  elemArray: string[]
}

function CheckboxList(props: listProps) {
  // console.log(props.elemArray);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as='b' flex='1' textAlign='left'>
            {props.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Box lineHeight='30px'>
          {props.elemArray.map((v: string, idx) => {
            return (
              <span key={idx}>
                <Checkbox marginRight='10px'>{v}</Checkbox>
              </span>
            )
          })}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  )
}

interface CardInterface {
  collectionAddress: string
  tokenId: number
}

interface TrendDeckCardProps {
  title: string
  subTitle: string
  deck: TrendCardDataType[]
  collectionData: any
}

function TrendDeckCard(props: TrendDeckCardProps) {
  return (
    <Box
      as='button'
      bg='#1E183E'
      borderRadius='8px'
      padding='8px 9px'
      sx={{
        _hover: {
          backgroundColor: '#353052',
        },
      }}
    >
      <Grid templateColumns='148px 1fr 24px'>
        <HStack spacing='5px'>
          {/* {deckUrl.map((elem, idx) => {
            return (
              <Box key={idx} paddingTop={idx === 0 ? '0px' : '8px'}>
                <Image src={elem} height={idx === 0 ? '64px' : '56px'} alt='trend card' />
              </Box>
            )
          })} */}
          {
            props.deck.map((elem, idx) => {
              return (
                <Box key={idx} paddingTop={idx === 0 ? '0px' : '14px'}>
                  <Image src={elem.imageURL} height={idx === 0 ? '52px' : '38px'} alt='trend card' />
                </Box>
              )
            })
          }
        </HStack>
        <Box alignContent="center">
          <Box textAlign='left'>
            <Text as='b' fontSize='16px'>
              {props.title}
            </Text>
          </Box>
          <Box textAlign='left'>
            <Text fontSize='14px'>
              {props.subTitle}
            </Text>
          </Box>
        </Box>
        <Box height='52px' width='24px'>
          <Center height='100%'>
            <MdArrowForwardIos size='24px' />
          </Center>
        </Box>
      </Grid>
    </Box>
  )
}

interface MarketPageStorePriceProps {
  nft: any;
}

function MarketPageStorePrice(props: MarketPageStorePriceProps) {
  
  if (props.nft?.orders?.at(-1)?.price?.amount?.native || props.nft?.nativeOrders?.at(-1)?.decimalAmount) {
    return (
      <Box textAlign="left">
        <NextImage
          width='16px'
          height='16px'
          src={
            getStoreIcon(props.nft?.nativeOrders?.at(-1)?.kind ? props.nft?.nativeOrders?.at(-1)?.kind : props.nft?.orders?.at(-1)?.kind)
          }
          alt='icon'
        />
        <Text>{`${(props.nft?.nativeOrders?.at(-1)?.decimalAmount ? props.nft?.nativeOrders?.at(-1)?.decimalAmount : props.nft?.orders?.at(-1)?.price?.amount?.native)?.toFixed(2)} ETH`}</Text>
      </Box>
    )
  }
}

export function YuGiOhMarketPlace(props: Props) {
  const router = useRouter();
  const [trendData, setTrendData] = useState<TrendDataListType>()

  if (props?.collectionData?.length >= 1) {
    console.log(props?.collectionData[0]?.media?.gateway);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/trend')
      const data = await res.json()
      setTrendData(data)
    }
    fetchData()
  }, [])

  const width: any = {
    sm: '100%',
    md: '50%',
    lg: '33%',
    xl: '25%',
  }
  props?.collectionData?.sort((a, b) => {
    const f = (nft) => {
      let amount = nft?.nativeOrders?.at(-1)?.decimalAmount;
      if (amount) {
        return amount;
      }
      amount = nft?.orders?.at(-1)?.price?.amount?.native;
      if (amount) {
        return amount;
      } else {
        return 999999999;
      }
    }
    let aAmount = f(a);
    let bAmount = f(b);
    return aAmount - bAmount;
  });

  return (
    <Box style={{ backgroundColor: '#0B0134' }}>
      <Stack spacing={0}>
        <YugidamaHeader />
        <Box paddingTop='16px' paddingLeft='80px' paddingRight='80px'>
          <Grid templateColumns='290px auto' gap={16}>
            <Box minHeight='100vh'>
              <Stack spacing={5}>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <AiOutlineSearch color='#ffffff' />
                  </InputLeftElement>
                  <Input
                    borderColor='#4C4C4C'
                    borderWidth='1.5px'
                    borderRadius='10px'
                    focusBorderColor='#7517EC'
                    color='#ffffff'
                    placeholder='????????????????????????'
                    _placeholder={{ opacity: 0.4, color: '#ffffff' }}
                  />
                </InputGroup>
                <Box borderColor='#4C4C4C' borderWidth='1px' borderRadius='15px'>
                  <Stack color='#ffffff'>
                    <Box style={{ padding: '20px 20px 5px 20px' }}>
                      <Text as='b' fontSize='2xl'>
                        ???????????????
                      </Text>
                    </Box>
                    <Box paddingBottom='15px'>
                      <Accordion allowMultiple defaultIndex={[0, 1, 2, 3, 4, 5]} colorScheme='red'>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as='b' flex='1' textAlign='left'>
                                ????????????
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box>
                              <CheckboxGroup>
                                <Stack>
                                  <Checkbox marginRight='10px'>????????? 1st gen</Checkbox>
                                  <Checkbox marginRight='10px'>????????? 2nd gen</Checkbox>
                                  <Checkbox marginRight='10px'>????????? 3rd gen</Checkbox>
                                </Stack>
                              </CheckboxGroup>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem>

                        <CheckboxList
                          title='?????????'
                          elemArray={['????????????', '??????', '??????????????????', '??????????????????']}
                        />

                        <CheckboxList title='?????????' elemArray={['???????????????', '??????', '???']} />

                        <CheckboxList
                          title='??????'
                          elemArray={['???', '???', '???', '???', '???', '???', '???']}
                        />

                        <CheckboxList
                          title='??????'
                          elemArray={[
                            '??????',
                            '???????????????',
                            '??????',
                            '??????',
                            '??????',
                            '???????????????',
                            '??????',
                          ]}
                        />

                        <CheckboxList
                          title='??????'
                          elemArray={[
                            '???????????????',
                            '???????????????',
                            '??????????????????',
                            '?????????',
                            '????????????',
                            '??????',
                            '?????????',
                            '?????????',
                            '?????????',
                            '?????????',
                            '?????????',
                            '????????????',
                            '??????',
                            '?????????',
                            '??????',
                            '??????',
                            '??????',
                            '?????????',
                            '?????????',
                            '?????????',
                            '??????????????????',
                            '?????????',
                            '??????????????????',
                            '??????????????????',
                            '???????????????',
                            '?????????????????????',
                            '???????????????',
                            '???????????????????????????',
                            '?????????????????????',
                          ]}
                        />
                      </Accordion>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box height='100vh'>
              <Stack color='#ffffff'>
                <Box marginBottom='10px'>
                  <NextImage src={BannerAndGem} />
                </Box>
                <Box>
                  <HStack spacing={5}>
                    <Box marginRight='25px'>
                      <Text as='b' fontSize='2xl'>
                        ????????????
                      </Text>
                    </Box>
                    <Box as='b' bg='#1E183E' width='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>?????????</Text>
                      </Center>
                    </Box>
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>??????</Text>
                      </Center>
                    </Box>
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>???????????????</Text>
                      </Center>
                    </Box>
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>??????</Text>
                      </Center>
                    </Box>
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>???</Text>
                      </Center>
                    </Box>
                  </HStack>
                  <Box
                    width='100%'
                    bg='#1E183E'
                    marginTop='18px'
                    marginBottom='30px'
                    borderRadius='16px'
                  >
                    <Box padding='16px 36px'>
                      <Stack spacing='8px'>
                        {trendData?.map((elem: TrendDataType, idx) => {
                          return (
                            // <span key={idx}>
                              <TrendDeckCard
                                key={idx}
                                title={elem.title}
                                subTitle={elem.subTitle}
                                deck={elem.deck}
                                collectionData={props.collectionData}
                              />
                            // {/* </span> */}
                          )
                        })}
                      </Stack>
                    </Box>
                  </Box>
                </Box>
                <Box paddingBottom='12px'>
                  <HStack spacing={5}>
                    <Box marginRight='25px'>
                      <Text as='b' fontSize='2xl'>
                        ???????????????????????????
                      </Text>
                    </Box>
                    <Box as='b' bg='#1E183E' width='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>?????????</Text>
                      </Center>
                    </Box>
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>1st gen</Text>
                      </Center>
                    </Box>
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>2nd gen</Text>
                      </Center>
                    </Box>
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Center height='40px'>
                        <Text>3rd gen</Text>
                      </Center>
                    </Box>
                    <Spacer />
                    <Box minWidth='72px' height='40px' borderRadius='8px'>
                      <Select
                        borderColor='#4C4C4C'
                        _expanded={{
                          bg: '#353052',
                        }}
                      >
                        <option value='low'>???????????????</option>
                        <option value='hight'>???????????????</option>
                      </Select>
                    </Box>
                  </HStack>
                </Box>
                <Box>
                  <SimpleGrid minChildWidth='122px' spacing={3}>
                    {props.collectionData?.map((nft: any, n: number) => {
                      const rarity = nft?.rawMetadata?.attributes?.filter((v, i) => {
                        return v.trait_type === 'rarity'
                      });
                      return (
                        <Box
                          key={n}
                          maxWidth='150px'
                          shadow='md'
                          as='button'
                          onClick={() => {
                            router.push({
                              pathname: `/yugidama/${nft?.contract?.address}/${nft?.tokenId}`
                            });
                          }}
                        >
                          <Grid templateColumns='1fr 64px' gap={2.5}>
                            <Box>
                              <Image src={nft?.media[0]?.gateway} alt='icon' />
                            </Box>
                            <Box>
                              <Grid alignContent='space-between' height='100%'>
                                <Box textAlign='left'>
                                  <NextImage src={getRarityIcon(rarity.length >= 1 ? rarity[0].value : "N")} />
                                </Box>
                                <MarketPageStorePrice
                                  nft={nft}
                                />
                              </Grid>
                            </Box>
                          </Grid>
                        </Box>
                      )
                    })}
                  </SimpleGrid>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}
