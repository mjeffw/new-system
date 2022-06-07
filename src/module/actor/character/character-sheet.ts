import { Gurps2 } from '../../config'

interface GurpsCharacterSheetData extends ActorSheet.Data {
  type: 'character'
  config?: typeof Gurps2
}

export class GurpsCharacterSheet extends ActorSheet<ActorSheet.Options, GurpsCharacterSheetData> {
  override get template(): string {
    return `systems/new-system/module/actor/${this.actor.data.type}/${this.actor.data.type}-sheet.hbs`
  }

  override getData(options?: Partial<ActorSheet.Options>): GurpsCharacterSheetData | Promise<GurpsCharacterSheetData> {
    const data = super.getData(options) as GurpsCharacterSheetData
    data.config = window.gurps2
    return data
  }
}
