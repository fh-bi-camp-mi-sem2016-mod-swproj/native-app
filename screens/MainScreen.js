/**
 * Created by Dennis on 18.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';
import ButtonContainer from '../components/frontend/ButtonContainer'

class MainScreen extends Component {

    constructor(props) {
        super(props);

        mainInstanz = this;
    }


    render() {
        return (
             <ViewContainer>

                 <Icon.ToolbarAndroid
                     style={styles.toolbarView}
                     actions={[
                        {title: 'Profile', iconName:'user', iconSize: 30,  show: 'always'},
                        {title: 'Posteingang', iconName:'envelope', iconSize: 30,  show: 'always'},
                        {title: 'Preference', iconName:'heart', iconSize: 30,  show: 'always'},
                        {title: 'Friends', iconName:'users', iconSize: 30,  show: 'always'},
                        {title: 'Log Out', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                     onActionSelected={this._onActionSelected}
                 />
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Welcome to Find.me
                        </Text>
                        <Text style={styles.titleText}>
                            Mainmenue:
                        </Text>
                    </View>
                 <ButtonContainer>
                     <TouchableHighlight onPress={(event) => this._navigateToProfileScreen()}>
                         <Text style={styles.btnText}> Zum Profile </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                 <ButtonContainer>
                     <TouchableHighlight onPress={(event) => this._navigateToMessageScreen()}>
                         <Text style={styles.btnText}> Posteingang </Text>
                     </TouchableHighlight>
                 </ButtonContainer>

                 <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateTopPeferenceScreen()}>
                        <Text style={styles.btnText}> Zu den Praeferenzen </Text>
                    </TouchableHighlight>
                 </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToFriendScreen()}>
                        <Text style={styles.btnText}> Zum FreundesKreis </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                 <ViewContainer>
                     
                 </ViewContainer>
             </ViewContainer>
        );
    }
    _navigateToLoginScreen(){
        this.props.navigator.push({
            ident: "Login"
        })
    }
    _navigateBackToLoginScreen(){
        this.props.navigator.pop({
            ident: "Login"
        })
    }
    _navigateToFriendScreen(){
        this.props.navigator.push({
            ident: "Friend"
        })
    }
    _navigateTopPeferenceScreen(){
        this.props.navigator.push({
            ident: "Preference"
        })
    }
    _navigateToProfileScreen(){
        this.props.navigator.push({
            ident: "Profile"
        })
    }
    _navigateToMessageScreen(){
        this.props.navigator.push({
            ident: "Message"
        })
    }

    _onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            mainInstanz._navigateToProfileScreen();
        }
        if (position === 1) {
            mainInstanz._navigateToMessageScreen();
        }
        if (position === 2) {
            mainInstanz._navigateToProfileScreen();
        }
        if (position === 3) {
            mainInstanz._navigateToFriendScreen();
        }
        if (position === 4) {
            Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
            mainInstanz._navigateBackToLoginScreen();
        }
    }
}

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:30,
        paddingBottom: 10
    },

    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center'
    },

    btnText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    text: {
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    },
    toolbarView: {
        height: 50,
        marginRight: 125
    }
});

module.exports = MainScreen;