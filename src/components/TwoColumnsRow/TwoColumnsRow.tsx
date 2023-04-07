import React from 'react';
import { useStyles } from './styles';

interface Props {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  flexColumn?: 'left' | 'right';
  leftColumnClass?: string;
  rightColumnClass?: string;
}

const TwoColumnsLayout = ({
  leftColumn,
  rightColumn,
  flexColumn,
  leftColumnClass = '',
  rightColumnClass = ''
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.columnsWrapper}>
      <div
        className={`${flexColumn === 'left' &&
          classes.flexColumn} ${leftColumnClass}`}
      >
        {leftColumn}
      </div>
      <div
        className={`${flexColumn === 'right' &&
          classes.flexColumn} ${rightColumnClass}`}
      >
        {rightColumn}
      </div>
    </div>
  );
};

export default TwoColumnsLayout;
