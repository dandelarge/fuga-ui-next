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
import TwoColumnsRow from '../../TwoColumnsRow/TwoColumnsRow';
import ToothpasteButtons from '../../ToothpasteMenu/ToothpastButtons/ToothpasteButtons';
import { ToothPasteButton } from '../../ToothpasteMenu/ToothpastButtons/ToothpasteButton/toothpasteButton';
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


export function CatalogLayout(props: LayoutProps) {
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
    <>
      <Box className={classes.row} borderBottom={`1px solid #e3e3e3`}>
        <ToothPasteTabs
          color='default'
          links={tabsMenuLinks}
          selectedIndex={props.tabsMenuIndex}
        />
      </Box>
      <Box className={classes.row}>
        <TwoColumnsRow
          flexColumn='right'
          leftColumn={<Typography variant='h6'>This column has 70% width</Typography>}
          leftColumnClass={classes.leftColumn}
          rightColumn={<ToothpasteButtons>
            <ToothPasteButton color='primary' startIcon={<ViewModule />} menuLabel='View'>View</ToothPasteButton>
            <ToothPasteButton variant="contained" color='primary' startIcon={<Add />} menuLabel='Create'>Create</ToothPasteButton>
            <ToothPasteButton variant="outlined" color='primary' startIcon={<TagFaces />} menuLabel='Tag'>Tag</ToothPasteButton>
            <ToothPasteButton variant="outlined" color='primary' endIcon={<ArrowDropDown />} menuLabel='Bulk Actions'>Bulk Actions</ToothPasteButton>
          </ToothpasteButtons>}
        />
      </Box>
      <Box p={2}>
        {props.children}
      </Box>
    </>);
};