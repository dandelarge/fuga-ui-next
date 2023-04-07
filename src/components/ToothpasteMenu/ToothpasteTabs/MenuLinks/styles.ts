import { makeStyles, Theme } from "@material-ui/core";
import { Palette } from "@material-ui/core/styles/createPalette";

export const useStyles = makeStyles<Theme, { color: keyof Palette["tabs"] }>(
  (theme) => ({
    menuItemText: {
      color: theme.palette.text.primary,
    },
    hamburger: {
      color: (props) => theme.palette.tabs[props.color].contrastText,
      cursor: "pointer",
    },
    menuArrowIcon: {
      fontSize: "18px",
      verticalAlign: "middle",
      pointerEvents: "none",
    },
    arrowRightIcon: {
      marginLeft: "auto",
    },
  })
);
