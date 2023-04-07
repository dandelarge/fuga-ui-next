import { Theme, makeStyles } from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    navBar: {
      default: {
        backgroundColor: string;
      };
    };
  }
  // allow configuration using `createMuiTheme`
  interface PaletteOptions {
    navBar: {
      default: {
        backgroundColor: string;
      };
    };
  }
}

export const useStyles = makeStyles<
  Theme,
  { color: keyof Palette["navBar"]; separatorWidth: number }
>((theme) => ({
  customToolBar: {
    minHeight: theme.spacing(9),
  },
  customAppBar: {
    backgroundColor: ({ color }) => theme.palette.navBar[color].backgroundColor,
  },
  leftSideContent: {
    flexShrink: 0,
    display: "flex",
  },
  rightSideContent: {
    flexShrink: 0,
    display: "flex",
  },
  navLinksContainer: {
    flexGrow: 1,
    marginRight: ({ separatorWidth }) => theme.spacing(separatorWidth),
    marginLeft: ({ separatorWidth }) => theme.spacing(separatorWidth),
  },
}));
