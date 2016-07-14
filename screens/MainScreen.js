/**
 * Created by Dennis on 18.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';
import ButtonContainer from '../components/frontend/ButtonContainer'

import User from './../components/backend/User'

class MainScreen extends Component {

    constructor(props) {
        super(props);

        instance = this;
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
                        {title: 'Picture', iconName:'picture-o', iconSize: 30,  show: 'always'},
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
                    <TouchableHighlight onPress={(event) => this._navigateToChangeProfileScreen()}>
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

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToPictureScreen()}>
                        <Text style={styles.btnText}> Zum Bilder hochladen </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToShowProfileScreen()}>
                        <Text style={styles.btnText}> Profil anzeigen </Text>
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
    _navigateToChangeProfileScreen(){
        this.props.navigator.push({
            ident: "ChangeProfile"
        })
    }
    _navigateToMessageScreen(){
        this.props.navigator.push({
            ident: "Inbox"
        })
    }
    _navigateToPictureScreen() {
        this.props.navigator.push({
            ident: "Picture"
        })
    }

    _navigateToShowProfileScreen() {
        User.getInstance().tag.profileForShowProfile = User.getInstance().currentUSER.profile;
        this.props.navigator.push({
            ident: "ProfileScreen"
        })
    }

    _onActionSelected(position) {
        switch (position) {
            case 0:
                instance._navigateToChangeProfileScreen();
                break;
            case 1:
                instance._navigateToMessageScreen();
                break;
            case 2:
                instance._navigateToChangeProfileScreen();
                break;
            case 3:
                instance._navigateToFriendScreen();
                break;
            case 4:
                instance._navigateToPictureScreen();
                break;
            case 5:
                Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
                instance._navigateBackToLoginScreen();
                break;
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
        marginRight: 50
    }
});

module.exports = MainScreen;