import { _validateChatMessageType } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/chatMessageData'
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
  current: null | HTMLElement = null

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

    // make the list elements 'draggable'
    const draggableItems = html.find('#visible-list li, #details-list li')
    this.makeDragAndDropSortable(draggableItems)
  }

  private makeDragAndDropSortable(draggableItems: JQuery<HTMLElement>) {
    draggableItems.attr('draggable', 'true')

    // on drag-start, save element as current and highlight drop zones
    const dropHint = 'gurps-drop-hint'
    draggableItems.on('dragstart', ev => {
      this.current = ev.currentTarget
      for (const item of draggableItems) if (item != ev.currentTarget) item.classList.add(dropHint)
    })

    // on dragenter, highlight the item
    const dropHighlight = 'gurps-dnd-active'
    draggableItems.on('dragover', ev => {
      ev.preventDefault()
      if (ev.currentTarget != this.current) ev.currentTarget.classList.add(dropHighlight)
    })

    // on drag-leave, remove highlight
    draggableItems.on('dragleave', ev => ev.currentTarget.classList.remove(dropHighlight))

    // on drag-end
    draggableItems.on('dragend', () => {
      for (const item of draggableItems) {
        item.classList.remove(dropHint)
        item.classList.remove(dropHighlight)
      }
    })

    draggableItems.on('drop', ev => {
      ev.preventDefault()
      const element = ev.currentTarget
      if (element.parentNode && this.current && ev.currentTarget != this.current) {
        let currentPosition = 0
        let droppedPosition = 0
        for (let index = 0; index < draggableItems.length; index++) {
          if (this.current == draggableItems[index]) currentPosition = index
          if (ev.currentTarget == draggableItems[index]) droppedPosition = index
        }

        if (currentPosition < droppedPosition) {
          element.parentNode.insertBefore(this.current, element.nextSibling)
        } else {
          element.parentNode.insertBefore(this.current, element)
        }
      }
    })
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
        {
          const index = parseInt(value)
          this.visible.splice(index, 1)
          this.render(true)
        }
        break

      case 'details::delete':
        {
          const index = parseInt(value)
          this.details.splice(index, 1)
          this.render(true)
        }
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
