import React from "react";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { NATIONALITIES_HUMAN_NAME } from "../../constants/nationality";

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldsContainer: {
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(2),
      },
    },
    fieldGender: {
      minWidth: 120,
    },
    fieldNationality: {
      minWidth: 140,
    },
  })
);

export default function ContactFilters({
  filters,
  updateFilter,
  clearFilters,
}) {
  let classes = useStyles();

  const handleChangeFilter = (event) => {
    updateFilter(event.target.name, event.target.value);
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" className={classes.fieldsContainer}>
        <TextField
          name="fullname"
          label="Fullname"
          variant="outlined"
          value={filters.fullname}
          onChange={handleChangeFilter}
          placeholder="Search by fullname"
        />
        <FormControl variant="outlined" className={classes.fieldGender}>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            id="demo-simple-select"
            value={filters.gender}
            onChange={handleChangeFilter}
            label="Gender"
            name="gender"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.fieldNationality}>
          <InputLabel id="nationality">Nationality</InputLabel>
          <Select
            labelId="nationality"
            id="demo-simple-select"
            value={filters.nationality}
            onChange={handleChangeFilter}
            label="Nationality"
            name="nationality"
          >
            <MenuItem value="all">All</MenuItem>
            {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, name]) => (
              <MenuItem value={key} key={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button size="small" startIcon={<ClearIcon />} onClick={clearFilters}>
        Clear
      </Button>
    </Box>
  );
}

ContactFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};
