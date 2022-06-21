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

/**
 * Given an element and a selector, find the first child element and return its user data.
 * @param parent the node in the DOM to start the search from.
 * @param selector a selector that returns the node(s) of interest.
 * @returns the user data map for the first child of the parent element that matches the selector.
 */
export function getUserData(parent: HTMLElement, selector: string) {
  const child = $(parent).find(selector)[0]
  return child.dataset
}
