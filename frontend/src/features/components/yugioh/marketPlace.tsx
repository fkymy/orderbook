import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, AspectRatio, Avatar, Box, Center, Checkbox, CheckboxGroup, Container, Grid, GridItem, HStack, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Spacer, Square, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { AiOutlineSearch } from 'react-icons/ai';
import NextImage, { StaticImageData } from 'next/image';
import { Nft } from "alchemy-sdk";
import DeckIcon from "./assets/headerIcon/deck.png";
import FreeBattleIcon from "./assets/headerIcon/free_battle.png";
import FriendIcon from "./assets/headerIcon/friend.png";
import RankBattleIcon from "./assets/headerIcon/rank_battle.png";
import SearchIcon from "./assets/headerIcon/search.png";
import ShopIcon from "./assets/headerIcon/shop.png";
import NormalIcon from "./assets/rarityIcon/Normal.png";
import RareIcon from "./assets/rarityIcon/Rare.png";
import SuperRareIcon from "./assets/rarityIcon/SuperRare.png";
import UltraRareIcon from "./assets/rarityIcon/UltraRare.png";
import Banner from "./assets/banner.png";

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
          <Box as="b" flex='1' textAlign='left'>
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

function rarityIcon(rarity: string) {
  if (rarity === "normal") {
    return NormalIcon;
  } else if (rarity === "rare") {
    return RareIcon;
  } else if (rarity === "superRare") {
    return SuperRareIcon;
  } else {
    return UltraRareIcon;
  }
}

interface headerIcon {
  icon: string;
  name: string;
}

