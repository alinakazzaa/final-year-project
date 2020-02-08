import { createStackNavigator } from 'react-navigation-stack';
import LogInScreen from '../screens/Auth/LogIn';
import RegistrationScreen from '../screens/Auth/Registration';
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
import HomeScreen from '../screens/Home/Home'

export const ApplicationStack = createStackNavigator({
    LogIn: { screen: LogInScreen },
    Registration: { screen: RegistrationScreen },
    Home: { screen: HomeScreen },
    // AllProjects: { screen: AllProjects },
    // ViewProject: { screen: ViewProject },
    // AddProject: { screen: AddProject },
    // EditProject: { screen: EditProject },
    // AllFetchJobs: { screen: AllFetchJobs },
    // ViewFetchJob: { screen: ViewFetchJob },
    // AddFetchJob: { screen: AddFetchJob },
    // AllInfluencers: { screen: AllInfluencers },
    // ViewInfluencer: { screen: ViewInfluencer },
    // AllCollabs: { screen: AllCollabs },
    // ViewCollab: { screen: ViewCollab },
    // AddCollab: { screen: AddCollab },
    // EditCollab: { screen: EditCollab },
},
    {
        initialRouteName: 'LogIn'
    });


