export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "systems/new-system/templates"
  ];

  return loadTemplates(templatePaths);
}
