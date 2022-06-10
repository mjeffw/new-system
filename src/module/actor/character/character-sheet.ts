import { Gurps2 } from '../../config'
import { toggleBetweenStyles } from '../../helpers/jquery'
import { CharacterHeaderEditor } from './apps/character-header-editor'

interface GurpsCharacterSheetData extends ActorSheet.Data {
  displayFlags: DisplayFlags
  type: 'character'
  config?: typeof Gurps2
}

class DisplayFlags {
  descDetailsOpen = false
}

// To change the value of a CSS variable: document.documentElement.style.setProperty(`--${your-variable}`, value + suffix); //suffix may be px or ''

export class GurpsCharacterSheet extends ActorSheet<ActorSheet.Options, GurpsCharacterSheetData> {
  displayFlags: DisplayFlags

  constructor(object: Actor, options?: Partial<ActorSheet.Options> | undefined) {
    super(object, options)

    this.displayFlags = new DisplayFlags()
  }

  override get template(): string {
    return `systems/new-system/module/actor/${this.actor.data.type}/${this.actor.data.type}-sheet.hbs`
  }

  static override get defaultOptions(): ActorSheet.Options {
    return mergeObject(super.defaultOptions, {
      width: 650,
    })
  }

  override getData(options?: Partial<ActorSheet.Options>): GurpsCharacterSheetData | Promise<GurpsCharacterSheetData> {
    const data = super.getData(options) as GurpsCharacterSheetData
    data.config = window.gurps2
    data.displayFlags = this.displayFlags
    return data
  }

  override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html)

    html.find('.accordion').on('click', this._toggleAccordionDisplay.bind(this))
    html.find('.actorsheet-control').on('click', this._handleActorSheetAction.bind(this, html))
  }

  _toggleAccordionDisplay(ev: JQuery.ClickEvent): void {
    ev.preventDefault()
    const element = $(ev.currentTarget)
    this.displayFlags.descDetailsOpen = !element.hasClass('active')
    element.toggleClass('active')
    const content = element.next('.accordion-content')
    toggleBetweenStyles(content, 'max-height', '0px', '100%')
  }

  _handleActorSheetAction(html: JQuery<HTMLElement>, ev: JQuery.ClickEvent): void {
    ev.preventDefault()
    const element = ev.currentTarget
    const value = element.value ?? null
    const action = element.dataset.action ?? null

    if (ev.type == 'click') this._handleClickAction(action, value, html)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _handleClickAction(action: string | null, value: string | null, html: JQuery<HTMLElement>) {
    switch (action) {
      case 'edit-header':
        {
          new CharacterHeaderEditor(this.actor).render(true)
        }
        break
    }
  }
}