function HeaderIcon(props: headerIcon) {
  let img: StaticImageData;
  if (props.icon === "shop") {
    img = ShopIcon;
  } else if (props.icon === "freeBattle") {
    img = FreeBattleIcon;
  } else if (props.icon === "rankBattle") {
    img = RankBattleIcon;
  } else if (props.icon === "friend") {
    img = FriendIcon;
  } else if (props.icon === "deck") {
    img = DeckIcon;
  } else {
    img = SearchIcon;
  }
  return (
    <Box as="button">
      <Stack>
        <Box
          height="42px"
        >
          <Center>
            <NextImage
              // height="42px"
              // width="auto"
              src={img}
              // src={`./assets/headerIcon/${props.icon}`}
              // src={`${window.location.origin}/assets/headerIcon/${props.icon}`}
            />
          </Center>
        </Box>
        <Text color="#ffffff">{props.name}</Text>
      </Stack>
    </Box>
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
    <Box style={{backgroundColor: '#0B0134'}}>
      <Stack spacing={0}>
        <Box 
          background="linear-gradient(180deg, #103565 0%, #07172C 100%)"
          paddingTop="18px"
          paddingBottom="8px"
        >
          <Grid 
            templateColumns='repeat(7, 1fr)' 
            justifyItems="space-evenly"
          >
            <HeaderIcon
              name="ランク戦"
              icon="rankBattle"
            />
            <HeaderIcon
              name="フリー戦"
              icon="freeBattle"
            />
            <HeaderIcon
              name="フレンド対戦"
              icon="friend"
            />
            <Center>
              <Text color="#ffffff">遊戯王</Text>
            </Center>
            <HeaderIcon
              name="ショップ"
              icon="shop"
            />
            <HeaderIcon
              name="マイデッキ"
              icon="deck"
            />
            <HeaderIcon
              name="カード検索"
              icon="search"
            />
          </Grid>
        </Box>
        <Box paddingTop="72px" paddingLeft="80px" paddingRight="80px">
          <Grid templateColumns="290px auto" gap={16}>
            <Box minHeight="100vh">
              <Stack spacing={5}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineSearch color="#ffffff"/>}
                  />
                  <Input
                    borderColor="#4C4C4C" 
                    borderWidth="1.5px" 
                    borderRadius="10px"
                    focusBorderColor="#7517EC"
                    color="#ffffff"
                    placeholder="キーワードで検索"
                    _placeholder={{ opacity: 0.4, color: '#ffffff' }}
                  />
                </InputGroup>
                <Box borderColor="#4C4C4C" borderWidth="1px" borderRadius="15px">
                  <Stack color="#ffffff">
                    <Box style={{padding: "20px 20px 5px 20px"}}>
                      <Text as="b" fontSize="2xl">
                        フィルター
                      </Text>
                    </Box>
                    <Box paddingBottom="15px">
                      <Accordion 
                        allowMultiple 
                        defaultIndex={[0, 1, 2, 3, 4]}
                        colorScheme="red"
                      >

                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="b" flex='1' textAlign='left'>
                                世代
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box>
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

                        <CheckboxList
                          title="レア度"
                          elemArray={["ノーマル", "レア", "スーパーレア", "ウルトラレア"]}
                        />

                        <CheckboxList
                          title="カード"
                          elemArray={["モンスター", "魔法", "罠"]}
                        />

                        <CheckboxList
                          title="属性"
                          elemArray={["闇", "光", "池", "水", "炎", "風", "神"]}
                        />

                        <CheckboxList
                          title="効果"
                          elemArray={["武装", "フィールド", "速攻", "儀式", "存続", "カウンター", "通常"]}
                        />

                        <CheckboxList
                          title="種族"
                          elemArray={["魔法使い族", "ドラゴン族", "アンデット族", "戦士族", "獣戦士族", "獣族", "鳥獣族", "悪魔族", "天使族", "昆虫族", "恐竜族", "爬虫類族", "魚族", "海竜族", "水族", "炎族", "雷族", "岩石族", "植物族", "機械族", "サイキック族", "幻竜族", "サイバース族", "サイボーグ族", "魔導騎士族", "ハイドラゴン族", "天界戦士族", "オメガサイキック族", "ギャラクシー族"]}
                        />

                      </Accordion>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box height="100vh">
              <Stack color="#ffffff">
                <Box marginBottom="10px">
                  <NextImage
                    src={Banner}
                    // src="/assets/img.png"
                    // src={`${window.location.origin}/assets/banner.png`}
                  />
                  {/* ガチャ広告 (TODO) */}
                </Box>
                <Box>
                  <HStack spacing={5}>
                    <Box marginRight="25px">
                      <Text as="b" fontSize="2xl">
                        トレンド
                      </Text>
                    </Box>
                    <Box as="b" bg="#1E183E" width="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          デッキ
                        </Text>
                      </Center>
                    </Box>
                    <Box minWidth="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          世代
                        </Text>
                      </Center>
                    </Box>
                    <Box minWidth="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          モンスター
                        </Text>
                      </Center>
                    </Box>
                    <Box minWidth="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          魔法
                        </Text>
                      </Center>
                    </Box>
                    <Box minWidth="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          罠
                        </Text>
                      </Center>
                    </Box>
                  </HStack>
                  <Box width="100%" bg="#1E183E" height="288px" marginTop="18px" marginBottom="30px" borderRadius="16px">
                    <Box>
                    </Box>
                  </Box>
                </Box>
                <Box paddingBottom="12px">
                  <HStack spacing={5}>
                    <Box marginRight="25px">
                      <Text as="b" fontSize="2xl">
                        マーケットプレイス
                      </Text>
                    </Box>
                    <Box as="b" bg="#1E183E" width="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          すべて
                        </Text>
                      </Center>
                    </Box>
                    <Box minWidth="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          第1世代
                        </Text>
                      </Center>
                    </Box>
                    <Box minWidth="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          第2世代
                        </Text>
                      </Center>
                    </Box>
                    <Box minWidth="72px" height="40px" borderRadius="8px">
                      <Center height="40px">
                        <Text>
                          第3世代
                        </Text>
                      </Center>
                    </Box>
                  </HStack>
                </Box>
                <Box>
                  <SimpleGrid minChildWidth='122px' spacing={3}>
                    {
                      props.collectionData?.data?.nfts.map((nft: any, n: number) => {
                        return (
                          <Box 
                            maxWidth='150px' 
                            shadow='md' 
                            as="button"
                            onClick={() => {
                              console.log(n)
                            }}
                          >
                            <Grid templateColumns="1fr 64px" gap={2.5}>
                              <Box>
                                <Image
                                  src={nft?.media[0]?.gateway}
                                />
                              </Box>
                              <Box>
                                <Grid alignContent="space-between" height="100%">
                                  <Box textAlign='left'>
                                    <NextImage
                                      // width="28px"
                                      src={rarityIcon("normal")}
                                      // src="/assets/img.png"
                                      // src={`${window.location.origin}/assets/rarityIcon/SuperRare.png`}
                                    />
                                  </Box>
                                  <Box>
                                    <Image
                                      width="16px"
                                      src={"https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png"}
                                    />
                                    <Text>
                                      {`${(1 + 0.01 * n).toFixed(2)} ETH`}
                                    </Text>
                                  </Box>
                                </Grid>
                              </Box>
                            </Grid>
                          </Box>
                        )
                      })
                    }
                  </SimpleGrid>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}
