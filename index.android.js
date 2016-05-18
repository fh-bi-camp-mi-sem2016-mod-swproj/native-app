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
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import PraferenzScreen from './screens/PraeferenzScreen'
import FreundesScreen from './screens/FreundesScreen'
import HauptMenueScreen from './screens/HauptMenueScreen'

class findme extends Component {

    _renderScene(route , navigator) {
        var globalNavigatorProps = {
            navigator
        };
        switch (route.ident) {
            case "Login":
                return [
                    <LoginScreen {...globalNavigatorProps} />
               ];
            case "Haupt":
                return [
                    <HauptMenueScreen {...globalNavigatorProps} />
                ];
            case "Admin":
                return [
                    <AdminScreen {...globalNavigatorProps} />
                ];
            case "Profile":
                return [
                    <ProfileScreen {...globalNavigatorProps} />
                ];
            case "Praeferenz":
                return [
                    <PraferenzScreen {...globalNavigatorProps} />
                ];
            case "Freundes":
                return [
                    <FreundesScreen {...globalNavigatorProps} />
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
