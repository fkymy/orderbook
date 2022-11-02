import { Box, Center, Grid, Stack, Text } from '@chakra-ui/react'
import NextImage, { StaticImageData } from 'next/image'
import DeckIcon from './assets/headerIcon/deck.png'
import FreeBattleIcon from './assets/headerIcon/free_battle.png'
import FriendIcon from './assets/headerIcon/friend.png'
import RankBattleIcon from './assets/headerIcon/rank_battle.png'
import SearchIcon from './assets/headerIcon/search.png'
import ShopIcon from './assets/headerIcon/shop.png'

interface headerIcon {
  icon: string
  name: string
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
        <Text color='#ffffff'>{props.name}</Text>
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
          <HeaderIcon name='ランク戦' icon='rankBattle' />
          <HeaderIcon name='フリー戦' icon='freeBattle' />
          <HeaderIcon name='フレンド対戦' icon='friend' />
          <Center>
            <Text color='#ffffff'>遊戯王</Text>
          </Center>
          <HeaderIcon name='ショップ' icon='shop' />
          <HeaderIcon name='マイデッキ' icon='deck' />
          <HeaderIcon name='カード検索' icon='search' />
        </Grid>
      </Box>
    </>
  )
}
