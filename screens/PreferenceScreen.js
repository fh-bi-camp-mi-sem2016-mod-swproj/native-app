import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    button,
    TextInput,
    Alert,
    Label
} from 'react-native';

import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

import User from './../components/backend/User'
import Database from "./../components/backend/Database";

var instance;

class PreferenceScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;
    }

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

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Geschlecht:
                    </Text>
                    <Text style={styles.input}>
                        {instance._parseGender(User.getInstance().pref.showPreferences.gender)}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Alter von:
                    </Text>
                    <Text style={styles.input}>
                        {User.getInstance().pref.showPreferences.ageFROM}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Alter bis:
                    </Text>
                    <Text style={styles.input}>
                        {User.getInstance().pref.showPreferences.ageTO}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Haarfarbe:
                    </Text>
                    <Text style={styles.input}>
                        {instance._parseHaircolor(User.getInstance().pref.showPreferences.haircolor)}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Augenfarbe:
                    </Text>
                    <Text style={styles.input}>
                        {instance._parseEyecolor(User.getInstance().pref.showPreferences.eyecolor)}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Figur:
                    </Text>
                    <Text style={styles.input}>
                        {instance._parseFigure(User.getInstance().pref.showPreferences.figure)}
                    </Text>
                </View>


                <ButtonContainer>
                    <TouchableHighlight style={styles.button}
                                        onPress={(event) => this._navigateToChangePreferenceScreen()}>
                        <Text style={styles.btnText}> Eigene Preferencen ändern </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight style={styles.button} onPress={(event) => this._navigateBackToLastScreen()}>
                        <Text style={styles.btnText}> Zurück </Text>
                    </TouchableHighlight>
                </ButtonContainer>

            </ViewContainer>

        );
    }

    _parseGender(pGender) {
        switch (pGender) {
            case "0":
                return "weiblich";
            case "1":
                return "männlich";
            default:
                return "Keine Angabe";
        }
    }

    _parseHaircolor(pHair) {
        switch (pHair) {
            case "0":
                return "rot";
            case "1":
                return "blond";
			case 2:
				return "braun";
			case 2:
				return "schwarz";
            default:
                return "Egal";
        }
    }
	_parseEyecolor(pEye) {
        switch (pEye) {
            case "0":
                return "blau";
            case "1":
                return "grün";
			case "2":
				return "braun";
            default:
                return "Egal";
        }
    }
	
	_parseFigure(pFigure){
		switch (pFigure){
			case "0":
                return "slim";
            case "1":
                return "regular";
			case "2":
				return "plussize";
			default:
				return "Egal";
		}
	}

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }

    _navigateToChangePreferenceScreen() {
        this.props.navigator.push({
            ident: "ChangePref"
        })
    }

    _navigateBackToLastScreen() {
        this.props.navigator.pop({})
    }

    _navigateToLogInScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }

    _onActionSelected(position) {
        switch (position) {
            case 0:
                instance._navigateBackToLastScreen();
                break;
            case 1:
                instance._navigateToMainMenue();
                break;
            case 2:
                Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
                instance._navigateToLogInScreen();
                break;
        }
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
        marginBottom: 25,
        width: 300,
        height: 350
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    toolbarView: {
        height: 50,
        marginRight: 200
    },
    inputContainerView: {
        flexDirection: 'row',
        padding: 5
    },
    input: {
        height: 20,
        padding: 4,
        marginRight: 50,
        flex: 4,
        fontSize: 18,
        color: '#000000',
        textAlign: 'center'
    },
    text: {
		
		width : 100,
        flexDirection: 'row',
        padding: 5,
        height: 40,
    }
});

module.exports = PreferenceScreen;
