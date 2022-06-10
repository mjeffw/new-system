import { GurpsCharacter } from '../character'

interface CharacterHeaderEditorData extends ActorSheet.Data {
  allTags: string[]
}

export class CharacterHeaderEditor extends FormApplication<
  FormApplicationOptions,
  CharacterHeaderEditorData,
  GurpsCharacter
> {
  constructor(actor: GurpsCharacter, options?: FormApplicationOptions) {
    super(actor, options)
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

    return data
  }

  protected _updateObject(event: Event, formData?: object): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
}
