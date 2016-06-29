/**
 * Created by Dennis on 17.05.2016.
 */

import React, {AppRegistry, Text, Component, Navigator, StyleSheet} from 'react-native';
import ViewContainer from  './components/frontend/ViewContainer'
import AdminOpenCasesScreen from './screens/AdminOpenCasesScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AdminScreen from './screens/AdminScreen'
import ChangeProfileScreen from './screens/ChangeProfileScreen'
import PreferenceScreen from './screens/PreferenceScreen'
import MainScreen from './screens/MainScreen'
import FriendScreen from './screens/FriendScreen'
import SearchScreen from './screens/SearchScreen'
import MessageInScreen from './screens/MessageInScreen'
import NewMessageScreen from './screens/NewMessageScreen'
import MessageOutScreen from './screens/MessageOutScreen'

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
            case "ChangeProfile":
                return [
                    <ChangeProfileScreen key="changeprofile" {...globalNavigatorProps} />
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
            case "Inbox":
                return [
                    <MessageInScreen key="inbox" {...globalNavigatorProps} />
                ];
            case "NewMessage":
                return [
                    <NewMessageScreen key="newmessage" {...globalNavigatorProps} />
                ];
            case "Outbox":
                return [
                    <MessageOutScreen key="outbox" {...globalNavigatorProps} />
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
