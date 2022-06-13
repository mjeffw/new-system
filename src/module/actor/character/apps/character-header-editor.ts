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

  constructor(actor: GurpsCharacter, options?: FormApplicationOptions) {
    super(actor, options)

    this.gurpsCharacter = actor
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

    data.visible = (this.gurpsCharacter.data.data as GurpsCharacterData).desc.settings.visible
    data.details = (this.gurpsCharacter.data.data as GurpsCharacterData).desc.settings.details
    return data
  }

  protected _updateObject(event: Event, formData?: object): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
