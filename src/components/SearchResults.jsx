import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Badge from "@material-ui/core/Badge";

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
    marginLeft: 400,
    display: "flex",
    alignItems: "center"
  },

  desc: {
    fontStyle: "italic",
    fontFamily: "Monospace"
  }
}));

const SearchResults = ({ results }) => {
  const classes = useStyles();

  return (
    <div>
      {results.length > 0 ? (
        <div className={classes.total}>
          <Typography>Total Results</Typography>
          <Badge
            color="secondary"
            className={classes.totalNo}
            badgeContent={results.length}
          />
        </div>
      ) : (
        ""
      )}
      {results.map((res, index) => (
        <div className={classes.root} key={index}>
          <CustomExpansionPanel
            surahName={res.surah.englishName}
            text={res.text}
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

      <ExpansionPanelDetails>
        <Typography className={styleClass.desc}>{text}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default SearchResults;
