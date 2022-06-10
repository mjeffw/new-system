/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your system, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your system.
 */

// Import TypeScript modules
import { registerSettings } from './settings'
import { preloadTemplates } from './preloadTemplates'
import { GurpsCharacterSheet } from './actor/character/character-sheet'
import { Gurps2 } from './config'
import { GurpsCharacter } from './actor/character/character'
import registerHandlebarsHelpers from './handlebars-helpers'

// Initialize system
Hooks.once('init', async () => {
  window.gurps2 = Gurps2 // Make gurps global!

  console.log(Gurps2.ASCII)
  console.log(Gurps2.LEGAL)

  // Assign custom classes and constants here

  // Register custom system settings
  registerSettings()

  // Preload Handlebars templates
  await preloadTemplates()

  registerHandlebarsHelpers()

  // Register Actor classes
  CONFIG.Actor.documentClass = GurpsCharacter

  // Register custom sheets (if any)
  Actors.unregisterSheet('core', ActorSheet)
  Actors.registerSheet('new-system', GurpsCharacterSheet, { makeDefault: true })
})

// Setup system
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
})

// When ready
Hooks.once('ready', async () => {
  // Do anything once the system is ready
})

// Add any additional hooks if necessary
