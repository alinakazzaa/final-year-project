import { createStackNavigator } from 'react-navigation-stack';
import AllCollabs from '../screens/Collab/AllCollabs';
import AddCollab from '../screens/Collab/AddCollab';
import EditCollab from '../screens/Collab/EditCollab';
import ViewCollab from '../screens/Collab/ViewCollab';
import ViewInfluencer from '../screens/Influencer/ViewInfluencer';

export const CollabStackNavigator = createStackNavigator({
    ViewInfluencer: { screen: ViewInfluencer },
    AllCollabs: { screen: AllCollabs },
    ViewCollab: { screen: ViewCollab },
    AddCollab: { screen: AddCollab },
    EditCollab: { screen: EditCollab },
},
    {
        initialRouteName: 'AllCollabs'
    }
);