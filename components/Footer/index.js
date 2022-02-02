import React from "react";
import { makeStyles } from '@material-ui/core/styles';


const StyledFooter = (props) => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: '15px',
      background: '#3b8182',
      color: '#f5f5f5',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '-webkit-fill-available',
      marginBottom: '0px',
      boxShadow: 'inset 0px 4px 4px #275c5d',
    },
  }));

  const classes = useStyles();

  return(<div className={classes.root}>Rainey Electronics - AC/HEAT</div>);

}

export default StyledFooter;