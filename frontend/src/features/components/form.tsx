import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Container, Stack, Text } from '@chakra-ui/layout'
import {
  HStack,
  Button,
  Center,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Grid,
  IconButton,
  RadioGroup,
  Flex,
  Spacer,
  Radio,
} from '@chakra-ui/react'
import NextImage, { StaticImageData } from 'next/image'
import { ethers } from 'ethers'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import MarketPlaceFacotory from '../../../../contracts/artifacts/contracts/MarketPlaceFactory.sol/MarketPlaceFactory.json'
import TemplateLogo from './assets/template.png'
import ApiLogo from './assets/api2.png'
import axios from 'axios'
import { constUrl } from '../constant/constURL'

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

interface Props {
  previewMode: string
  setPreviewMode: Dispatch<SetStateAction<string>>
  collectionAddress: string
  setCollectionAddress: Dispatch<SetStateAction<string>>
  collectionAddressList: string[]
  setCollectionAddressList: Dispatch<SetStateAction<string[]>>
  collectionDescription: string
  setCollectionDescription: Dispatch<SetStateAction<string>>
  serviceName: string
  setServiceName: Dispatch<SetStateAction<string>>
  // isGotCollectionData: boolean;
  // setIsGotCollectionData: Dispatch<SetStateAction<boolean>>;
}

