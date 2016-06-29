/**
 * Created by Dennis on 20.06.2016.
 */
import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

var instance = null;

class NewMessageScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;

        // zum testen
        User.getInstance().currentUSER.profile = {_id: "ca5c2c9fb2d201991f8b6f06e62196ff", _rev: "1-75814ab18741c8c0fe75e57ceda4319f", doctype: "profile", user_id: "<uuid>", firstname: "bertha", lastname: "meier", email: "bertha@test.de", birthday: -316656000, gender: 0, familystatus: 1, children: 2, aboutme: "fröhlich, erlich", privacy: {friends: 1, pictures: 0}, profilepic: "<uuid>", haircolor: 3, eyecolor: 0, figure: 1};
    }
    state = {
        //zum Testen
        user: '',
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
                        User:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={user => this.setState({user})}
                        placeholder="User">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Message:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={message => this.setState({message})}
                        placeholder="Message">
                    </TextInput>
                </View>
                <ViewContainer>

                </ViewContainer>
                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._showUserMessage(this.state.user, this.state.message)}>
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

    _showUserMessage(pInputUser, pInputMessage){
        Alert.alert('Nachricht:',"User: "+ pInputUser + "\nNachricht: " +pInputMessage, [{text: 'gesendet'}])
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
    _createNewMessage(self, pUsername, pMessage) {

        var db = null;
        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    // Username frei

                    var callbacksCreate = {
                        success: function (data) {
                            console.log(data);
                            //Alert.alert('Benutzer', "Der Benutzer "+ pUsername + " wurde erfolgreich erstellt", [{text: 'ok'}]);

                        },
                        error: function (error) {
                            console.log(error);
                            Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
                        }
                    };

                    var newMessage = {
                        doctype: "msg",
                        timestamp: -1,
                        from: user.currentUSER.profile._id,
                        to: "<uuid>",
                        title: "",
                        content: "",
                        archivedFrom: false,
                        archivedTo: false,
                        deletedFrom: false,
                        deletedTo: false

                    };
                    db.msg.create(newMessage, callbacksCreate);

                } else if (data.length >= 1) {
                    // Username schon belegt
                    Alert.alert('Benutzer', "Der Benutzername existiert nicht", [{text: 'ok'}]);
                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        if ( pUsername == null ) {
            Alert.alert('Fehler', "Kein Username eingegeben" , [{text: 'ok'}]);
        }
        else if ( pMessage == null ) {
            Alert.alert('Fehler', "Keine Nachricht eingegeben" , [{text: 'ok'}]);
        }
        else {
            // noch nicht richtig
            db = Database.getInstance();
            db.user.findByLogin(pUsername, callbacks);

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