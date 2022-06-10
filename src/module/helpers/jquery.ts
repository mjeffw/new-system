/**
 * JQuery HMTLElement method.
 *
 * If the specified style is currently set to 'choice1', set it to 'choice2'; otherwise set it to 'choice1'.
 *
 * @param element: JQuery<HTMLElement> to operate on.
 * @param style: the name of the style to modify
 * @param choice1: value1
 * @param choice2: value2
 */
export function toggleBetweenStyles(element: JQuery<HTMLElement>, style: string, choice1: string, choice2: string) {
  if (element.css(style) == choice1) element.css(style, choice2)
  else element.css(style, choice1)
}
