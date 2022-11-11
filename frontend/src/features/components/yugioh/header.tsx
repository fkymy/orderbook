import { Box, Center, Grid, Stack, Text } from '@chakra-ui/react'
import NextImage, { StaticImageData } from 'next/image'
import DeckIcon from './assets/headerIcon/deck.png'
import FreeBattleIcon from './assets/headerIcon/free_battle.png'
import FriendIcon from './assets/headerIcon/friend.png'
import RankBattleIcon from './assets/headerIcon/rank_battle.png'
import SearchIcon from './assets/headerIcon/search.png'
import ShopIcon from './assets/headerIcon/shop.png'
import MainLogo from './assets/mainLogo.png';

interface headerIcon {
  icon: string
  name: string
  selected: boolean
}

function HeaderIcon(props: headerIcon) {
  let img: StaticImageData
  if (props.icon === 'shop') {
    img = ShopIcon
  } else if (props.icon === 'freeBattle') {
    img = FreeBattleIcon
  } else if (props.icon === 'rankBattle') {
    img = RankBattleIcon
  } else if (props.icon === 'friend') {
    img = FriendIcon
  } else if (props.icon === 'deck') {
    img = DeckIcon
  } else {
    img = SearchIcon
  }
  return (
    <Box as='button'>
      <Stack>
        <Box height='42px'>
          <Center>
            <NextImage src={img} />
          </Center>
        </Box>
        <Text color={props.selected ? '#ffffff' : '#d8d8d8'} as={props.selected ? 'b' : 'a'}>{props.name}</Text>
      </Stack>
    </Box>
  )
}

export function YugidamaHeader() {
  return (
    <>
      <Box
        background='linear-gradient(180deg, #103565 0%, #07172C 100%)'
        paddingTop='18px'
        paddingBottom='8px'
      >
        <Grid templateColumns='repeat(7, 1fr)' justifyItems='space-evenly'>
          <HeaderIcon name='ランク戦' selected={false} icon='rankBattle' />
          <HeaderIcon name='フリー戦' selected={false} icon='freeBattle' />
          <HeaderIcon name='フレンド対戦' selected={false} icon='friend' />
          <Center>
            <NextImage
              src={MainLogo}
              width="206px"
              height="92px"
            />
            {/* <Text color='#ffffff'>遊戯王</Text> */}
          </Center>
          <HeaderIcon name='ショップ' selected={true} icon='shop' />
          <HeaderIcon name='マイデッキ' selected={false} icon='deck' />
          <HeaderIcon name='カード検索' selected={false} icon='search' />
        </Grid>
      </Box>
    </>
  )
}
