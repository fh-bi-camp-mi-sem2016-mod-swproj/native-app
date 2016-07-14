/**
 * Created by Dennis on 20.06.2016.
 */
import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

import Database from './../components/backend/Database'
import User from './../components/backend/User'

var instance = null;

class NewMessageScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;
    }

    state = {
        title: '',
        message: ''
    };

    render() {
        return (
            <ViewContainer>

                <Icon.ToolbarAndroid
                    style={styles.toolbarView}
                    actions={[
                        {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                        {title: 'MessageOut', iconName:'inbox', iconSize: 30,  show: 'always'},
                        {title: 'Home', iconName:'home', iconSize: 30,  show: 'always'},
                        {title: 'Logout', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Neue Nachricht:
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Title:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={title => this.setState({title})}
                        placeholder="Title">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Nachricht:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={message => this.setState({message})}
                        placeholder="Nachricht">
                    </TextInput>
                </View>
                <ViewContainer>

                </ViewContainer>
                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._createNewMessage(this.state.title, this.state.message)}>
                        <Text style={styles.btnText}> Senden </Text>
                    </TouchableHighlight>
                </ButtonContainer>

            </ViewContainer>
        );
    }

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }

    _navigateBackToMessageScreen() {
        this.props.navigator.pop({
            ident: "Inbox"
        })
    }

    _navigateToLogInScreen() {
        this.props.navigator.push ({
            ident: "Login"
        })
    }

    _navigateToMessageOutScreen() {
        this.props.navigator.push ({
            ident: "Outbox"
        })
    }

    _onActionSelected(position) {
        switch (position) {
            case 0:
                instance._navigateBackToMessageScreen();
                break;
            case 1:
                instance._navigateToMessageOutScreen();
                break;
            case 2:
                instance._navigateToMainMenue();
                break;
            case 3:
                lert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
                instance._navigateToLogInScreen();
                break;
        }
    }

    _createNewMessage(pTitle, pMessage) {
        var db = Database.getInstance();

        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    Alert.alert('Benutzer', "Der Benutzer existiert nicht", [{text: 'ok'}]);

                } else if (data.length >= 1) {

                    var callbacksCreate = {
                        success: function (data) {
                            console.log(data);
                        },
                        error: function (error) {
                            console.log(error);
                            Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
                        }
                    };

                    var now = new Date().getTime();

                    var newMessage = {
                        doctype: "msg",
                        timestamp: now,
                        from: User.getInstance().currentUSER.profile._id,
                        to: User.getInstance().tag.profileForNewMessage,
                        title: pTitle,
                        content: pMessage,
                        archivedFrom: false,
                        archivedTo: false,
                        deletedFrom: false,
                        deletedTo: false
                    };

                    db.msg.create(newMessage, callbacksCreate);
                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        if ( pTitle == null ) {
            Alert.alert('Fehler', "Kein Username eingegeben" , [{text: 'ok'}]);
        }
        else if ( pMessage == null ) {
            Alert.alert('Fehler', "Keine Nachricht eingegeben" , [{text: 'ok'}]);
        }
        else {
            db.profile.findById(User.getInstance().tag.profileForNewMessage, callbacks);
        }
    }
}

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:30,
        paddingBottom: 30
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center'
    },
    inputContainerView: {
        flexDirection: 'row',
        marginTop: 10
    },
    input: {
        height: 30,
        padding: 4,
        marginRight: 50,
        flex: 4,
        fontSize: 18,
        borderColor: '#000000',
        color: '#000000',
        textAlign: 'center',
        alignSelf: "flex-end"
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    text: {
        width: 100,
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    },
    toolbarView: {
        height: 50,
        marginRight: 150
    }
});

module.exports = NewMessageScreen;