import { CustomComponentPaletteOptions, FugaThemeOptions, NavBarPaletteOptions, TabsPaletteOptions } from '@/themes/types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useStyles } from './styles';
import { Palette } from '@material-ui/core/styles/createPalette';

interface Props {
  leftSideContent?: React.ReactNode;
  rightSideContent?: React.ReactNode;
  children?: React.ReactNode;
  color?: keyof Palette['navBar'];
  separatorWidth?: number;
}


export default function TopBar({
  leftSideContent,
  rightSideContent,
  children,
  color = 'default',
  separatorWidth = 2
}: Props) {
  const classes = useStyles({ color, separatorWidth });

  return (
    <AppBar position="static" className={classes.customAppBar}>
      <Toolbar className={classes.customToolBar}>
        <div className={classes.leftSideContent}>{leftSideContent}</div>
        <div className={classes.navLinksContainer}>{children}</div>
        <div className={classes.rightSideContent}>{rightSideContent}</div>
      </Toolbar>
    </AppBar>
  );
}

