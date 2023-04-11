import { FormControl, Select } from '@material-ui/core';
import React, { useState } from 'react'
import { useStyles } from './styles';
import themes from '@/themes';

interface Props {
  onChange: (themeName: string) => void;
}


export default function ThemeSelect({ onChange }: Props) {
  const [themeName, setThemeName] = useState('dafault');

  const classes = useStyles();

  return (
    <FormControl variant="outlined" >
      <Select
        native
        className={classes.themeSelect}
        value={themeName}
        onChange={e => {
          setThemeName(e.target.value as string);
          if (onChange && typeof onChange === 'function') {
            onChange(e.target.value as string);
          }

        }} >
        <option value={""} disabled> Select a theme</option>
        {
          themes.size > 0 ?
            Array.from(themes.keys()).map(name =>
              (<option value={name} key={name}>{name} theme</option>)
            ) :
            null
        }
      </Select>
    </FormControl >
  )
}
