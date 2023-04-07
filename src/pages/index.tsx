import React, { useState } from 'react';
import TopBar from '@/components/TopBar/TopBar';
import logo from '@/img/logo.png';
import Image from 'next/image';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import themes from '@/themes';
import ThemeSelect from '@/components/ThemeSelect/ThemeSelect';
import Title from '@/components/Title/Title';
import ToothpasteButtons from '@/components/ToothpasteMenu/ToothpastButtons/ToothpasteButtons';
import ToothPasteTabs from '@/components/ToothpasteMenu/ToothpasteTabs/ToothpasteTabs';
import { Box, Theme } from '@material-ui/core';
import { WindowSizeContextProvider } from '@/providers/WindowSizeProvider';

const useStyles = makeStyles(theme => ({
  logo: {
    maxHeight: theme.spacing(6),
    width: 'auto',
    height: 'auto',
  },
  row: {
    padding: `0 ${theme.spacing(2)}px`,
    backgroundColor: theme.palette.background.paper,
  }
}));

const tabsMenuLinks = [
  {
    label: 'Products',
    href: '/'
  },
  {
    label: 'Assets',
    href: '/'
  },
  {
    label: 'Artists',
    href: '/'
  },
  {
    label: 'Labels',
    href: '/'
  },
  {
    label: 'Publishers',
    href: '/'
  },
  {
    label: 'People',
    href: '/'
  },];

export default function Index() {
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
        </TopBar>
        <Title title="Hello World" />
        <Box className={classes.row}>
          <ToothPasteTabs
            color='default'
            links={tabsMenuLinks}
          />
        </Box>
      </WindowSizeContextProvider>
    </ThemeProvider >);
}