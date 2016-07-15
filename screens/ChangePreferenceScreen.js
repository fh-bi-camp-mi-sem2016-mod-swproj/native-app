
import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert, Label, Picker} from 'react-native';

import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

import Database from './../components/backend/Database'
import User from './../components/backend/User'

var instance;
class ChangePreferenceScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;
    }

    state = {

        preference : {
            doctype: "pref",
            user_id: "<uuid>",
			gender : -1,
			ageFROM : '',
			ageTO : '',
			haircolor : -1,
			eyecolor : -1,
			figure : -1
        }
    };


     render() {
        return (
			<ViewContainer>
                <ViewContainer>

                <Icon.ToolbarAndroid
                    style={styles.toolbarView}
                    actions={[
                        {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                        {title: 'Log Out', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />
				
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Praeferenzen:
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Geschlecht:
                        </Text>
						<Picker
							style={styles.picker}
							selectedValue={this.state.gender}
							onValueChange={(gen) => this.setState({gender: gen})}>
							<Picker.Item label="weiblich" value= "0" />
							<Picker.Item label="männlich" value= "1" />
							<Picker.Item label="Keine Angabe" value= "2" />
						</Picker>
                   </View>
					
					<View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Alter von:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={ageFrom => this.setState({ageFrom})}
                            placeholder="searched age from">
                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Alter bis:
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={ageTo => this.setState({ageTo})}
                            placeholder="searched age to">
                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Haarfarbe:
                        </Text>
						<Picker
							style={styles.picker}
							selectedValue={this.state.haircolor}
							onValueChange={(hair) => this.setState({haircolor: hair})}>
							<Picker.Item label="rot" value= "0" />
							<Picker.Item label="blond" value= "1" />
							<Picker.Item label="braun" value= "2" />
							<Picker.Item label="schwarz" value= "3" />
						</Picker>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Augenfarbe:
                        </Text>
						<Picker
							style={styles.picker}
							selectedValue={this.state.eyecolor}
							onValueChange={(eye) => this.setState({eyecolor: eye})}>
							<Picker.Item label="blau" value= "0" />
							<Picker.Item label="grün" value= "1" />
							<Picker.Item label="braun" value= "2" />
							<Picker.Item label="Egal" value= "3" />
						</Picker>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Figur:
                        </Text>
						<Picker
							style={styles.picker}
							selectedValue={this.state.figure}
							onValueChange={(fig) => this.setState({figure: fig})}>
							<Picker.Item label="slim" value= "0" />
							<Picker.Item label="regular" value= "1" />
							<Picker.Item label="plussize" value= "2" />
							<Picker.Item label="Egal" value= "3" />
						</Picker>
                    </View>



                    <ButtonContainer>
					   <TouchableHighlight onPress={(event) =>this._savePreferences(this,this.state.gender, this.state.ageFrom, this.state.ageTo, this.state.haircolor, this.state.eyecolor, this.state.figure)}>
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
            </ViewContainer>
        );
    }
	
	
    _navigateToMainMenue(){
        this.props.navigator.push({
            ident: "Main"
        })
    }
    _navigateToLoginScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }

    _onActionSelected(position) {
        switch (position) {
            case 0:
                instance._navigateToMainMenue();
                break;
            case 1:
                Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
                instance._navigateToLoginScreen();
                break;
        }
    }

    _savePreferences(self, pGender, pAgeFrom, pAgeTo, pHaircolor, pEyecolor, pFigure){

        var db = null;

        var searchCallbacks = {
            success: function (data) {
                console.log(data);

				var newPref = {
						doctype: "pref",
						profile_id: User.getInstance().currentUSER.user._id,
						_rev : User.getInstance().currentUSER._rev,
						gender : pGender,
						ageFROM: pAgeFrom,
						ageTO	 : pAgeTo,
						haircolor: pHaircolor,
						eyecolor : pEyecolor,
						figure : pFigure
				};

                if(data.length == 0) {
                    db.pref.create(newPref, callbacks);
					User.getInstance().pref.showPreferences = newPref;
                }
                else if (data.length == 1) {
                    if(User.getInstance().currentUSER.profile._id) {

						var myPref = User.getInstance().currentUSER.preferences;
						
						if(pGender != null){
							myPref.gender = pGender;
						}
						if(pAgeFrom != null){
							myPref.ageFrom = pAgeFrom;
						}
						if(pAgeTo != null){
							myPref.ageTo = pAgeTo;
						}
						if(pHaircolor != null){
							myPref.haircolor = pHaircolor;
						}
						if(pEyecolor != null){
							myPref.eyecolor = pEyecolor;
						}
						if(pFigure != null){
							myPref.figure = pFigure;
						}
					
                        db.pref.update(myPref, callbacksUpdate);
                    }

                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };
        var callbacks = {
            success: function (data) {
                console.log(data);
                Alert.alert('Erfolg', "Preferencen erfolgreich erstellt.", [{text: 'ok'}]);
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        var callbacksUpdate = {
            success: function (data) {
                console.log(data);
                Alert.alert('Erfolg', "Preferencen erfolgreich geupdatet.", [{text: 'ok'}]);
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        if(User.getInstance().currentUSER.preferences._id == 0) {

            if (pGender == null) {
                Alert.alert('Fehler', "Kein Vorname angegeben", [{text: 'ok'}]);
            }
            else if (pAgeFrom == null) {
                Alert.alert('Fehler', "Kein minimales Alter angegeben", [{text: 'ok'}]);
            }
            else if (pAgeTo == null) {
                Alert.alert('Fehler', "Kein maximales Alter angegeben", [{text: 'ok'}]);
            }
            else if (pHaircolor == -1) {
                Alert.alert('Fehler', "Keine Haarfarbe angegeben", [{text: 'ok'}]);
            }
            else if (pEyecolor == -1) {
                Alert.alert('Fehler', "Keine Augenfarbe angegeben", [{text: 'ok'}]);
            }
            else if (pFigure == -1) {
                Alert.alert('Fehler', "Keine Figur angegeben", [{text: 'ok'}]);
            }
            else {
                db = Database.getInstance();
                db.pref.findById(User.getInstance().currentUSER.user._id, searchCallbacks);
            }
        }
        else {
            db = Database.getInstance();
            db.pref.findById(User.getInstance().currentUSER.user._id, searchCallbacks);
        }
    }
}

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,
        paddingBottom: 5
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
        height: 20
    },
    picker: {
        flex: 1,
        width: 200
    },
    toolbarView: {
        height: 50,
        marginRight: 250
    }
});

module.exports = ChangePreferenceScreen;
