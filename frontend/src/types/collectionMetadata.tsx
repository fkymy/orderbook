export type CardType = "モンスター" | "罠" | "トラップ";
export type RarityType = 'N' | 'R' | 'SR' | 'UR';

export type CollectionMetadataType = {
  type: CardType,
  rarity: RarityType,
  monsterAttributes?: {
    attribute: string;
    level: number;
    atk: number;
    def: number;
  },
  otherAttributes?: {
    effect: string;
  }
}
