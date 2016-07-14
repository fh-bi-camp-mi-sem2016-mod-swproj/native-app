/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    button,
    TextInput,
    Image,
    Alert
} from "react-native";
import ViewContainer from "../components/frontend/ViewContainer";
import ButtonContainer from "../components/frontend/ButtonContainer";
import Database from "./../components/backend/Database";
import User from "./../components/backend/User";

var instance;

class LoginScreen extends Component {

    state = {
        //zum Testen
        username: '',
        password: ''
    };

    constructor(props) {
        super(props);
        instance = this;
    }

    render() {
        return (
            <ViewContainer>
                <View style={styles.titleView}>

                    <Image style={styles.thumbnail}
                           source={require('./icon.png')}
                    />

                    <Text style={styles.titleText}>
                        Welcome to Find.me
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Login :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={username => this.setState({username})}
                        placeholder="E-Mail">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Password :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                        placeholder="Passwort"
                        secureTextEntry = {true}>
                    </TextInput>
                </View>
                <ButtonContainer>
                    <TouchableHighlight
                        onPress={()=>this._login(this, this.state.username ,this.state.password)}>
                        <Text style={styles.btnText}>
                            Einloggen
                        </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToRegisterScreen()}>
                        <Text style={styles.btnText}>
                            Registrieren
                        </Text>
                    </TouchableHighlight>
                </ButtonContainer>

            </ViewContainer>


        );
    }

    _login(self, pUser, pPassword) {

        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    // User nicht gefunden
                    Alert.alert('Benutzer', "Ein Benutzer mit diesem Namen konnte nicht gefunden werden.", [{text: 'ok'}]);
                } else if (data.length == 1) {
                    // Normaler Benutzer

                    var receivedUser = data[0];

                    if (receivedUser.password === pPassword) {
                        // Login erfolgreich

                        var user = User.getInstance();
                        user.currentUSER.user = receivedUser;

                        console.log(user.login + " hat sich erfolgreich eingeloggt");

						if(receivedUser.role === 2) {
							self._navigateToAdminMenue();
                        } else {
                            self._getProfile();
						}
                        self._navigateToMainMenue();
                    } else {
                        // Passwort falsch
                        console.log("Passwort falsch");
                        Alert.alert('Passwort', "Das Passwort passt nicht zum angegebenen Benutzer.", [{text: 'ok'}]);
                    }

                } else if (data.length > 1) {
                    // Fehler
                    Alert.alert('Fehler', "Es wurden mehrere Benutzer mit diesem Namen gefunden.", [{text: 'ok'}]);
                }

            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        var db = Database.getInstance();
        db.user.findByLogin(pUser, callbacks);
    }

    _getProfile() {
        var db = Database.getInstance();

        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    // Kein Profil

                    instance._navigateToCreateProfileScreen();

                } else if (data.length == 1) {
                    // Profil abfragen

                    User.getInstance().currentUSER.profile = data[0];

                    console.log("Profil des angemeldeten Benutzers:", User.getInstance().currentUSER.profile);

                    instance._navigateToMainMenue();

                } else if (data.length > 1 && User.getInstance().currentUSER.user.role === 1) {
                    // Fake User verhalten fehlt

                } else {
                    Alert.alert('Fehler', "Es gab einen Fehler beim Profil abfragen.", [{text: 'ok'}]);
                }

            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        db.profile.findByUserId(User.getInstance().currentUSER.user._id, callbacks);
    }

    _navigateToAdminMenue() {
        this.props.navigator.push({
            ident: "Admin"
        })
    }

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }

    _navigateToCreateProfileScreen() {
        this.props.navigator.push({
            ident: "ChangeProfile"
        })
    }

    _navigateToRegisterScreen() {
        this.props.navigator.push({
            ident: "Register",
            passProps: {
                id: User.getInstance().currentUSER.user._id
            }
        })
    }
}

const styles = StyleSheet.create({

    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10
    },
    thumbnail: {
        resizeMode: 'contain',
        marginBottom: 50,
        width: 300,
        height: 200
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputContainerView: {
        flexDirection: 'row',
        marginTop: 10,
        padding: 10
    },
    input: {
        height: 36,
        padding: 4,
        marginRight: 70,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 4,
        color: '#000000',
        textAlign: 'center'
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

module.exports = LoginScreen;
