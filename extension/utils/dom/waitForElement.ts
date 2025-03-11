export function waitForElement(
  els: string[],
  func: (elements: (HTMLElement | null)[]) => void,
  timeout = 100
): void {
  const queries = els.map((el) => document.querySelector(el) as HTMLElement | null);
  if (queries.every((a) => a)) {
    func(queries);
  } else if (timeout > 0) {
    setTimeout(waitForElement, 300, els, func, --timeout);
  }
}
