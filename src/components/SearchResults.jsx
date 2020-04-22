import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
const useStyles = makeStyles(theme => ({
  root: {
    width: 1000,
    marginTop: 20,
    marginLeft: 300,

    color: "black"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  column: {
    marginLeft: 30
  },
  total: {
    marginTop: 30,
    marginLeft: 350,
    display: "flex",
    alignItems: "center"
  },
  expanded: {
    backgroundColor: "#ffe8f0"
  },
  verse: {}
}));

const SearchResults = ({ results }) => {
  const classes = useStyles();

  //grouping results from same surah
  const groupResults = () => {
    let obj = results.reduce((r, a) => {
      r[a.surah.englishName] = r[a.surah.englishName] || [];
      r[a.surah.englishName].push(a);
      return r;
    }, Object.create(null));

    return Object.entries(obj);
  };

  return (
    <div>
      {results.length > 0 ? (
        <div className={classes.total}>
          <Chip color="secondary" label={groupResults().length + " Results"} />
        </div>
      ) : (
        ""
      )}
      {groupResults().map((res, index) => (
        <div className={classes.root} key={index}>
          <CustomExpansionPanel
            surahName={res[0]}
            text={res[1]}
            styleClass={classes}
          />
        </div>
      ))}
    </div>
  );
};

export const CustomExpansionPanel = ({ surahName, text, styleClass }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Chip
          variant="outlined"
          className={styleClass.column}
          color="secondary"
          label={surahName}
        />
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className={styleClass.expanded}>
        <List aria-label="verses">
          {text.map((verse, index) => (
            <ListItem key={index}>
              <ListItemText className={styleClass.verse} primary={verse.text} />
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default SearchResults;
