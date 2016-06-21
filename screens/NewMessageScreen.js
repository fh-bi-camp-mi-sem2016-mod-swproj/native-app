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
    }
    state = {
        //zum Testen
        user: 'Heinz',
        message: 'Test'
    };

    render() {
        return (
            <ViewContainer>

                <Icon.ToolbarAndroid
                    style={styles.toolbarView}
                    actions={[
                        {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                        {title: 'Home', iconName:'home', iconSize: 30,  show: 'always'},
                        {title: 'Logout', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        MessageScreen
                    </Text>
                </View>

                <Text style={styles.text}>
                    User:
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={user => this.setState({user})}
                        placeholder="User">
                    </TextInput>
                </ViewContainer>

                <Text style={styles.text}>
                    Message:
                </Text>

                <ViewContainer>
                    <TextInput
                        style={styles.input}
                        onChangeText={message => this.setState({message})}
                        placeholder="Message">
                    </TextInput>
                </ViewContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._showUserMessage(this.state.user, this.state.message)}>
                        <Text style={styles.btnText}> Senden </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToMainMenue()}>
                        <Text style={styles.btnText}> Back </Text>
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
            ident: "Message"
        })
    }

    _navigateToLogInScreen() {
        this.props.navigator.push ({
            ident: "Login"
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
                instance._navigateToMainMenue();
                break;
            case 2:
                instance._navigateToLogInScreen();
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
    },
    toolbarView: {
        height: 50,
        marginRight: 200
    }
});

module.exports = NewMessageScreen;