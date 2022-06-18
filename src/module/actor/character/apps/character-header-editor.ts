import { GurpsCharacter, GurpsCharacterData } from '../character'

interface CharacterHeaderEditorData extends ActorSheet.Data {
  visible: string[]
  details: string[]
  allTags: string[]
}

export class CharacterHeaderEditor extends Application<ApplicationOptions> {
  gurpsCharacter: GurpsCharacter
  visible: string[]
  details: string[]

  constructor(actor: GurpsCharacter, options?: FormApplicationOptions) {
    super(options)

    this.gurpsCharacter = actor
    this.visible = [...this.actorData.desc.settings.visible]
    this.details = [...this.actorData.desc.settings.details]
  }

  override get template(): string {
    return `systems/new-system/module/actor/character/apps/character-header-editor.hbs`
  }

  override getData(
    options?: Partial<FormApplicationOptions>
  ): CharacterHeaderEditorData | Promise<CharacterHeaderEditorData> {
    const data = super.getData(options) as CharacterHeaderEditorData
    data.allTags = [
      'gender',
      'height',
      'race',
      'age',
      'weight',
      'title',
      'techlevel',
      'player',
      'birthday',
      'religion',
      'eyes',
      'hair',
      'handedness',
      'skin',
      'createdon',
      'modifiedon',
    ]

    data.visible = this.visible
    data.details = this.details
    return data
  }

  get actorData() {
    return this.gurpsCharacter.data.data as GurpsCharacterData
  }

  override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html)

    html.find('.headereditor-control').on('click', this.handleControlEvent.bind(this, html))
  }

  handleControlEvent(html: JQuery<HTMLElement>, ev: JQuery.ClickEvent) {
    ev.preventDefault()
    const element = ev.currentTarget
    const value = element.value ?? element.dataset.value
    const action = element.dataset.action ?? null

    if (ev.type == 'click') this._handleClickAction(action, value, html)
  }

  private _handleClickAction(action: string | null, value: string, html: JQuery<HTMLElement>) {
    switch (action) {
      case 'visible::delete':
        const index = parseInt(value)
        this.visible.splice(index, 1)
        this.render(true)
        break

      case 'details::add':
        html.find('.select input[type="checkbox"]:checked').each((index, element) => {
          const tag = (element as HTMLInputElement).value
          if (tag) this.details.push(tag)
        })
        this.render(true)
        break

      case 'visible::add':
        html.find('.select input[type="checkbox"]:checked').each((index, element) => {
          const tag = (element as HTMLInputElement).value
          if (tag) this.visible.push(tag)
        })
        this.render(true)
        break
    }
    return
  }
}
