import React from "react";
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ onChangeInputHandler, placeholder }) => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      placeholder={placeholder}
      onChange={onChangeInputHandler}
    />
  );
};

export default SearchBox;
