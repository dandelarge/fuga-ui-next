import React, { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar/TopBar';
import logo from '@/img/logo.png';
import Image from 'next/image';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import themes from '@/themes';
import ThemeSelect from '@/components/ThemeSelect/ThemeSelect';
import Title from '@/components/Title/Title';
import ToothPasteTabs from '@/components/ToothpasteMenu/ToothpasteTabs/ToothpasteTabs';
import { Box, CssBaseline, IconButton, Theme, Typography, createTheme, useMediaQuery, useTheme } from '@material-ui/core';
import { WindowSizeContextProvider } from '@/providers/WindowSizeProvider';
import TwoColumnsRow from '../TwoColumnsRow/TwoColumnsRow';
import ToothpasteButtons from '../ToothpasteMenu/ToothpastButtons/ToothpasteButtons';
import { ToothPasteButton } from '../ToothpasteMenu/ToothpastButtons/ToothpasteButton/toothpasteButton';
import { Add, ArrowDropDown, Brightness6, TagFaces, ViewModule } from '@material-ui/icons';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import FUGA_COLORS from '@/themes/colors';

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
    label: 'Docs',
    href: '/docs/getting-started'
  },
  {
    label: 'Catalog Layout',
    href: '/catalog'
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

const darkMode = {
  palette: {
    type: 'dark',
    primary: {
      main: FUGA_COLORS.GREY[100],
    },
    background: {
      paper: FUGA_COLORS.GREY[800],
    },
    navBar: {
      primary: {
        navBarIcon: FUGA_COLORS.WHITE,
        navBarUserMenuLabel: FUGA_COLORS.WHITE,
        backgroundColor: FUGA_COLORS.GREY[900]
      },
      secondary: {
        navBarIcon: FUGA_COLORS.WHITE,
        navBarUserMenuLabel: FUGA_COLORS.WHITE,
        backgroundColor: FUGA_COLORS.GREY[900]
      },
      default: {
        navBarIcon: FUGA_COLORS.WHITE,
        navBarUserMenuLabel: FUGA_COLORS.WHITE,
        backgroundColor: FUGA_COLORS.GREY[900]
      },
    },
    tabs: {
      primary: {
        backgroundColor: FUGA_COLORS.GREY[900],
        indicator: FUGA_COLORS.WHITE,
        contrastText: FUGA_COLORS.WHITE,
      },
      secondary: {
        backgroundColor: FUGA_COLORS.GREY[900],
        indicator: FUGA_COLORS.WHITE,
        contrastText: FUGA_COLORS.WHITE,
      },
      default: {
        backgroundColor: FUGA_COLORS.GREY[800],
        indicator: FUGA_COLORS.WHITE,
        contrastText: FUGA_COLORS.WHITE,
      },
    }
  } as PaletteOptions
};

const darkModeTheme = createTheme(darkMode);

export function Layout(props: LayoutProps) {
  const classes = useStyles();
  const [theme, setTheme] = useState<Theme>(darkModeTheme);
  const [themeName, setThemeName] = useState('dark');
  const [darkModeOn, setDarkModeOn] = useState(true);

  // const preffersDarkmode = useMediaQuery('(prefers-color-scheme: dark)');

  // useEffect(() => {
  //   if (preffersDarkmode) {
  //     setTheme(darkModeTheme);
  //     setThemeName('dark');
  //   }
  // }, [preffersDarkmode]);

  function handleThemeChange(name: string) {
    if (!themes.has(name)) return;

    if (name === themeName) return;

    setThemeName(name);
    setTheme((themes.get(name) as Theme));
    setDarkModeOn(false);
  }

  function toggleDarkMode() {
    if (!darkModeOn) {
      setTheme(darkModeTheme);
      setThemeName('dark');
      setDarkModeOn(true);
    }
    else {
      setTheme(themes.get('default') as Theme);
      setThemeName('default');
      setDarkModeOn(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WindowSizeContextProvider>
        <TopBar
          leftSideContent={<Image src={logo} alt="logo" className={classes.logo} />}
          rightSideContent={<>
            <ThemeSelect onChange={handleThemeChange} />
            <Box mx={1}>
              <IconButton onClick={toggleDarkMode}>
                <Brightness6 />
              </IconButton>
            </Box>
          </>}
        >
          <ToothPasteTabs color="primary" links={topMenuLinks} selectedIndex={props.topMenuIndex || 0} />
        </TopBar>
        <Title title={props.title || "Hello World"} />

        {props.children}
      </WindowSizeContextProvider>
    </ThemeProvider >);
};