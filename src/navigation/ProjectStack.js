import { createStackNavigator } from 'react-navigation-stack';
import AllProjects from '../screens/Project/AllProjects';
import AddProject from '../screens/Project/AddProject';
import EditProject from '../screens/Project/EditProject';
import ViewProject from '../screens/Project/ViewProject';
import AllCollabs from '../screens/Collab/AllCollabs';
import AddCollab from '../screens/Collab/AddCollab';
import EditCollab from '../screens/Collab/EditCollab';
import ViewCollab from '../screens/Collab/ViewCollab';
import ViewFetchJob from '../screens/FetchJob/ViewFetchJob';
import AllFetchJobs from '../screens/FetchJob/AllFetchJobs';
import AddFetchJob from '../screens/FetchJob/AddFetchJob';
import AllInfluencers from '../screens/Influencer/AllInfluencers';
import ViewInfluencer from '../screens/Influencer/ViewInfluencer';

export const ProjectStack = createStackNavigator({
    AllProjects: { screen: AllProjects },
    ViewProject: { screen: ViewProject },
    AddProject: { screen: AddProject },
    EditProject: { screen: EditProject },
    AllFetchJobs: { screen: AllFetchJobs },
    ViewFetchJob: { screen: ViewFetchJob },
    AddFetchJob: { screen: AddFetchJob },
    AllInfluencers: { screen: AllInfluencers },
    ViewInfluencer: { screen: ViewInfluencer },
    AllCollabs: { screen: AllCollabs },
    ViewCollab: { screen: ViewCollab },
    AddCollab: { screen: AddCollab },
    EditCollab: { screen: EditCollab },
},
    {
        initialRouteName: 'AllProjects'
    });