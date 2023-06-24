import React, { useEffect, useState }from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GenreSelect({genres, onChange}) {
    const [value, setValue] = useState('all');

    const handleChange = (e) => {
        setValue(e.target.value)
        onChange(e.target.value)
    }
  return (
    <Box className='genre-select'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label=""
          onChange={handleChange}
        >
            <MenuItem value='all'>Todos</MenuItem>
            {genres.map((genre)=>(
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}