/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert,} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'

import Database from './../components/backend/Database'
import DatabaseClass from './../components/backend/Database'

var bild = {posters: {thumbnail: 'http://q-review.co.uk/wp-content/uploads/2014/03/your-logo-here.png'}};

class LoginScreen extends Component {

    state = {
        //zum Testen
        username: 'franz.lauter@mail.de',
        password: 'paSswottt'
    };

    render() {
        return (
        <ViewContainer>
                <View style={styles.titleView}>

                    <Image style={styles.thumbnail}
                           source={{uri: bild.posters.thumbnail}}
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
                            placeholder="Passwort">
                        </TextInput>
                    </View>
                <ButtonContainer>
                    <TouchableHighlight onPress={()=>this._login(this.state.username ,this.state.password)}>
                        <Text style={styles.btnText}>
                            Einloggen
                        </Text>
                     </TouchableHighlight>
                </ButtonContainer>

            </ViewContainer>


        );
    }

    _login(pEMail, pPassword)
    {
        Database.getInstance()._login(pEMail,pPassword);

        this._navigateToMainMenue();
    }

    _navigateToMainMenue(){
        this.props.navigator.push({
            ident: "Main"
        })
    }
}

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:30,
        paddingBottom: 10
    },
    thumbnail: {
        marginBottom: 10,
        width: 300,
        height: 200
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center'
    },
    inputContainerView: {
        flexDirection: 'row',
        marginTop: 10,
        padding:10
    },
    input: {
        height: 36,
        padding: 4,
        marginRight: 50,
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
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    }
});

module.exports = LoginScreen;
