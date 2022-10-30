import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, AspectRatio, Avatar, Box, Center, Checkbox, CheckboxGroup, Container, Grid, GridItem, HStack, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Spacer, Square, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { AiOutlineSearch } from 'react-icons/ai';
import { Nft } from "alchemy-sdk";

interface Props {
  collectionData: any;
}

interface listProps {
  title: string;
  elemArray: string[];
}

function CheckboxList(props: listProps) {
  // console.log(props.elemArray);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            {props.title}
          </Box>
          <AccordionIcon/>
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Box lineHeight="30px">
          {
            props.elemArray.map((v: string) => (<Checkbox marginRight="10px">{v}</Checkbox>))
          }
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}


export function YuGiOhMarketPlace(props: Props) {
  const width: any = {
    sm: '100%', 
    md: '50%', 
    lg: '33%', 
    xl: '25%',
  }
  console.log(props.collectionData);

  return (
    <Box style={{backgroundColor: '#1E183E'}}>
      <Stack spacing={0}>
        <Box>
          {/* <Image
            width='100px'
            height='100px'
            borderRadius='10'
            margin='40px'
            objectFit='contain'
            shadow='md'
            // src={`${props.collectionData?.data?.nfts[0]?.media[0]?.gateway}`}
            src={`${props.collectionData?.data?.nfts[0]?.metadata?.image}`}
          /> */}
          <HStack>
            <Text color="#ffffff">ランク戦</Text>
            <Text color="#ffffff">フリー戦</Text>
            <Text color="#ffffff">フレンド対戦</Text>
            <Text color="#ffffff">ロゴ</Text>
            <Text color="#ffffff">ショップ</Text>
            <Text color="#ffffff">マイデッキ</Text>
            <Text color="#ffffff">カード検索</Text>
          </HStack>
        </Box>
        <Box paddingLeft="100px" paddingRight="100px">
          <HStack spacing={0}>
            <Box width="300px" minHeight="100vh">
              <Stack>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineSearch color="#ffffff"/>}
                  />
                  <Input
                    borderColor="#4d4d4d" 
                    borderWidth="1.5px" 
                    focusBorderColor="gray.500"
                    color="#ffffff"
                    placeholder="キーワードで検索"
                    _placeholder={{ opacity: 0.4, color: '#ffffff' }}
                  />
                </InputGroup>
                <Box>
                  <Stack color="#ffffff">
                    <Text>
                      フィルター
                    </Text>
                    <Box>
                      <Accordion allowMultiple defaultIndex={[0, 1, 2, 3, 4]}>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                世代
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box>
                              {/* <Stack>
                                
                                <Text>第1世代</Text>
                                <Text>第2世代</Text>
                                <Text>第3世代</Text>
                              </Stack> */}
                              <CheckboxGroup>
                                <Stack>
                                  <Checkbox marginRight="10px">第1世代</Checkbox>
                                  <Checkbox marginRight="10px">第2世代</Checkbox>
                                  <Checkbox marginRight="10px">第3世代</Checkbox>
                                </Stack>
                              </CheckboxGroup>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem>


                        {/* <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                レア度
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box lineHeight="30px">
                              <Checkbox marginRight="10px">ノーマル</Checkbox>
                              <Checkbox marginRight="10px">レア</Checkbox>
                              <Checkbox marginRight="10px">スーパーレア</Checkbox>
                              <Checkbox marginRight="10px">ウルトラレア</Checkbox>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem> */}

                        <CheckboxList
                          title="レア度"
                          elemArray={["ノーマル", "レア", "スーパーレア", "ウルトラレア"]}
                        />

                        {/* <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                カード
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box lineHeight="30px">
                                <Checkbox marginRight="10px">モンスター</Checkbox>
                                <Checkbox marginRight="10px">魔法</Checkbox>
                                <Checkbox marginRight="10px">罠</Checkbox>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem> */}

                        <CheckboxList
                          title="カード"
                          elemArray={["モンスター", "魔法", "罠"]}
                        />


                        {/* <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                属性
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box lineHeight="30px">
                                <Checkbox marginRight="10px">闇</Checkbox>
                                <Checkbox marginRight="10px">光</Checkbox>
                                <Checkbox marginRight="10px">池</Checkbox>
                                <Checkbox marginRight="10px">水</Checkbox>
                                <Checkbox marginRight="10px">炎</Checkbox>
                                <Checkbox marginRight="10px">風</Checkbox>
                                <Checkbox marginRight="10px">神</Checkbox>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem> */}

                        <CheckboxList
                          title="属性"
                          elemArray={["闇", "光", "池", "水", "炎", "風", "神"]}
                        />


                        {/* <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                効果
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box lineHeight="30px">
                                <Checkbox marginRight="10px">武装</Checkbox>
                                <Checkbox marginRight="10px">フィールド</Checkbox>
                                <Checkbox marginRight="10px">速攻</Checkbox>
                                <Checkbox marginRight="10px">儀式</Checkbox>
                                <Checkbox marginRight="10px">存続</Checkbox>
                                <Checkbox marginRight="10px">カウンター</Checkbox>
                                <Checkbox marginRight="10px">通常</Checkbox>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem> */}

                        <CheckboxList
                          title="効果"
                          elemArray={["武装", "フィールド", "速攻", "儀式", "存続", "カウンター", "通常"]}
                        />

                        <CheckboxList
                          title="種族"
                          elemArray={["魔法使い族", "ドラゴン族", "アンデット族", "戦士族", "獣戦士族", "獣族", "鳥獣族", "悪魔族", "天使族", "昆虫族", "恐竜族", "爬虫類族", "魚族", "海竜族", "水族", "炎族", "雷族", "岩石族", "植物族", "機械族", "サイキック族", "幻竜族", "サイバース族", "サイボーグ族", "魔導騎士族", "ハイドラゴン族", "天界戦士族", "オメガサイキック族", "ギャラクシー族"]}
                        />


                        {/* <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box flex='1' textAlign='left'>
                                効果
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box>
                              魔法使い族
                              ドラゴン族
                              アンデット族
                              戦士族
                              獣戦士族
                              獣族
                              鳥獣族
                              悪魔族
                              天使族
                              昆虫族
                              恐竜族
                              爬虫類族
                              魚族
                              海竜族
                              水族
                              炎族
                              雷族
                              岩石族
                              植物族
                              機械族
                              サイキック族
                              幻竜族
                              サイバース族
                              サイボーグ族
                              魔導騎士族
                              ハイドラゴン族
                              天界戦士族
                              オメガサイキック族
                              ギャラクシー族
                            </Box>
                          </AccordionPanel>
                        </AccordionItem> */}

                      </Accordion>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box width="calc(100% - 300px)" height="100vh" >
            </Box>
          </HStack>
        </Box>
        {/* <Box padding='24px 40px 24px 40px'>
          <Box marginBottom='8px'>
            <Text as="b" fontSize='2xl'>
              {props.collectionData?.data?.nfts[0]?.contractMetadata?.name}
            </Text>
          </Box>
        </Box> */}
        {/* <Box minHeight='calc(100vh - 141px - 142px)'> */}
          {/* item list, my Item */}
          {/* <Tabs colorScheme='black'>
            <TabList style={{paddingLeft: '30px'}}>
              <Tab>Items</Tab>
              <Tab>My NFTs</Tab>
            </TabList>
            <TabPanels style={{padding: '24px 40px 40px 40px'}}>
              <TabPanel style={{padding: '0'}} maxWidth={`${props.collectionData?.data?.nfts?.length * 300}px`}>
                <SimpleGrid minChildWidth='250px' spacing={4}>
                  {
                    props.collectionData?.data?.nfts.map((nft: any, n: number) => {
                      return (
                        <Box bg="#ffffff" maxWidth='510px' shadow='md' rounded='10px'>
                          <Stack marginBottom='10px'>
                            <Box style={{
                              paddingTop: '100%',
                              overflow: 'hidden',
                              position: 'relative',
                            }}>
                              <Image
                                src={nft?.media[0]?.gateway}
                                style={{
                                  borderTopRightRadius: '10px',
                                  borderTopLeftRadius: '10px',
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: '100%',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                }}
                              />
                            </Box>
                            <Container>
                              <Text as='b'>
                                {nft?.metadata?.name}
                              </Text>
                              <Text color="gray">
                                {'　price'}
                              </Text>
                            </Container>
                          </Stack>
                        </Box>
                      )
                    })
                  }
                </SimpleGrid>
              </TabPanel>
              <TabPanel>My NFTs</TabPanel>
            </TabPanels>
          </Tabs>
        </Box> */}
      </Stack>
    </Box>
  );
}
