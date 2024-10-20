import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioGroupMenu({ onChange, name, defaultValue }) {

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Gender <span className="text-red-500">*</span>
      </FormLabel>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name={name} // Use the name prop passed to the component
        row // Display radio buttons horizontally
        value={defaultValue} // Set the default selected value
        onChange={(event) => onChange(event.target.value, name)} // Handle change event
      >
        <FormControlLabel 
          value="male" 
          control={<Radio />} 
          label="Male" 
        />
        <FormControlLabel 
          value="female" 
          control={<Radio />} 
          label="Female" 
        />
      </RadioGroup>
    </FormControl>
  );
}
