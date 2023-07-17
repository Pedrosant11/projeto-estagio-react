import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '999px', 
    backgroundColor: theme.palette.grey[800], 
    color: '#FFF', 
    height: '40px',
  },
  '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent', 
  },
}));

export default function SearchBar({ onChange }) {
  return (
    <StyledTextField
      className="search-bar"
      onChange={onChange}
      id="input-with-icon-textfield"
      placeholder="Search Game"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
}
