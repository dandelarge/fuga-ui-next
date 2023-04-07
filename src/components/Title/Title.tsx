import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponentElement } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    top: 5,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  childrenContainer: {
    flexShrink: 1,
    flexGrow: 0
  }
}));

export default function Title({ title, children }: { title: string, children?: ReactComponentElement<any> | undefined }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" >
        {title}
      </Typography>
      <div className={classes.childrenContainer}>{children || null}</div>
    </div>
  );
};