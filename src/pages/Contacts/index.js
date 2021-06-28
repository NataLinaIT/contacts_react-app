import { useState } from "react";
import { useContacts } from "./useContacts";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { ContactsTable } from "./ContactsTable/ContactsTable";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { DATA_VIEW_MODES } from "./constants";
import { useDataVieMode } from "./useDataViewMode";
import ContactFilters from "../ContactsFilters/index";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
    filtersContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);

const FiltersDefaultValues = {
  fullname: "",
  gender: "all",
  nationality: "all",
};

const filterByFullname = ({ first, last }, fullname) => {
  return (
    first?.toLowerCase().includes(fullname.toLowerCase()) ||
    last?.toLowerCase().includes(fullname.toLowerCase())
  );
};

const filterByGender = (value, gender) => {
  if (gender === "all") {
    return true;
  }
  return value === gender;
};

const filterByNationality = (value, nationality) => {
  if (nationality === "all") {
    return true;
  }
  return value === nationality;
};

export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataVieMode();

  const [filters, setFilters] = useState(FiltersDefaultValues);

  const updateFilter = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(FiltersDefaultValues)
  }

  const filteredContacts = contacts.data
    .filter((c) => filterByFullname(c.name, filters.fullname))
    .filter((c) => filterByGender(c.gender, filters.gender))
    .filter((c) => filterByNationality(c.nat, filters.nationality));

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h4">
              Contacts
            </Typography>
            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode}
            />
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.filtersContainer}>
          <ContactFilters filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} />
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress data-testid="contacts-loader" />;
            }
            if (contacts.isError) {
              return <div data-testid="contacts-error">... error</div>;
            }
            if (dataViewMode === DATA_VIEW_MODES.TABLE) {
              return <ContactsTable data={filteredContacts} />;
            }
            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return <div data-testid="contacts-grid-container">grid</div>;
            }

            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
