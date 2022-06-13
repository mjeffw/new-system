import { Context } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/document.mjs'
import { ActorDataConstructorData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/actorData'

interface CharacterDescription {
  gender: string
  race: string
  age: string
  height: string
  weight: string
  title: string
  birthday: string
  religion: string
  eyes: string
  hair: string
  hand: string
  skin: string
  techlevel: string
  createdon: string
  modifiedon: string
  player: string
  appearance: string
  settings: { visible: string[]; details: [] }
}

export interface GurpsCharacterData extends ActorDataConstructorData {
  desc: CharacterDescription
}

export class GurpsCharacter extends Actor {
  constructor(data?: GurpsCharacterData, context?: Context<TokenDocument>) {
    super(data, context)
    // Test
  }
}
