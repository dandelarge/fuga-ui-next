// The default width of MUI Tabs is 20 MUI spacing units. (8px * 20 = 160px)
export const TAB_BASE_WIDTH = 160;

export function moveHiddenItemsToVisibleItems(
  visibleItems: Array<any>,
  hiddenItems: Array<any>,
  deleteCount = 1
) {
  // make a copy of the hiddenItems Array. We don't want to mutate the state (yet)
  const copy = [...hiddenItems];

  // remove the first element from the copy.
  // Copy is now the same as hiddenItems minus the first element,
  // and the removed element is stored in the `added` variable
  const added = copy.splice(0, deleteCount);
  return {
    visibleItems: [...visibleItems, ...added],
    hiddenItems: copy,
  };
}

export function moveVisibleItemsToHiddenItems(
  visibleItems: Array<any>,
  hiddenItems: Array<any>,
  deleteCount = 1
) {
  // make a copy of the visibleItems Array. We don't want to mutate the state (yet)
  const copy = [...visibleItems];

  // remove the last element from the copy.
  // Copy is now the same as visibleItems minus the last element,
  // and the removed element is stored in the `removed` variable
  const removed = copy.splice(-1 * deleteCount, deleteCount);
  return {
    visibleItems: copy,
    hiddenItems: [...removed, ...hiddenItems],
  };
}
