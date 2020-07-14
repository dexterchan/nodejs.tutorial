/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutocompleteBox = ({ value, onChange, shortlist }) => {
  return (
    <Autocomplete
      id="free-solo-2-demo"
      disableClearable
      options={shortlist}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Market Data Code"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      )}
    />
  );
};

export default AutocompleteBox;
