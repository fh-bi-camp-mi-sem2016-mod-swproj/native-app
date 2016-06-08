/**
 * Created by Dennis on 31.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert,} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'

class RegisterScreen extends Component {

    state = {
        //zum Testen
        fName: 'Dennis',
        lName: 'Starke',
        uName: "dstarke",
        pass: "1234",
        age: '28',
        haircolor: 'blond',
        sex: 'm',
        bodyheight: '180',
        figure: 'schlank'
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
                        Vorname :
                    </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={fName => this.setState({fName})}
                            placeholder="Vorname">
                        </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Nachname :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={nName => this.setState({nName})}
                        placeholder="Nachname">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Benutzername :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={uName => this.setState({uName})}
                        placeholder="Username">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Passwort :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={pass => this.setState({pass})}

                        placeholder="Passwort">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Haarfarbe :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={haircolor => this.setState({haircolor})}
                        placeholder="Haarfarbe">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Alter :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={age => this.setState({age})}
                        placeholder="Alter">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Geschlecht :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={sex => this.setState({sex})}
                        placeholder="Geschlecht">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Größe :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={bodyheight => this.setState({bodyheight})}
                        placeholder="Groeße">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Figur :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={figure => this.setState({figure})}
                        placeholder="Figur">
                    </TextInput>
                </View>

                <ViewContainer>

                </ViewContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._saveRegAlert(this.state.fName, this.state.lName, this.state.uName, this.state.pass, this.state.age, this.state.eyecolor, this.state.haircolor, this.state.sex, this.state.bodyheight, this.state.figure)}>
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
                <StatusBarBackground />

            </ViewContainer>
        );
    }

    _navigateToLoginScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }

    _saveRegAlert(pFName, pLName, pUsername, pPasswort, pAge, pEyecolor, pHaircolor, pSex, pBodyheight, pFigure){
        Alert.alert('Sie wurden mit folgenden Angaben:', pFName +"\n"+ pLName +"\n"+ pUsername +"\n"+ pPasswort +"\n"+ pAge +"\n"+ pEyecolor +"\n"+ pHaircolor +"\n"+ pSex +"\n"+ pBodyheight +"\n"+ pFigure, [{text: 'erfolgreich registriert'}])
    }
}

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:30,
        paddingBottom: 20
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
        height: 36,
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
