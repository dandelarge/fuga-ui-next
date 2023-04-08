import React, { useState } from 'react';
import TopBar from '@/components/TopBar/TopBar';
import logo from '@/img/logo.png';
import Image from 'next/image';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import themes from '@/themes';
import ThemeSelect from '@/components/ThemeSelect/ThemeSelect';
import Title from '@/components/Title/Title';
import ToothPasteTabs from '@/components/ToothpasteMenu/ToothpasteTabs/ToothpasteTabs';
import { Box, Theme, Typography } from '@material-ui/core';
import { WindowSizeContextProvider } from '@/providers/WindowSizeProvider';
import TwoColumnsRow from '../TwoColumnsRow/TwoColumnsRow';
import ToothpasteButtons from '../ToothpasteMenu/ToothpastButtons/ToothpasteButtons';
import { ToothPasteButton } from '../ToothpasteMenu/ToothpastButtons/ToothpasteButton/toothpasteButton';
import { Add, ArrowDropDown, TagFaces, ViewModule } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  logo: {
    maxHeight: theme.spacing(6),
    width: 'auto',
    height: 'auto',
  },
  row: {
    padding: `0 ${theme.spacing(2)}px`,
    backgroundColor: theme.palette.background.paper,
  },
  leftColumn: {
    minWidth: '70%',
  }
}));

const topMenuLinks = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Catalog',
    href: '/catalog'
  },
  {
    label: 'Docs',
    href: '/docs'
  },
];

const tabsMenuLinks = [
  {
    label: 'Products',
    href: '/catalog'
  },
  {
    label: 'Assets',
    href: '/catalog/assets'
  },
  {
    label: 'Artists',
    href: '/catalog/artists'
  },
  {
    label: 'Labels',
    href: '/catalog/labels'
  },
  {
    label: 'Publishers',
    href: '/catalog/publishers'
  },
  {
    label: 'People',
    href: '/catalog/people'
  },];

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  topMenuIndex?: number;
  tabsMenuIndex?: number;
}


export function Layout(props: LayoutProps) {
  const classes = useStyles();
  const [theme, setTheme] = useState<Theme>((themes.get('default') as Theme));
  const [themeName, setThemeName] = useState('default');

  function handleThemeChange(name: string) {
    if (!themes.has(name)) return;

    if (name === themeName) return;

    setThemeName(name);
    setTheme((themes.get(name) as Theme));
  }

  return (
    <ThemeProvider theme={theme}>
      <WindowSizeContextProvider>
        <TopBar
          leftSideContent={<Image src={logo} alt="logo" className={classes.logo} />}
          rightSideContent={<ThemeSelect onChange={handleThemeChange} />}
        >
          <ToothPasteTabs color="primary" links={topMenuLinks} selectedIndex={props.topMenuIndex || 0} />
        </TopBar>
        <Title title={props.title || "Hello World"} />

        {props.children}
      </WindowSizeContextProvider>
    </ThemeProvider >);
};