import NormalIcon from "./assets/rarityIcon/Normal.png";
import RareIcon from "./assets/rarityIcon/Rare.png";
import SuperRareIcon from "./assets/rarityIcon/SuperRare.png";
import UltraRareIcon from "./assets/rarityIcon/UltraRare.png";
import { RarityType } from "src/types/collectionMetadata";

export function getRarityIcon(rarity: RarityType) {
  if (rarity === "N") {
    return NormalIcon;
  } else if (rarity === "R") {
    return RareIcon;
  } else if (rarity === "SR") {
    return SuperRareIcon;
  } else {
    return UltraRareIcon;
  }
}