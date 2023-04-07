import React, { useState, useRef, useLayoutEffect } from 'react';
import MenuLinks from './MenuLinks/MenuLinks';
import Link from 'next/link';
import { Tabs, Tab } from '@material-ui/core';
import { useWindowSizeContext } from '@/providers/WindowSizeProvider';
import { useTabsStyles, useTabStyles, useListStyle } from './styles';
import {
  TAB_BASE_WIDTH,
  moveHiddenItemsToVisibleItems,
  moveVisibleItemsToHiddenItems
} from '../helpers';

interface Props {
  links: Array<{ label: string; href: string }>;
  selectedIndex: number;
  color?: 'primary' | 'secondary' | 'default';
  tabProps?: any;
  isMobile?: boolean;
}

function ToothPasteTabs({
  links,
  selectedIndex = 0,
  color = 'primary',
  tabProps,
  isMobile = false
}: Props) {
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemWidths = useRef<Map<any, any> | null>(null);
  const moreTabRef = useRef(null);

  const [visibleItems, setVisibleItems] = useState<Array<any>>(links);
  const [hiddenItems, setHiddenItems] = useState<Array<any>>([]);
  const [totalWidth, setTotalWidth] = useState(0);

  const display = isMobile ? 'none' : 'flex';
  const tabsClasses = useTabsStyles({ display, color });
  const tabClasses = useTabStyles({ color });
  const listClasses = useListStyle({ color });
  const { windowWidth } = useWindowSizeContext();

  function canSetWidths() {
    return (
      listWrapperRef &&
      listWrapperRef.current &&
      listRef &&
      listRef.current
    );
  }

  function getCurrentWidths() {
    if (!canSetWidths()) {
      return {
        listWrapperWidth: 0,
        listWidth: 0
      };
    }

    return {
      listWrapperWidth: (listWrapperRef.current as HTMLDivElement).getBoundingClientRect().width,
      listWidth: (listRef.current as HTMLDivElement).getBoundingClientRect().width
    };
  }

  function getItemWidthsMap() {
    if (!itemWidths.current) {
      itemWidths.current = new Map();
    }
    return itemWidths.current;
  }

  function countItemsToRemove() {
    const { listWrapperWidth, listWidth } = getCurrentWidths();
    const widthsMap = getItemWidthsMap();
    const widthsArray = Array.from(widthsMap.values());
    const visibleItemsWidths = widthsArray.slice(0, visibleItems.length);
    let toRemove = 1;

    while (toRemove <= visibleItems.length) {
      const visibleItemsWidthsToCheck = visibleItemsWidths.slice(
        0,
        visibleItemsWidths.length - toRemove + 1
      );

      const lastItemWidth = visibleItemsWidthsToCheck.pop();

      if (listWrapperWidth >= listWidth - lastItemWidth) {
        break;
      }

      toRemove++;
    }

    return toRemove;
  }

  function countItemsToAdd() {
    const { listWrapperWidth, listWidth } = getCurrentWidths();
    const widthsMap = getItemWidthsMap();
    const widthsArray = Array.from(widthsMap.values());
    let toAdd = 1;

    while (toAdd <= hiddenItems.length) {
      const hiddenItemsWidthsToCheck = widthsArray.slice(
        visibleItems.length,
        visibleItems.length + toAdd
      );

      const hiddenItemsWidthsSum = hiddenItemsWidthsToCheck.reduce(
        (acc, width) => acc + width,
        0
      );

      if (listWrapperWidth < listWidth + hiddenItemsWidthsSum + 32) {
        break;
      }

      toAdd++;
    }

    return toAdd;
  }

  useLayoutEffect(() => {
    const widthsMap = getItemWidthsMap();
    const widthsArray = Array.from(widthsMap.values());
    setTotalWidth(widthsArray.reduce((acc, width) => acc + width, 0));
  }, []);

  useLayoutEffect(() => {
    if (!windowWidth) {
      return;
    }

    if (isMobile) {
      if (visibleItems.length > 0) {
        setVisibleItems([]);
        setHiddenItems(links);
      }

      return;
    }

    if (!canSetWidths()) {
      return;
    }

    const { listWrapperWidth, listWidth } = getCurrentWidths();

    let isWrapperSmallerThanList = listWrapperWidth <= listWidth;
    let wrapperFitsAnotherItem = listWrapperWidth > listWidth + TAB_BASE_WIDTH;
    // making sure the the last item has enough space
    let wrapperFitsAllItems = listWrapperWidth > totalWidth + 16;
    let isLastHiddenItem = hiddenItems.length === 1;
    const hiddenItemsListIsNotEmpty = !(hiddenItems.length === 0);

    if (isWrapperSmallerThanList && visibleItems.length > 0) {
      const deleteCount = countItemsToRemove();
      const updatedLists = moveVisibleItemsToHiddenItems(
        visibleItems,
        hiddenItems,
        deleteCount
      );

      setVisibleItems(updatedLists.visibleItems);
      setHiddenItems(updatedLists.hiddenItems);
    } else if (
      ((wrapperFitsAnotherItem && !isMobile) ||
        // if there's one element left in the moreLinks Array,
        // then we don't need to check if we can fit yet another element
        // Becase the MORE button will be replaced by the Item itself
        (isLastHiddenItem && wrapperFitsAllItems)) &&
      hiddenItemsListIsNotEmpty
    ) {
      const deleteCount = countItemsToAdd();
      const updatedLists = moveHiddenItemsToVisibleItems(
        visibleItems,
        hiddenItems,
        deleteCount
      );

      setVisibleItems(updatedLists.visibleItems);
      setHiddenItems(updatedLists.hiddenItems);
    }
  }, [windowWidth, isMobile]);

  return (
    <div className={listClasses.listWrapper} ref={listWrapperRef}>
      <div ref={listRef}>
        <Tabs classes={tabsClasses} value={selectedIndex || 0}>
          {visibleItems.map(link => {
            console.log(link);
            return (
              <Tab
                ref={node => {
                  const widthsMap = getItemWidthsMap();
                  if (node) {
                    widthsMap.set(link.id, node.getBoundingClientRect().width);
                  }
                }}
                key={`tab-${link.label}`}
                label={link.label}
                component={Link}
                classes={tabClasses}
                data-test-id={`masthead--main-menu__btn--${link.id}`}
                href={link.href}
                {...tabProps}
              />
            );
          })}

          {!hiddenItems.length ? null : (
            <Tab
              ref={moreTabRef}
              classes={tabClasses}
              data-test-id={`masthead--main-menu__btn--more`}
              label='more'
              links={hiddenItems}
              component={MenuLinks}
              isMobile={isMobile}
              color={color}
              {...tabProps}
            />
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ToothPasteTabs;
