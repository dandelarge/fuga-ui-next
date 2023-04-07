import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    width: "100%",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
  },
  menuItem: {
    padding: theme.spacing(1),
    "&:first-child": {
      paddingLeft: 0,
    },
    "&:last-child": {
      paddingRight: 0,
    },
  },
  unstyledButton: {
    padding: 0,
    border: "none",
    background: "none",
    cursor: "auto",
    outline: "none",
  },
}));
