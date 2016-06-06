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
        lName: 'Meier',
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

                <Text style={styles.text}>
                    Vorname :
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={fName => this.setState({fName})}
                        placeholder="Vorname">
                    </TextInput>
                </ViewContainer>

                <Text style={styles.text}>
                    Vorname :
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={nName => this.setState({nName})}
                        placeholder="Nachname">
                    </TextInput>
                </ViewContainer>

                <Text style={styles.text}>
                    Haarfarbe :
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={haircolor => this.setState({haircolor})}
                        placeholder="Haarfarbe">
                    </TextInput>
                </ViewContainer>

                <Text style={styles.text}>
                    Alter :
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={age => this.setState({age})}
                        placeholder="Alter">
                    </TextInput>
                </ViewContainer>

                <Text style={styles.text}>
                    Geschlecht :
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={sex => this.setState({sex})}
                        placeholder="Geschlecht">
                    </TextInput>
                </ViewContainer>

                <Text style={styles.text}>
                    Größe :
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={bodyheight => this.setState({bodyheight})}
                        placeholder="Groeße">
                    </TextInput>
                </ViewContainer>

                <Text style={styles.text}>
                    Figur :
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={figure => this.setState({figure})}
                        placeholder="Figur">
                    </TextInput>
                </ViewContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._saveRegAlert(this.state.fName, this.state.lName, this.state.age, this.state.eyecolor, this.state.haircolor, this.state.sex, this.state.bodyheight, this.state.figure)}>
                        <Text style={styles.btnText}> Registrieren </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToMainMenue()}>
                        <Text style={styles.btnText}> Back </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <StatusBarBackground />

            </ViewContainer>
        );
    }

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }
    _saveRegAlert(pFName, pLName, pAge, pEyecolor, pHaircolor, pSex, pBodyheight, pFigure){
        Alert.alert('Sie wurden mit folgenden Angaben:', pFName +"\n"+ pLName +"\n"+ pAge +"\n "+ pEyecolor +"\n "+ pHaircolor +"\n "+ pSex +"\n "+ pBodyheight +"\n "+ pFigure, [{text: 'erfolgreich registriert'}])
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
    inputContainerView: {
        flexDirection: 'row',
        marginTop: 5,
        padding:5
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

module.exports = RegisterScreen;