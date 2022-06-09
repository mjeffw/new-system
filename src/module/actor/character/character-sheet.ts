import { Gurps2 } from '../../config'

interface GurpsCharacterSheetData extends ActorSheet.Data {
  type: 'character'
  config?: typeof Gurps2
}

// To change the value of a CSS variable: document.documentElement.style.setProperty(`--${your-variable}`, value + suffix); //suffix may be px or ''

export class GurpsCharacterSheet extends ActorSheet<ActorSheet.Options, GurpsCharacterSheetData> {
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
    return data
  }

  override activateListeners(html: JQuery<HTMLElement>): void {
    html.find('.accordion').on('click', function (ev) {
      ev.preventDefault()
      const element = $(ev.currentTarget)
      element.toggleClass('active')

      const content = element.next('.accordion-content')
      toggleBetweenStyles(content, 'max-height', '0px', '100%')
    })
  }
}

/**
 * JQuery HMTLElement method.
 *
 * If the specified style is currently set to 'choice1', set it to 'choice2'; otherwise set it to 'choice1'.
 *
 * @param element: JQuery<HTMLElement> to operate on.
 * @param style: the name of the style to modify
 * @param choice1: value1
 * @param choice2: value2
 */
function toggleBetweenStyles(element: JQuery<HTMLElement>, style: string, choice1: string, choice2: string) {
  if (element.css(style) == choice1) element.css(style, choice2)
  else element.css(style, choice1)
}
