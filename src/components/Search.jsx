import React, { useState } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import SearchResults from "./SearchResults";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 450,
    marginTop: 20,
    marginLeft: 600,
    color: "grey"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const SearchBar = () => {
  const classes = useStyles();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);

  const handleSearch = () => {
    searchByKeyword(searchKeyword)
      .then(res => {
        setSearchResponse(res.data.matches);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
          placeholder="Search The Holy Quran By keyword"
          onChange={e => setSearchKeyword(e.target.value)}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <Button onClick={handleSearch} color="secondary">
          <SearchIcon />
        </Button>
      </Paper>
      <SearchResults results={searchResponse ? searchResponse : null} />
    </div>
  );
};

const searchByKeyword = keyword =>
  axios({
    url: `http://api.alquran.cloud/v1/search/${keyword}/all/en`,
    method: "GET"
  })
    .then(response => response.data)
    .catch(err => console.log(err));

export default SearchBar;
