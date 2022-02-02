import React, {useRef, useState, useEffect, createContext} from 'react';
import {makeStyles, CircularProgress} from '@material-ui/core';


import cogoToast from 'cogo-toast';

import Zones from '../../js/Zones';
import ConditioningUnits from '../../js/ConditioningUnits';

import Util from  '../../js/Util';
import ZoneViewContainer from './ZoneView/ZoneViewContainer';
import WithData from '../Machine/WithData';

export const MainContext = createContext(null);


const MainContainer = function(props) {
  const {user, condUnitData, zoneData, data_json} = props;

  const [zoneDBData, setZoneDBData] = useState(null);
  const [zoneDBDataRefetch, setZoneDBDataRefetch] = useState(false);
  const [condUnitDBData, setCondUnitDBData] = useState(null);
  const [condUnitDBDataRefetch, setCondUnitDBDataRefetch] = useState(false);

  const classes = useStyles();
  
  const [refreshView, setRefreshView] = React.useState(null);

  useEffect(()=>{
    if(zoneDBData ==null || zoneDBDataRefetch){
      if(zoneDBDataRefetch){
        setZoneDBDataRefetch(false);
      }

      Zones.getZoneData()
      .then( data => { 
        setZoneDBData(data);
      })
      .catch( error => {
          console.warn(error);
          cogoToast.error(`Internal Server Error`, {hideAfter: 4});
      });

    }
    
  },[zoneDBData, zoneDBDataRefetch]);

  useEffect(()=>{
    if(condUnitDBData ==null || condUnitDBDataRefetch){
      if(condUnitDBDataRefetch){
        setCondUnitDBDataRefetch(false);
      }

      ConditioningUnits.getCondUnitData()
      .then( data => { 
        setCondUnitDBData(data);
      })
      .catch( error => {
          console.warn(error);
          cogoToast.error(`Internal Server Error`, {hideAfter: 4});
      });

    }
    
  },[condUnitDBData, condUnitDBDataRefetch]);

  useEffect(()=>{
    //This is to refresh view for after making changes
    //, when we dont have direct access to state that needs to be refetched
    if(refreshView){
      // switch(refreshView){
      //   case 'calendar':
      //     break;
      //   case 'taskList':
      //     break;
      //   case 'map':
      //     break;
      //   case 'crew':
      //     break;
      //   case 'allTasks':
      //     break;
      // } 
      setRefreshView(null);
    }
  },[refreshView]) 


  return (
    <div className={classes.root}>
      <MainContext.Provider value={{refreshView, setRefreshView, user, zoneDBData, setZoneDBDataRefetch,
           condUnitDBData,  setCondUnitDBDataRefetch} } >
        <WithData>
          {({condUnitData, zoneData,data_json})=>(
              React.useMemo(()=> { return <ZoneViewContainer condUnitData={condUnitData} zoneData={zoneData}  />} ,[data_json]) //can make not render if data_json doesnt change
          )}
        </WithData>
          
      </MainContext.Provider>
    </div>
  );
}

export default MainContainer

const useStyles = makeStyles(theme => ({
  root:{
    margin: '0',
  },
  test:{
    padding: '10px',
  }
}));
