import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ISelectAutoWidth {
  price?: string;
  handleChange: (value: string) => void;
}

export const SelectAutoWidth: React.FC<ISelectAutoWidth> = ({
  price,
  handleChange,
}) => {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={price}
          autoWidth
          label="Age"
        >
          <MenuItem value={price}>Цене</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
