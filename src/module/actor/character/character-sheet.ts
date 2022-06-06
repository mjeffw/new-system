export class GurpsCharacterSheet extends ActorSheet<ActorSheet.Options, GurpsCharacterSheetData> {
  override get template(): string {
    return `systems/new-system/module/actor/${this.actor.data.type}-sheet.hbs`
  }
}

type GurpsCharacterSheetData = ActorSheet.Data
