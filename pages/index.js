import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

import MainLayout from '../components/Layouts/Main';

//import LightsUi from '../components/LightsUi/LightsUi';
//import WithData from '../components/Machine/WithData';
import withAuth from '../server/lib/withAuth';

import MainContainer from '../components/Main/MainContainer';
import ReconnectSnack from '../components/UI/ReconnectSnack';
//import ModeSettingsModal from '../components/Settings/ModeSettingsModal';

const Index = function (props ) {
  const { endpoint, socket, settings, user} = props;
  console.log("Props", props);
    return (
        <MainLayout>
            {/* <ReconnectSnack data_lights={data_lights} data_switch={data_switch} socket={socket} />
            


            <LightsUi data_lights={data_lights} data_switch={data_switch} socket={socket} endpoint={endpoint}/> */}
            <MainContainer user={user}/>
            
        </MainLayout>
    );
}

//does work when were being passed props 
Index.getInitialProps = async ({ query }) => ({ settings: query.settings });

Index.propTypes = {
  settings: PropTypes.shape({
    results: PropTypes.array.isRequired,
  }),
};

Index.defaultProps = {
  settings: null,
};

export default withAuth(Index);
//export default WithData(Index);