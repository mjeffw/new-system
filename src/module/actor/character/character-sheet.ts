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

  override activateListeners(html: JQuery<HTMLElement>): void {
    html.find('.accordion').on('click', function (ev) {
      ev.preventDefault()
      const element = ev.currentTarget
      $(element).toggleClass('active')
      const content = $(element).next('.accordion-content')
      if (content.css('max-height') == '0px') content.css('max-height', '100px')
      else content.css('max-height', '0px')
    })
  }
}
