/**
 * Created by Dennis on 06.06.2016.
 */
import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert,} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'


class MessageScreen extends Component {

    state = {
        //zum Testen
        message: 'Test'
    };

    render() {
        return (
            <ViewContainer>

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Message:
                    </Text>
                </View>

                <Text style={styles.text}>
                    User:
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={suchstring => this.setState({message})}
                        placeholder="Message">
                    </TextInput>
                </ViewContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._showMessage(this.state.message)}>
                        <Text style={styles.btnText}> Senden </Text>
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

    _showMessage(pInput){
        Alert.alert('Nachricht:', pInput , [{text: 'gesendet'}])
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

module.exports = MessageScreen;