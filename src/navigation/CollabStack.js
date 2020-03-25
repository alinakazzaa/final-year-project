import { createStackNavigator } from 'react-navigation-stack';
import AllCollabs from '../screens/Collab/AllCollabs';
import AddCollab from '../screens/Collab/AddCollab';
import ViewCollab from '../screens/Collab/ViewCollab';
import ViewFetchJob from '../screens/FetchJob/ViewFetchJob';
import AllFetchJobs from '../screens/FetchJob/AllFetchJobs';
import AddFetchJob from '../screens/FetchJob/AddFetchJob';
import AllInfluencers from '../screens/Influencer/AllInfluencers';
import ViewInfluencer from '../screens/Influencer/ViewInfluencer';

export const CollabStack = createStackNavigator({
    AllFetchJobs: { screen: AllFetchJobs },
    ViewFetchJob: { screen: ViewFetchJob },
    AddFetchJob: { screen: AddFetchJob },
    AllInfluencers: { screen: AllInfluencers },
    ViewInfluencer: { screen: ViewInfluencer },
    AllCollabs: { screen: AllCollabs },
    ViewCollab: { screen: ViewCollab },
    AddCollab: { screen: AddCollab },
},
    {
        initialRouteName: 'AllCollabs'
    });