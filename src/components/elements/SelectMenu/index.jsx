import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMenu({ title, menuitems, onChange, value, name }) {
  return (
    <FormControl fullWidth sx={{ m: 1 }} size="small">
      <InputLabel id="demo-select-small-label">{title}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={title}
        onChange={(e) => onChange(e.target.value, name)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuitems && menuitems.map((item) => (
          <MenuItem key={item.cafeId} value={item.cafeId}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
