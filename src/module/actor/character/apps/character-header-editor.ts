import { getUserData } from '../../../helpers/jquery'
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
  dragElement: null | HTMLElement = null

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
      this.dragElement = ev.currentTarget
      draggableItems.each((_, item) => {
        if (item != ev.currentTarget) item.classList.add(dropHint)
      })
    })

    // on dragenter, highlight the item
    const dropHighlight = 'gurps-dnd-active'
    draggableItems.on('dragenter, dragover', ev => {
      ev.preventDefault()
      if (ev.currentTarget != this.dragElement) ev.currentTarget.classList.add(dropHighlight)
    })

    // on drag-leave, remove highlight
    draggableItems.on('dragleave', ev => ev.currentTarget.classList.remove(dropHighlight))

    // on drag-end
    draggableItems.on('dragend', () => {
      draggableItems.each((_, item) => {
        item.classList.remove(dropHint)
        item.classList.remove(dropHighlight)
      })
    })

    draggableItems.on('drop', ev => {
      ev.preventDefault()
      const dropTarget = ev.currentTarget

      if (this.dragElement && dropTarget && dropTarget != this.dragElement) {
        const dropTargetData = getUserData(dropTarget, 'span.headereditor-control')
        const targetIndex = parseInt(dropTargetData.value ?? '0') // value is index
        const targetList = (dropTargetData.action ?? '').split('::')[0] // action includes list, like 'details::delete'

        const dragElementData = getUserData(this.dragElement, 'span.headereditor-control')
        const sourceIndex = parseInt(dragElementData.value ?? '0') // value is index
        const sourceList = (dragElementData.action ?? '').split('::')[0] // action includes list, like 'details::delete'

        // remove the element from source
        let list = sourceList == 'visible' ? this.visible : this.details
        const tag = list.splice(sourceIndex, 1)[0]

        // add it to the target
        list = targetList == 'visible' ? this.visible : this.details
        list.splice(targetIndex, 0, tag)

        this.render(true)
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

  private async _handleClickAction(action: string | null, value: string, html: JQuery<HTMLElement>) {
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
        {
          html.find('.select input[type="checkbox"]:checked').each((index, element) => {
            const tag = (element as HTMLInputElement).value
            if (tag) this.details.push(tag)
          })
          this.render(true)
        }
        break

      case 'visible::add':
        {
          html.find('.select input[type="checkbox"]:checked').each((index, element) => {
            const tag = (element as HTMLInputElement).value
            if (tag) this.visible.push(tag)
          })
          this.render(true)
        }
        break

      case 'cancel':
        this.close()
        break

      case 'submit':
        {
          await this.gurpsCharacter.update({
            data: { desc: { settings: { visible: this.visible, details: this.details } } },
          })
          this.close()
        }
        break
    }
    return
  }
}