export function CreateForm(props: Props) {
  const format = (val) => val + `%`
  const parse = (val) => val.replace(/%$/, '')

  // const [contractAddress, setContractAddress] = useState('');
  const [creatorFee, setCreatorFee] = useState(0)
  const [inputAddress, setInputAddress] = useState('')

  // const marketPlaceFactoryAddress = '0x0be934D7f224E559CD02eC604C543aEc3eAAAD10'
  const marketPlaceFactoryAddress = '0x9298fbB88e7AF21B12480757a0b7665d7513aF0d'

  // console.log(MarketPlaceFacotory);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      console.log(accounts)
    }
    getAccount()
  }, [])

  /**
   * マーケットプレイスを作る関数
   */
  async function createMarketPlace() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const marketPlaceFactoryContract = new ethers.Contract(
      marketPlaceFactoryAddress,
      MarketPlaceFacotory.abi,
      provider
    )
    const tx = await marketPlaceFactoryContract
      .connect(signer)
      .createMarketPlace('firstMarket', creatorFee)
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const tx2 = await marketPlaceFactoryContract.connect(signer).listOfMarketPlaces(accounts[0])
    console.log('create market', tx2)

    axios
      .post(`${constUrl.orderbookApiURL}/marketplaces`, {
        name: props.serviceName,
        slug: 'test1',
        contractAddresses: props.collectionAddressList,
      })
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <Container
      style={{
        padding: '24px',
        backgroundColor: '#000000',
        height: '100%',
        color: '#ffffff',
        borderRightWidth: '1px',
        borderRightColor: '#4D4D4D',
      }}
    >
      <Stack spacing={4}>
        {/* <Box>
          <Text as='b' fontSize='4xl'>
            {`[Logo(TODO)]`}
          </Text>
        </Box> */}
        <Stack width={'100%'} spacing='36px'>
          {/* <Text as='b' fontSize='1xl'>
            コントラクトのアドレス
          </Text>
          <Input
            placeholder='0x000000.....'
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
            }}
            value={props.collectionAddress}
            onChange={(event) => {
              // props.setIsGotCollectionData(false);
              // setContractAddress(event.target.value);
              props.setCollectionAddress(event.target.value)
            }}
          /> */}
          <Box marginBottom='14px'>
            <Text fontSize='24px' as='b'>
              NFTマーケットプレイスを作る
            </Text>
          </Box>
          <Box>
            <Stack width={'100%'} spacing='8px'>
              <Text as='b'>サービス名</Text>
              <Input
                style={{
                  // backgroundColor: '#ffffff',
                  width: '100%',
                }}
                value={props.serviceName}
                onChange={(event) => {
                  // props.setIsGotCollectionData(false);
                  // setContractAddress(event.target.value);
                  props.setServiceName(event.target.value)
                }}
              />
            </Stack>
          </Box>
          <Box>
            <Box marginBottom='8px'>
              <Text as='b' fontSize='1xl'>
                コントラクトアドレス
              </Text>
            </Box>
            {props.collectionAddressList.map((address, idx) => {
              return (
                // <Grid templateColumns="9fr 1fr" key={idx}>
                <Box
                  height='40px'
                  borderRadius='6px'
                  borderWidth='1px'
                  borderColor='white'
                  marginBottom='8px'
                  paddingLeft='16px'
                >
                  <Center height='100%'>
                    {/* <Box height="100%"> */}
                    <OverflowEllipsis>{address}</OverflowEllipsis>
                    {/* </Box> */}
                  </Center>
                </Box>
                //   {/* <IconButton
                //     icon={<DeleteIcon/>}
                //     aria-label='Search database'
                //     bg="#0f0f0f"
                //     color="#f0f0f0"
                //     onClick={() => {
                //       // console.log();
                //       props.setCollectionAddressList(
                //         props.collectionAddressList.filter((addr) => {
                //           return address !== addr
                //         })
                //       );
                //     }}
                //   /> */}
                // </Grid>
              )
            })}
            <Box>
              <Input
                placeholder='0x000000.....'
                style={{
                  width: '100%',
                  marginBottom: '8px',
                  borderColor: '#4D4D4D',
                }}
                _placeholder={{
                  color: '#4D4D4D',
                }}
                value={inputAddress}
                onChange={(event) => {
                  // props.setIsGotCollectionData(false);
                  // setContractAddress(event.target.value);
                  setInputAddress(event.target.value)
                }}
              />
              <Flex>
                <Spacer />
                <Box
                  padding='2px 12px'
                  alignContent='end'
                  borderRadius='10px'
                  borderWidth='1px'
                  borderColor='#8F8F8F'
                  as='button'
                  onClick={() => {
                    // console.log("onClick");
                    props.setCollectionAddressList([...props.collectionAddressList, inputAddress])
                    setInputAddress('')
                    console.log(props.collectionAddressList)
                  }}
                >
                  <HStack height='32px'>
                    <AddIcon w={4} h={4} />
                    <Text as='b' fontSize='14px'>
                      追加
                    </Text>
                  </HStack>
                </Box>
              </Flex>
            </Box>
            {/* <Grid templateColumns="1fr 50px" gap="8px">
              <Input
                placeholder='0x000000.....'
                style={{
                  width: '100%',
                }}
                value={inputAddress}
                onChange={(event) => {
                  // props.setIsGotCollectionData(false);
                  // setContractAddress(event.target.value);
                  setInputAddress(event.target.value)
                }}
              />
              <IconButton
                icon={<AddIcon/>}
                aria-label='Search database'
                bg="#0f0f0f"
                color="#f0f0f0"
                onClick={() => {
                  // props.collectionAddressList.push(inputAddress);
                  props.setCollectionAddressList([...props.collectionAddressList, inputAddress]);
                  setInputAddress("");
                  console.log(props.collectionAddressList)
                }}
              />
            </Grid> */}
          </Box>
          <Box>
            <Box marginBottom='8px'>
              <Text as='b'>手数料</Text>
            </Box>
            <Box>
              <NumberInput
                value={format(creatorFee)}
                onChange={(valueString) => {
                  setCreatorFee(parse(valueString))
                }}
                style={{
                  // backgroundColor: '#ffffff',
                  borderRadius: '10px',
                }}
                min={0}
                max={100}
                step={1}
                precision={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Box>
          <Box>
            <Box marginBottom='8px'>
              <Text as='b'>モード</Text>
            </Box>
            <Box
              style={{
                padding: '12px',
                background:
                  'linear-gradient(266.91deg, rgba(175, 175, 174, 0.3) 0%, rgba(165, 164, 164, 0.21) 87.35%)',
                borderRadius: '4px',
              }}
            >
              <Box>
                <RadioGroup
                  form-name='mode'
                  onChange={props.setPreviewMode}
                  value={props.previewMode}
                  colorScheme='white'
                >
                  <Stack>
                    <Radio
                      value='market'
                      colorScheme='white'
                      bg={props.previewMode === 'market' ? 'white' : 'inherit'}
                    >
                      <HStack>
                        <Box padding='2px' marginLeft='6px'>
                          <NextImage width='20px' height='20px' src={TemplateLogo} />
                        </Box>
                        <Box>
                          <Text as='b' fontSize='14px'>
                            テンプレート
                          </Text>
                          <Text fontSize='12px' color='#D8D8D8'>
                            ノーコードでサイトを構築・ホスティング
                          </Text>
                        </Box>
                      </HStack>
                    </Radio>
                    <Radio
                      value='api'
                      colorScheme='white'
                      bg={props.previewMode === 'api' ? 'white' : 'inherit'}
                    >
                      <HStack>
                        <Box padding='2px' marginLeft='6px'>
                          <NextImage width='20px' height='20px' src={ApiLogo} />
                        </Box>
                        <Box>
                          <Text as='b' fontSize='14px'>
                            API
                          </Text>
                          <Text fontSize='12px' color='#D8D8D8'>
                            NFT流動性APIのみを使って独自サービスを1から構築
                          </Text>
                        </Box>
                      </HStack>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
          </Box>
          <Button
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              height: '44px',
            }}
            onClick={createMarketPlace}
          >
            デプロイする
          </Button>
        </Stack>
        {/* <Stack width={'100%'}>
        </Stack>
        <Stack width={'100%'}>
          <Text as='b' fontSize='1xl'>
            Preview Mode
          </Text>
          <Container
            style={{
              backgroundColor: '#ffffff',
              height: '46px',
              borderRadius: '10px',
              padding: 7,
            }}
          >
            <HStack
              height='100%'
              spacing={2}
              style={{
                padding: 0,
              }}
            > */}
        {/* <Box width='50%' textAlign="center">
                
              </Box> */}
        {/* <Button
                style={{
                  width: '50%',
                  height: '35px',
                  backgroundColor: props.previewMode == 'market' ? '#0f0f0f' : '#ffffff',
                  color: props.previewMode == 'market' ? '#f0f0f0' : '#0f0f0f',
                }}
                onClick={() => {
                  props.setPreviewMode('market')
                }}
              >
                テンプレート
              </Button>
              <Button
                style={{
                  width: '50%',
                  height: '36px',
                  backgroundColor: props.previewMode == 'item' ? '#0f0f0f' : '#ffffff',
                  color: props.previewMode == 'item' ? '#f0f0f0' : '#0f0f0f',
                }}
                onClick={() => {
                  props.setPreviewMode('item')
                }}
              >
                API
              </Button>
            </HStack>
          </Container>
        </Stack> */}
        {/* <Stack>
          <Text as='b' fontSize='1xl'>
            Discription
          </Text>
          <Textarea
            backgroundColor='#ffffff'
            height='100px'
            borderRadius='10px'
            resize='none'
            onChange={(event) => props.setCollectionDescription(event.target.value)}
          />
        </Stack> */}
      </Stack>
    </Container>
  )
}
