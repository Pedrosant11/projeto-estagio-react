import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '999px', 
    backgroundColor: theme.palette.grey[800], 
    color: '#FFF',
    height: '40px', 
  },
  '& .MuiInputBase-root .MuiSelect-icon': {
    color: '#FFF', 
  },
  '& .MuiInputBase-root .MuiInputLabel-root': {
    color: '#FFF', 
  },
}));

export default function GenreSelect({ genres, onChange }) {
  const [value, setValue] = useState('all');

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Box className="genre-select">
      <StyledFormControl sx={{ m: 1, minWidth: 85 }} size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label=""
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value="all">All</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>
  );
}
