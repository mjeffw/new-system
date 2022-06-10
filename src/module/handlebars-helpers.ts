export default function registerHandlebarsHelpers(): void {
  Handlebars.registerHelper(helpers)
}

const helpers = {
  htmlToPlainText: (input: string | null | undefined): string | null | undefined => {
    if (!input) return
    return $(input).text()
  },

  isEmpty: (input: Array<unknown> | null | undefined): boolean => (input?.length ?? 0) === 0,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  concat: (...values: any[]): string => {
    const options = values.pop()
    const join = options.hash?.join || ''
    return values.join(join)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug: (value: any): void => {
    console.log('Current context:')
    console.log('================')
    console.log(this)

    if (value) {
      console.log('Value:')
      console.log('================')
      console.log(value)
    }
  },
}
