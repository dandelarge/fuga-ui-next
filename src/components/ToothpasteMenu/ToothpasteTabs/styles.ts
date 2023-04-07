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