import React from 'react';
import socketIOClient from 'socket.io-client';

import getConfig from 'next/config';
import cogoToast from 'cogo-toast';
const {publicRuntimeConfig} = getConfig();
const {ENDPOINT_PORT} = publicRuntimeConfig;



//************************************************ */
// High Order Component that wraps around a page component 
//to recieve rows/socket/endpoint AKA connectivity to c++ and nodejs
//************************************************ */
function WithData(BaseComponent) {
  class App extends React.Component {
    _isMounted = false;

    constructor(props){
      super(props);

      var endpoint = "10.0.0.109:7070" //+ ENDPOINT_PORT;

      this.state = {
        data_cond_units: null,
        
        //null,
        data_zone: null,
        endpoint: endpoint,
        socket: socketIOClient(endpoint)
      };      
    }

    componentDidMount() {
        //_isMounted checks if the component is mounted before calling api to prevent memory leak
      this._isMounted = true;
      const { endpoint,socket } = this.state;
      console.log("MOUNTED");
      socket.on("FromC", async data => {
          if(this._isMounted) {
            try{
              var json = await JSON.parse(data);
              this.setState({ condUnitData: json.cond_unitsData, zoneData: json.zonesData, data_json: json });
              
            }
            catch(error){
              console.log(error);
            }
          }
      }); 
    }

    componentWillUnmount(){
        this._isMounted = false;
        const {socket} = this.state;
        socket.disconnect();
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  }

  return App;
}

//export default WithData;

const WithDataComp = ({children, ...props}) => children(props);
export default WithData(WithDataComp);