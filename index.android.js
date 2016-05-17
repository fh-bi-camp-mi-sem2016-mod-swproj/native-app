/**
 * Created by Dennis on 17.05.2016.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {AppRegistry, Component, Navigator, StyleSheet} from 'react-native';
import AdminScreen from './screens/AdminScreen'
import LoginScreen from './screens/LoginScreen'

class findme extends Component {

    _renderScene(route , navigator) {
        var globalNavigatorProps = {
            navigator
        }
        switch (route.ident) {
//            case "Login":
//                return [
//                    <LoginScreen {...globalNavigatorProps} />
//                ]
            case "Admin":
                return [
                    <AdminScreen {...globalNavigatorProps} />
                ]
            //More Cases
            default:
                return [
                    <LoginScreen {...globalNavigatorProps} />
                ]
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ident:"LoginScreen"}}
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
