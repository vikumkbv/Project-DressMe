import {createStackNavigator,createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const LoginNavigator = createStackNavigator({
    Login: Login,
    Signup: Signup,
}, {headerMode: 'none'});

export default createAppContainer(LoginNavigator);