import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  root: {
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  container: {
    borderColor: '#4C4C4C',
    borderBottom: "0px",
    // width: "280px",
    // margin: "auto",
  },
  panel: {
    paddingRight: "0px",
    paddingLeft: "0px",
  },
  button: {
    paddingRight: "0px",
    paddingLeft: "0px",
  },
})

export const accordionTheme = defineMultiStyleConfig({ baseStyle })
