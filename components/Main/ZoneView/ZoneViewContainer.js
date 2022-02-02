import React, {useRef, useState, useEffect, createContext, useContext} from 'react';
import {makeStyles, CircularProgress} from '@material-ui/core';


import cogoToast from 'cogo-toast';

import Util from  '../../../js/Util';
import { MainContext } from '../MainContainer';


export const ZoneViewContext = createContext(null);


const ZoneViewContainer = function(props) {

  const {zoneData, condUnitData} = props;
  const {refreshView, setRefreshView, user, zoneDBData, setZoneDBDataRefetch,
    condUnitDBData,  setCondUnitDBDataRefetch} = useContext(MainContext);
 
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <ZoneViewContext.Provider value={{} } >
            <div className={classes.zvContainer}>
              <div className={classes.lines}>
                  <div className={classes.linesLBDivContainer}>
                    <div className={classes.linesDiv}>
                      
                      {zoneDBData?.map((zone)=>{
                       
                        return  <div className={classes.lineLightBlue}></div>
                      })}
                      {condUnitDBData?.map((condUnit)=>{

                        return <div className={classes.lineLightBlue}></div>
                      })}
                    </div>
                  </div>
                  <div className={classes.linesBDivContainer}>
                    <div className={classes.linesDiv}>
                      {zoneDBData?.map((zone)=>{
                       
                        return  <div className={classes.lineBlue}></div>
                      })}
                      {condUnitDBData?.map((condUnit)=>{

                        return <div className={classes.lineBlue}></div>
                      })}
                    </div>
                  </div>
                  <div className={classes.linesRDivContainer}>
                    <div className={classes.linesDiv}>
                      {zoneDBData?.map((zone)=>{
                       
                        return  <div className={classes.lineRed}></div>
                      })}
                      {condUnitDBData?.map((condUnit)=>{

                        return <div className={classes.lineRed}></div>
                      })}
                    </div>
                  </div>
                  <div className={classes.linesLRDivContainer}>
                    <div className={classes.linesDiv}>
                      {zoneDBData?.map((zone)=>{
                       
                        return  <div className={classes.lineLightRed}></div>
                      })}
                      {condUnitDBData?.map((condUnit)=>{

                        return <div className={classes.lineLightRed}></div>
                      })}
                    </div>
                  </div>
              </div>
              <div className={classes.rectangeChiller1}>
                <div className={classes.rectangeChiller1Inside}>
                     {zoneDBData?.map((zone)=>{
                       
                      return  <div key={zone.array_index} className={classes.unitBox}><div className={classes.unitBoxSpan}>Z{zone.id}</div></div>
                    })}

                    {condUnitDBData?.map((condUnit)=>{

                      return <div key={condUnit.array_index} className={classes.unitBox}><div className={classes.unitBoxSpan}>C{condUnit.id}</div></div>
                    })}
                </div>
              </div>
              <div className={classes.rectangeChiller2}></div>

              <div className={classes.rectangeZone}>
                <div className={classes.rectangeZoneInside}>
                    {zoneDBData?.map((zone)=>{

                      return <div key={zone.array_index} className={classes.zoneBox}><div className={classes.zoneBoxSpan}>Z{zone.id}</div></div>
                    })}

                    {condUnitDBData?.map((condUnit)=>{

                      return <div key={condUnit.array_index} className={classes.zoneBox}><div className={classes.zoneBoxSpan}>C{condUnit.id}</div></div>
                    })}
                    
                </div>
              </div>
              <div className={classes.rectangeHeater1}></div>
              <div className={classes.rectangeHeater2}></div>
            </div>
      </ZoneViewContext.Provider>
    </div>
  );
}

export default ZoneViewContainer

const useStyles = makeStyles(theme => ({
  root:{
    
    margin: '10px 0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    padding: '15px',
  },
  zvContainer:{
    width: '1500px',
    height: '350px',
    position: 'relative',
    textAlign: 'center',
    
  },
  

  //ZONE CSS
  rectangeZone:{
    position: 'absolute',
    top: '90px',
    left: '0px',
    width: '1500px',
    height: '50px',
    background: '#fff0',
    display: 'flex',
    alignItems: 'center',
  },
  rectangeZoneInside:{
    position: 'relative',
    width: '100%',
    background: '#fff50',
    zIndex: '100',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  
  zoneBox:{
    width: '45px',
    height: '45px',
    background: '#00ff33',
    border: '1px solid #11aa22',
    //transform: 'rotate(45deg)'
    borderRadius: '25px',

  },
  zoneBoxSpan:{
    width: '100%',
    height: '100%',
    //transform: 'rotate(-45deg)',
  },
  //end of zone
  //LINES
  lines:{
    position: 'absolute',
    top: 0,
    width: '1500px',
    height: '350px',
    zIndex: '0',
  },
  linesLBDivContainer:{
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1500px',
    height: '137px',
    background: '#ffffff00',
    display: 'flex',
    alignItems: 'center',
  },
  linesBDivContainer:{
    position: 'absolute',
    top: '45px',
    left: '0px',
    width: '1500px',
    height: '92px',
    background: '#ffffff00',
    display: 'flex',
    alignItems: 'center',
  },
  linesLRDivContainer:{
    position: 'absolute',
    top: '137px',
    left: '0px',
    width: '1500px',
    height: '137px',
    background: '#ffffff00',
    display: 'flex',
    alignItems: 'center',
  },
  linesRDivContainer:{
    position: 'absolute',
    top: '137px',
    left: '0px',
    width: '1500px',
    height: '92px',
    background: '#ffffff00',
    display: 'flex',
    alignItems: 'center',
  },
  linesDiv:{
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#ffffff00',
    zIndex: '100',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  lineLightBlue:{
    //width needs to equal 45px
    width: '5px',
    height: '100%',
    margin: '0px 25px 0px 15px',
    background: '#71c8ff',
  },
  lineBlue:{
    //width needs to equal 45px
    width: '5px',
    height: '100%',
    margin: '0px 15px 0px 25px',
    background: '#146da5',
  },
  lineLightRed:{
    //width needs to equal 45px
    width: '5px',
    height: '100%',
    margin: '0px 25px 0px 15px',
    background: '#ff6072',
  },
  lineRed:{
    //width needs to equal 45px
    width: '5px',
    height: '100%',
    margin: '0px 15px 0px 25px',
    background: '#bb2233',
  },
  //END OF LINES
  unitBox:{
    width: '25px',
    height: '25px',
    margin: '0px 10px',
    background: '#fff',
    //transform: 'rotate(45deg)'
  },
  unitBoxSpan:{
    width: '100%',
    height: '100%',
    //transform: 'rotate(-45deg)',
  },
  rectangeChiller1:{
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1500px',
    height: '40px',
    background: '#71c8ff',
    display: 'flex',
    alignItems: 'center',
  },
  rectangeChiller1Inside:{
    position: 'relative',
    width: '100%',
    background: '#fff50',
    zIndex: '100',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  rectangeChiller2:{
    position: 'absolute',
    top: '45px',
    left: '0px',
    width: '1500px',
    height: '40px',
    background: '#146da5',
  },
  rectangeHeater1:{
    position: 'absolute',
    top: '200px',
    left: '0px',
    width: '1500px',
    height: '40px',
    background: '#bb2233',
  },
  rectangeHeater2:{
    position: 'absolute',
    top: '245px',
    left: '0px',
    width: '1500px',
    height: '40px',
    background: '#ff6072',
  }
}));
