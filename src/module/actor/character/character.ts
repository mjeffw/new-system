import { Context } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/document.mjs'
import { ActorDataConstructorData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/actorData'

export class GurpsCharacter extends Actor {
  constructor(data?: ActorDataConstructorData, context?: Context<TokenDocument>) {
    super(data, context)
  }
}
