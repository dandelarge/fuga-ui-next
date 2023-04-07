import { ThemeOptions, createTheme } from "@material-ui/core/styles";
import FUGA_COLORS from "./colors";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: 14,
    h1: {
      fontWeight: 600,
      fontSize: 15,
      color: FUGA_COLORS.GREY[800],
    },
    h2: {
      fontWeight: 600,
      fontSize: 13,
      color: FUGA_COLORS.GREY[700],
    },
  },
  palette: {
    background: {
      default: "#EEEEEE",
      paper: FUGA_COLORS.WHITE,
    },
    error: {
      main: FUGA_COLORS.RED[500],
    },
    warning: {
      main: FUGA_COLORS.ORANGE[600],
    },
    grey: FUGA_COLORS.GREY,
    primary: {
      light: FUGA_COLORS.ORANGE[200],
      main: FUGA_COLORS.ORANGE[300],
    },
    secondary: {
      main: FUGA_COLORS.ORANGE[300],
    },
    text: {
      primary: FUGA_COLORS.GREY[900],
      secondary: FUGA_COLORS.GREY[700],
    },
    tabs: {
      primary: {
        backgroundColor: FUGA_COLORS.ORANGE[300],
        contrastText: FUGA_COLORS.WHITE,
        indicator: FUGA_COLORS.WHITE,
      },
      secondary: {
        backgroundColor: FUGA_COLORS.ORANGE[300],
        contrastText: FUGA_COLORS.WHITE,
        indicator: FUGA_COLORS.WHITE,
      },
      default: {
        backgroundColor: FUGA_COLORS.WHITE,
        contrastText: FUGA_COLORS.GREY[900],
        indicator: FUGA_COLORS.ORANGE[300],
      },
    },
    navBar: {
      primary: {
        navBarIcon: FUGA_COLORS.WHITE,
        navBarUserMenuLabel: FUGA_COLORS.WHITE,
        backgroundColor: FUGA_COLORS.ORANGE[300],
      },
      secondary: {
        navBarIcon: FUGA_COLORS.WHITE,
        navBarUserMenuLabel: FUGA_COLORS.WHITE,
        backgroundColor: FUGA_COLORS.ORANGE[300],
      },
      default: {
        navBarIcon: FUGA_COLORS.WHITE,
        navBarUserMenuLabel: FUGA_COLORS.WHITE,
        backgroundColor: FUGA_COLORS.ORANGE[300],
      },
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: FUGA_COLORS.GREY[700],
        "&$focused": {
          color: FUGA_COLORS.GREY[700],
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        position: "static",
      },
    },

    MuiFormControlLabel: {
      label: {
        fontSize: 14,
      },
    },
    MuiButton: {
      root: {
        height: "36px",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
        },
        "&$disabled": {
          color: FUGA_COLORS.GREY[400],
          "& svg": {
            fill: FUGA_COLORS.GREY[400],
          },
        },
      },
      disabled: {},
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
        },
      },
      containedPrimary: {
        color: FUGA_COLORS.WHITE,
      },
      containedSecondary: {
        color: FUGA_COLORS.WHITE,
      },
    },

    MuiInput: {
      root: {
        fontSize: "14px",
        color: FUGA_COLORS.GREY[900], // all themes primary text color
      },
      formControl: {
        "label + &": {
          marginTop: 0,
        },
      },
      underline: {
        "&:before": {
          borderBottomColor: FUGA_COLORS.GREY[400],
        },
      },
    },

    MuiInputBase: {
      input: {
        color: FUGA_COLORS.GREY[900],
      },
    },

    MuiCheckbox: {
      root: {
        color: FUGA_COLORS.GREY[400],
      },
      colorSecondary: {
        "&$checked": {
          color: FUGA_COLORS.ORANGE[500],
        },
        "&$disabled": {
          color: FUGA_COLORS.GREY[400],
        },
      },
    },

    MuiMenuItem: {
      root: {
        paddingTop: 12,
        paddingBottom: 12,
      },
    },

    MuiListItem: {
      root: {
        paddingTop: 12,
        paddingBottom: 12,
      },
    },

    MuiListItemText: {
      root: {
        marginTop: 0,
        marginBottom: 0,
      },
      primary: {
        fontSize: 14,
      },
      secondary: {
        fontSize: 11,
      },
    },

    MuiChip: {
      root: {
        color: FUGA_COLORS.GREY[400],
      },
      label: {
        marginTop: "2px",
      },
      colorPrimary: {
        backgroundColor: FUGA_COLORS.ORANGE[200],
      },
      outlined: {
        borderColor: FUGA_COLORS.GREY[700],
        color: FUGA_COLORS.GREY[900],
        "&$clickable": {
          "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.07)",
          },
        },
        "&$disabled": {
          backgroundColor: FUGA_COLORS.GREY[300],
        },
      },
      outlinedPrimary: {
        borderColor: FUGA_COLORS.ORANGE[300],
        backgroundColor: FUGA_COLORS.ORANGE[50],
        color: FUGA_COLORS.ORANGE[900],
      },
      deleteIcon: {
        color: FUGA_COLORS.GREY[900],
        "&:hover": {
          color: FUGA_COLORS.GREY[900],
        },
      },
    },
    MuiListItemIcon: {
      root: {
        "min-width": "20px",
        "margin-right": "16px",
        color: "inherit",
      },
    },

    MuiToolbar: {
      root: {
        minHeight: 72,
        "&$regular": {
          minHeight: 72,
          "&@media (min-width: 600px)": {
            minHeight: 72,
          },
        },
      },
    },

    MuiTabs: {
      root: {
        minHeight: 72,
      },
    },

    MuiTab: {
      root: {
        minWidth: 72,
        padding: "8px 16px",
        "@media (min-width: 600px)": {
          minWidth: "auto",
        },
      },
    },

    MuiDialogActions: {
      root: {
        backgroundColor: FUGA_COLORS.GREY[50],
      },
    },

    MuiTableRow: {
      root: {
        "&:nth-of-type(even)": {
          backgroundColor: FUGA_COLORS.ORANGE[300],
        },
      },
    },

    MuiTableCell: {
      root: {
        padding: "8px 16px",
        border: "none",
        borderBottom: "none",
      },
      head: {
        textTransform: "uppercase",
        fontSize: 11,
        borderBottom: `1px solid ${FUGA_COLORS.GREY[300]}`,
      },
    },
  },
};
// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
