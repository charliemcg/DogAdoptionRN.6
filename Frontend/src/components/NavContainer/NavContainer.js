import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../../screens/Splash';
import Home from '../../screens/Home';
import DogProfile from '../../screens/DogProfile';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import Favorites from '../../screens/Favorites';
import UnderConstruction from '../../screens/UnderConstruction';
import Filter from '../../screens/Filter';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import Messages from '../../screens/Messages';
import UserProfile from '../../screens/UserProfile';
import colors from '../../colors';
import strings from './strings';

const Stack = createStackNavigator(
  {
    // Splash: {
    //   screen: Splash,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: strings.appName,
        headerTitleStyle: {
          fontSize: 17,
        },
        headerBackTitle: strings.back,
      },
    },
    DogProfile,
    SignIn,
    SignUp,
    PrivacyPolicy,
    Filter,
    UserProfile,
    UnderConstruction,
    Favorites,
    Messages,
  },
  {
    // styling the header for each screen
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.contrast,
    },
  },
);

export default NavContainer = createAppContainer(Stack);
