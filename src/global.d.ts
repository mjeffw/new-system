import { Gurps2 } from './module/config'

declare global {
  interface LenientGlobalVariableTypes {
    game: never // the type doesn't matter
  }

  interface Window {
    gurps2: typeof Gurps2
  }
}
