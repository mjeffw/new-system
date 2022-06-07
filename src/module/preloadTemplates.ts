export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "systems/new-system/templates"
    // 'module/actor/character/character-sheet.hbs',
  ]

  return loadTemplates(templatePaths)
}
