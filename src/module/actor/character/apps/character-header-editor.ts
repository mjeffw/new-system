import { GurpsCharacter, GurpsCharacterData } from '../character'

interface CharacterHeaderEditorData extends ActorSheet.Data {
  visible: string[]
  details: string[]
  allTags: string[]
}

export class CharacterHeaderEditor extends FormApplication<
  FormApplicationOptions,
  CharacterHeaderEditorData,
  GurpsCharacter
> {
  gurpsCharacter: GurpsCharacter
  visible: string[]
  details: string[]

  constructor(actor: GurpsCharacter, options?: FormApplicationOptions) {
    super(actor, options)

    this.gurpsCharacter = actor
    this.visible = [...this.actorData.desc.settings.visible]
    this.details = [...this.actorData.desc.settings.details]
  }

  override get template(): string {
    return `systems/new-system/module/actor/${this.object.data.type}/apps/${this.object.data.type}-header-editor.hbs`
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
      case 'delete':
        const [list, index] = value?.split('::')
        const theList = list == 'visible' ? this.visible : this.details
        theList.splice(parseInt(index), 1)
        this.render()
    }
    return
  }

  protected _updateObject(event: Event, formData?: object): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
