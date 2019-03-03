import Profile from './profile';
import DrawerNavigator from 'react-navigation';


export default DrawerNavigator({
  Page1: {
    screen: Profile
  },
  Page2: {
    screen: Profile
  },
  Page3: {
    screen: Profile
  }
}, {
  drawerWidth: 300
});