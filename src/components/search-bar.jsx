import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function SearchBar({onChange}) {
  return (
    <TextField
        className='search-bar'
        onChange={onChange}
        id="input-with-icon-textfield"
        label="Search Game"
        placeholder='Search Game'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
  );
}