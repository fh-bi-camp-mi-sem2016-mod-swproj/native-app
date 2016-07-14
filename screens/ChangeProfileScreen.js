/**
 * Created by Dennis on 17.05.2016.
 */
import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Alert, Label, Picker, ScrollView, trimLeft} from 'react-native';

import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

import Database from './../components/backend/Database'
import User from './../components/backend/User'

var instance;

class ChangeProfileScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;
    }

    state = {

        profile : {
            doctype: "profile",
            user_id: "<uuid>",
            firstname: "",
            lastname: "",
            email: "",
            birthday: -1,
            gender: -1,
            familystatus: -1,
            children: -1,
            aboutme: "",
            privacy: {
                friends: 0,
                pictures: 0
            },
            profilepic: "<uuid>",
            reported: false,
            haircolor: -1,
            eyecolor: -1,
            figure: -1
        }
    };


    render() {
        return (
            <ViewContainer>

                <Icon.ToolbarAndroid
                    style={styles.toolbarView}
                    actions={[
                        {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                        {title: 'Home', iconName:'home', iconSize: 30,  show: 'always'},
                        {title: 'Log Out', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />

            <ScrollView>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Ändern Sie Ihre Profildaten
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Vorname :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={firstname => this.setState({firstname})}
                        placeholder="Vorname">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Nachname :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={lastname => this.setState({lastname})}
                        placeholder="Nachname">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Email :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={email => this.setState({email})}
                        placeholder="Email">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Geburtstag :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={birthday => this.setState({birthday})}
                        placeholder="Geburtstag">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Geschlecht :
                    </Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.gender}
                        onValueChange={(gen) => this.setState({gender: gen})}>
                        <Picker.Item label="Weiblich" value= "0" />
                        <Picker.Item label="Maennlich" value= "1" />
                    </Picker>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Familenstatus :
                    </Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.familystatus}
                        onValueChange={(fam) => this.setState({familystatus: fam})}>
                        <Picker.Item label="Single" value= "0" />
                        <Picker.Item label="Geschieden" value= "1" />
                        <Picker.Item label="Verheiratet" value= "2" />
                    </Picker>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Kinder :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={children => this.setState({children})}
                        placeholder="Kinder">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Ueber Mich :
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={aboutme => this.setState({aboutme})}
                        placeholder="Ueber Mich">
                    </TextInput>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Haarfarbe :
                    </Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.haircolor}
                        onValueChange={(hair) => this.setState({haircolor: hair})}>
                        <Picker.Item label="Rot" value= "0" />
                        <Picker.Item label="Blond" value= "1" />
                        <Picker.Item label="Braun" value= "2" />
                        <Picker.Item label="Schwarz" value= "3" />
                    </Picker>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Augenfarbe :
                    </Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.eyecolor}
                        onValueChange={(eye) => this.setState({eyecolor: eye})}>
                        <Picker.Item label="Blau" value= "0" />
                        <Picker.Item label="Grün" value= "1" />
                        <Picker.Item label="Braun" value= "2" />
                    </Picker>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Figur :
                    </Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.figure}
                        onValueChange={(fig) => this.setState({figure: fig})}>
                        <Picker.Item label="Schlank" value= "0" />
                        <Picker.Item label="Normal" value= "1" />
                        <Picker.Item label="Plussize" value= "2" />
                    </Picker>
                </View>

                <ButtonContainer>
                    <TouchableHighlight style ={styles.button} onPress={(event) => this._createProfile(this.state.firstname, this.state.lastname, this.state.email, this.state.birthday, this.state.gender, this.state.familystatus, this.state.children, this.state.aboutme, this.state.haircolor, this.state.eyecolor, this.state.figure)}>
                        <Text style={styles.btnText}> Bestätigen </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ViewContainer>

                </ViewContainer>
                </ScrollView>
             </ViewContainer>
        )
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
    _navigateToProfileScreen() {
        this.props.navigator.pop({
            ident: "Profile"
        })
    }

    _onActionSelected(position) {
        switch (position) {
            case 0:
                instance._navigateToProfileScreen();
                break;
            case 1:
                instance._navigateToMainMenue();
                break;
            case 2:
                Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
                instance._navigateToLoginScreen();
                break;
        }
    }

    _createProfile( pFirstname, pLastname, pEmail, pBirthday, pGender, pFamilystatus, pChildren, pAboutme, pHaircolor, pEyecolor, pFigur ) {

        var db = null;

        var searchCallbacks = {
            success: function (data) {
                console.log(data);

                var newProfile = {
                    doctype: "profile",
                            user_id:  User.getInstance().currentUSER.user._id,
                            firstname: pFirstname,
                            lastname: pLastname,
                            email: pEmail,
                            birthday: pBirthday,
                            gender: pGender,
                            familystatus: pFamilystatus,
                            children: pChildren,
                            aboutme: pAboutme,
                            privacy: {
                                friends: 0,
                                pictures: 0
                            },
                            profilepic: "<uuid>",
                            reported: false,
                            haircolor: pHaircolor,
                            eyecolor: pEyecolor,
                            figure: pFigur

                };

                if(data.length == 0) {
                    db.profile.create(newProfile, callbacks);
                }
                else if (data.length == 1) {
                    if(User.getInstance().currentUSER.profile._id) {
                       var myprofile = User.getInstance().currentUSER.profile;

                        if(pFirstname != null) {
                            myprofile.firstname = pFirstname;
                        }
                        if(pLastname != null) {
                            myprofile.lastname = pLastname;
                        }
                        if(pEmail != null) {
                            myprofile.email = pEmail;
                        }
                        if(pChildren != null) {
                            myprofile.children = parseInt(pChildren);
                        }
                        if(pAboutme != null) {
                            myprofile.aboutme = pAboutme;
                        }
                        if( pBirthday != null) {
                            var datestr = pBirthday;
                            var date = (new Date(datestr.split(".")).getTime() / 1000).toFixed(0);
                            console.log(date);
                            myprofile.birthday = date;
                        }
                        myprofile.gender = parseInt(pGender);
                        myprofile.familystatus = parseInt(pFamilystatus);
                        myprofile.haircolor = parseInt(pHaircolor);
                        myprofile.eyecolor = parseInt(pEyecolor);
                        myprofile.figure = parseInt(pFigur);



                        db.profile.update(myprofile, callbacksUpdate);
                        instance._navigateToProfileScreen();
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
                Alert.alert('Erfolg', "Profil erfolgreich erstellt.", [{text: 'ok'}]);
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        var callbacksUpdate = {
            success: function (data) {
                console.log(data);
                Alert.alert('Erfolg', "Profil erfolgreich geupdatet.", [{text: 'ok'}]);
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        if(User.getInstance().currentUSER.profile._id == 0) {

            if (pFirstname == null) {
                Alert.alert('Fehler', "Kein Vorname angegeben", [{text: 'ok'}]);
            }
            else if (pLastname == null) {
                Alert.alert('Fehler', "Kein Nachname angegeben", [{text: 'ok'}]);
            }
            else if (pEmail == null) {
                Alert.alert('Fehler', "Keine Email angegeben", [{text: 'ok'}]);
            }
            else if (pBirthday == -1) {
                Alert.alert('Fehler', "Keine Geburtstag angegeben", [{text: 'ok'}]);
            }
            else if (pGender == -1) {
                Alert.alert('Fehler', "Keine Geschlecht angegeben", [{text: 'ok'}]);
            }
            else if (pFamilystatus == -1) {
                Alert.alert('Fehler', "Keine Familienstatus angegeben", [{text: 'ok'}]);
            }
            else if (pChildren == -1) {
                Alert.alert('Fehler', "Keine Kinderanzahl angegeben", [{text: 'ok'}]);
            }
            else if (pAboutme == null) {
                Alert.alert('Fehler', "Keine Übermich angegeben", [{text: 'ok'}]);
            }
            else if (pHaircolor == -1) {
                Alert.alert('Fehler', "Keine Haarfarbe angegeben", [{text: 'ok'}]);
            }
            else if (pEyecolor == -1) {
                Alert.alert('Fehler', "Keine Augenfarbe angegeben", [{text: 'ok'}]);
            }
            else if (pFigur == -1) {
                Alert.alert('Fehler', "Keine Figur angegeben", [{text: 'ok'}]);
            }
            else {
                db = Database.getInstance();
                db.profile.findByUserId(User.getInstance().currentUSER.user._id, searchCallbacks);
            }
        }
        else {
            db = Database.getInstance();
            db.profile.findByUserId(User.getInstance().currentUSER.user._id, searchCallbacks);
        }
    }
}

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,
        paddingBottom: 50
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
        marginRight: 200
    }
});

module.exports = ChangeProfileScreen;
