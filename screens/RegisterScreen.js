/**
 * Created by Dennis on 31.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert,} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'

import Database from './../components/backend/Database'

class RegisterScreen extends Component {

    state = {

        user : {
            doctype: "user",
            password: "",
            passwordTest: "",
            login: "",
            role: 0,
         }
    };

    render() {
        return (
            <ViewContainer>

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Bitte Registrieren sie sich!
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Login :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={login => this.setState({login})}
                        placeholder="Username">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Passwort :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                        placeholder="Passwort"
                        secureTextEntry = {true}>
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Passwort wdh:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={passwordTest => this.setState({passwordTest})}
                        placeholder="Passwort"
                        secureTextEntry = {true}>
                    </TextInput>
                </View>

                <ViewContainer>

                </ViewContainer>
                <ViewContainer>

                </ViewContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._createUser(this, this.state.login, this.state.password, this.state.passwordTest)}>
                        <Text style={styles.btnText}> Registrieren </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToLoginScreen()}>
                        <Text style={styles.btnText}> Back </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ViewContainer>

                </ViewContainer>

            </ViewContainer>
        );
    }

    _navigateToLoginScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }

    _createUser(self, pUsername, pPassword, pPasswordTest) {

        var db = null;
        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    // Username frei

                    var callbacksCreate = {
                        success: function (data) {
                            console.log(data);
                            Alert.alert('Benutzer', "Der Benutzer "+ pUsername + " wurde erfolgreich erstellt", [{text: 'ok'}]);

                            self._navigateToLoginScreen();
                        },
                        error: function (error) {
                            console.log(error);
                            // Verursacht einen fehler
                            // Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
                        }
                    };

                    var newUser = {
                        doctype: "user",
                        login: pUsername,
                        password: pPassword,
                        role: 0
                    };
                    db.user.create(newUser, callbacksCreate);

                } else if (data.length >= 1) {
                    // Username schon belegt
                    Alert.alert('Benutzer', "Der gewaehlte Benutzername ist schon belegt.", [{text: 'ok'}]);
                }


               //pCallback();
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        if ( pUsername == null ) {
            Alert.alert('Fehler', "Kein Username eingegeben" , [{text: 'ok'}]);
        }
        else if ( pPassword == null ) {
            Alert.alert('Fehler', "Kein Password eingegeben" , [{text: 'ok'}]);
        }
        else if ( pPassword != pPasswordTest){
            Alert.alert('Fehler', "Password nicht Identisch" , [{text: 'ok'}]);
        }
        else {

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
        flexDirection: 'row'
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
    }
});

module.exports = RegisterScreen;
