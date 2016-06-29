/**
 * Created by Dennis on 17.05.2016.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {AppRegistry, Text, Component, Navigator, StyleSheet} from 'react-native';
import ViewContainer from  './components/frontend/ViewContainer'
import StatusBarBackground from  './components/frontend/StatusBarBackground'
import AdminScreen from './screens/AdminScreen'
import AdminOpenCasesScreen from './screens/AdminOpenCasesScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import PreferenceScreen from './screens/PreferenceScreen'
import FriendScreen from './screens/FriendScreen'
import MainScreen from './screens/MainScreen'
import SearchScreen from './screens/SearchScreen'
import MessageScreen from './screens/MessageScreen'
import RegisterScreen from './screens/RegisterScreen'
import NewMessageScreen from './screens/NewMessageScreen'
import PictureScreen from './screens/PictureScreen'
import ShowProfileScreen from './screens/ShowProfileScreen'

class findme extends Component {

    _renderScene(route , navigator) {
        var globalNavigatorProps = {
            navigator
        };
        switch (route.ident) {
            case "Login":
                return [
                    <LoginScreen key="login" {...globalNavigatorProps} />
               ];
            case "Main":
                return [
                    <MainScreen key="main" {...globalNavigatorProps} />
                ];
            case "Admin":
                return [
                    <AdminScreen key="admin" {...globalNavigatorProps} />
                ];
            case "AdminOpenCases":
                return [
                    <AdminOpenCasesScreen {...globalNavigatorProps} />
                ];
            case "Profile":
                return [
                    <ProfileScreen key="profile" {...globalNavigatorProps} />
                ];
            case "Preference":
                return [
                    <PreferenceScreen key="preferences" {...globalNavigatorProps} />
                ];
            case "Friend":
                return [
                    <FriendScreen key="friend" {...globalNavigatorProps} />
                ];
            case "UserSearch":
                return [
                    <SearchScreen key="search" {...globalNavigatorProps} />
                ];
            case "Message":
                return [
                    <MessageScreen key="message" {...globalNavigatorProps} />
                ];
            case "NewMessage":
                return [
                    <NewMessageScreen key ="newmessage" {...globalNavigatorProps} />
                ];
            case "Register":
                return [
                    <RegisterScreen key="register" {...globalNavigatorProps} />
                ];
            case "Picture":
                return [
                    <PictureScreen key="picture" {...globalNavigatorProps} />
                ];
            case "ShowProfileScreen":
                return [
                    <ShowProfileScreen key="showprofile" {...globalNavigatorProps} />
                ];
            //More Cases
            default:
                return (
                    <ViewContainer>
                        <StatusBarBackground/>
                        <Text> {`Something went Wrong ${route}`}</Text>
                    </ViewContainer>

                )
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ident:"Login"}}
                ref="appNavigator"
                style={styles.navigatorStyles}
                renderScene={ this._renderScene } />
        )
    }
}

const styles = React.StyleSheet.create({

    navigatorStyles: {

    }
});

AppRegistry.registerComponent('findme', () => findme);
