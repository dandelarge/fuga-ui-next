import { Theme, makeStyles } from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";

export const useListStyle = makeStyles<Theme, { color: keyof Palette["tabs"] }>(
  (theme) => ({
    listWrapper: {
      flex: 1,
      flexBasis: "100%",
      display: "flex",
      alignItems: "center",
      backgroundColor: ({ color }) => theme.palette.tabs[color].backgroundColor,
    },
    listItem: {
      flexShrink: 0,
    },
  })
);

export const useTabsStyles = makeStyles<
  Theme,
  {
    color: "primary" | "secondary" | "default";
    display: "flex" | "none";
  }
>((theme) => ({
  root: {
    minHeight: ({ color }) =>
      color === "default" ? theme.spacing(4) : "default",
    letterSpacing: ({ color }) => (color === "default" ? "1.2px" : "default"),
  },
  indicator: {
    display: ({ display }) => display || "default",
    backgroundColor: ({ color }) => theme.palette.tabs[color].indicator,
  },
  fixed: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const useTabStyles = makeStyles<Theme, { color: keyof Palette["tabs"] }>(
  (theme) => ({
    root: {
      color: ({ color }) => theme.palette.tabs[color].contrastText,
      minHeight: ({ color }) =>
        color === "primary" ? theme.spacing(9) : "default",
      textTransform: ({ color }) =>
        color === "primary" ? "capitalize" : "uppercase",
      fontWeight: ({ color }) => (color === "primary" ? 700 : 500),
      fontSize: ({ color }) => (color === "primary" ? "16px" : "14px"),
      "& > span": {
        color: ({ color }) => theme.palette.tabs[color].contrastText,
      },
    },
    selected: {
      "& > span": {
        color: ({ color }) => theme.palette.tabs[color].indicator,
      },
    },
  })
);
