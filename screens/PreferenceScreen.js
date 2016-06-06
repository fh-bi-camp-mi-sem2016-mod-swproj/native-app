/**
 * Created by Dennis on 18.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'

class PreferenceScreen extends Component {

    state = {
        //zum Testen
        age: '18',
        eyecolor: 'blau',
        haircolor: 'blond',
        sex: 'm',
        bodyheight: '180',
        figure: 'schlank'
    };

    render() {
        return (
            <ViewContainer>

                <ViewContainer>

                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Praeferenz:
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Alter
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={age => this.setState({age})}
                            placeholder="searched age">
                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Augenfarbe:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={eyecolor => this.setState({eyecolor})}
                            placeholder="searched eyecolor">
                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Harrfarbe:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={haircolor => this.setState({haircolor})}
                            placeholder="searched haircolor">
                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Geschlecht:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={sex => this.setState({sex})}
                            placeholder="searched sex">
                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Körpergröße:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={bodyheight => this.setState({bodyheight})}
                            placeholder="searched bodyheight">
                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Statur:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={figure => this.setState({figure})}
                            placeholder="searched figure">
                        </TextInput>
                    </View>

                    <ButtonContainer>
                        <TouchableHighlight onPress={() => this.saveAlert(this.state.age, this.state.eyecolor, this.state.haircolor, this.state.sex, this.state.bodyheight, this.state.figure)}>
                            <Text style={styles.btnText}>
                                Speichern
                            </Text>
                        </TouchableHighlight>
                    </ButtonContainer>

                    <ButtonContainer>
                        <TouchableHighlight onPress={(event) => this._navigateToMainMenue()}>
                            <Text style={styles.btnText}>
                             Back
                            </Text>
                        </TouchableHighlight>
                    </ButtonContainer>

                </ViewContainer>
                    <StatusBarBackground/>

            </ViewContainer>


        );
    }
    _navigateToMainMenue(){
        this.props.navigator.push({
            ident: "Main"
        })
    }

    saveAlert(pAge, pEyecolor, pHaircolor, pSex, pBodyheight, pFigure){
        Alert.alert('Praeferenz:', pAge +"\n "+pEyecolor+"\n "+pHaircolor+"\n "+pSex+"\n "+pBodyheight+"\n "+pFigure, [{text: 'saved'}])
    }
    

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:30,
        paddingBottom: 10
    },
<<<<<<< HEAD
=======
    thumbnail: {
        marginBottom: 10,
        width: 300,
        height: 200
    },
>>>>>>> upstream/master
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center'
    },
    inputContainerView: {
        flexDirection: 'row',
<<<<<<< HEAD
        marginTop: 5,
        padding:5
=======
        marginTop: 10,
        padding:10
>>>>>>> upstream/master
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

module.exports = PreferenceScreen;
