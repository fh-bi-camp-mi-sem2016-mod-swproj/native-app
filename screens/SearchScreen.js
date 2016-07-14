/**
 * Created by Benedikt on 29.06.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, ListView, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

import User from './../components/backend/User'
import Database from './../components/backend/Database'

var listViewData = [];
var instance;

class SearchScreen extends Component {

    state = {
        suchstring: ''
    };

    constructor(props){
        super(props);
        instance = this;

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(listViewData)
        }

    }

    renderRow(rowData) {
        return (
            <View style = {styles.listRow}>
                <Text>
                    {rowData.firstname + " " + rowData.lastname}
                </Text>
                <View style = {styles.iconRow}/>

                <TouchableHighlight onPress={() => this._viewProfile(rowData.profile)}>
                    <Icon name="user"
                          size={20}
                    />
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this._sendFriendRequest(rowData.profile_id)}>
                    <Icon name = "plus-square"
                          size = {20}
                    />
                </TouchableHighlight>

                <TouchableHighlight style={styles.button} onPress={() => this._sendMessage(rowData.profile_id)}>
                    <Icon name = "envelope-square"
                          size = {20}
                    />
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            <ViewContainer>

                <Icon.ToolbarAndroid
                    style={styles.toolbarView}
                    actions={[
                        {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                        {title: 'MainMenue', iconName:'home', iconSize: 30,  show: 'always'},
                        {title: 'LogOut', iconName:'sign-out', iconSize: 30,  show: 'always'}

                    ]}
                    onActionSelected={this._onActionSelected}
                />

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        User:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={suchstring => this.setState({suchstring})}
                        placeholder="searched user">
                    </TextInput>
                </View>

                <ButtonContainer>
                    <TouchableHighlight onPress={() => this._search(this.state.suchstring)}>
                        <Text style={styles.btnText}> search </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ViewContainer>
                    <ListView
                        style={styles.marginRow}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => {return this.renderRow(rowData)}}>
                    </ListView>
                </ViewContainer>
            </ViewContainer>
        );
    }

    _search(suchstring) {
        console.log("Eingabe-Suche", suchstring);

        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    Alert.alert('Fehler', "Es wurden keine Personen gefunden.", [{text: 'ok'}]);
                } else if (data.length > 1) {
                    // ListView zuruecksetzten
                    listViewData = [];

                    for (var i = 0; i < data.length; i++) {

                        var currentprofile = data[i];

                        if (
                            currentprofile.firstname.toUpperCase().includes(suchstring.toUpperCase()) ||
                            currentprofile.lastname.toUpperCase().includes(suchstring.toUpperCase()) ||
                            (currentprofile.firstname.toUpperCase() + " " + currentprofile.lastname.toUpperCase()).includes(suchstring.toUpperCase())) {

                            console.log("Profil:", currentprofile);

                            instance._addListViewRow(currentprofile.firstname, currentprofile.lastname, currentprofile._id, currentprofile);

                        }
                    }
                }

            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        var db = Database.getInstance();
        db.profile.findAll(callbacks);

    }

    _sendFriendRequest(pProfileId) {
        var db = Database.getInstance();

        var callbacksUpdateOtherFriendList = {
            success: function (data) {
                console.log(data);
                Alert.alert('Erfolg', "Freundschaftsanfrage wurde erfolgreich erstellt.", [{text: 'ok'}]);

            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    Alert.alert('Fehler', "Die gewählte Person hat noch keine Freundesliste.", [{text: 'ok'}]);
                } else if (data.length > 1) {
                    Alert.alert('Fehler', "Die gewählte Person hat mehrere Freundeslisten. Das ist nicht gut.", [{text: 'ok'}]);
                } else {
                    var otherFriendList = data[0];

                    var found = false;
                    for (var i = 0; i < otherFriendList.friends.length; i++) {
                        if (otherFriendList.friends[i].id == User.getInstance().currentUSER.profile._id) {
                            found = true;
                        }
                    }

                    if (!found) {
                        var me = {
                            "id": User.getInstance().currentUSER.profile._id,
                            "status": 0
                        };

                        otherFriendList.friends.push(me);

                        console.log(otherFriendList);
                        db.friends.update(otherFriendList, callbacksUpdateOtherFriendList);
                    } else {
                        Alert.alert('Fehler', "Eine Freundesanfrage ist schon vorhanden.", [{text: 'ok'}]);
                    }
                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        db.friends.findByProfileId(pProfileId, callbacks);
    }

    _addListViewRow(pFirstname, pLastname, pProfileId, pProfile) {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        listViewData = listViewData.concat([{
            firstname: pFirstname,
            lastname: pLastname,
            profile_id: pProfileId,
            profile: pProfile
        }]);
        this.setState({dataSource: ds.cloneWithRows(listViewData)});
    }

    _viewProfile(pProfile) {
        User.getInstance().tag.profileForShowProfile = pProfile;

        this.props.navigator.push({
            ident: "Profile"
        })
    }

    _sendMessage(pProfileId) {
        this.props.navigator.push({
            ident: "NewMessage",
            passProps: {
                id: pProfileId
            }
        })
    }

    _navigateToFriendScreen() {
        this.props.navigator.pop({
            ident: "Friend"
        })
    }

    _navigateToMainMenue() {
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
                instance._navigateToMainMenue();
                break;
            case 2:
                User.getInstance(1);
                Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
                instance._navigateToLoginScreen();
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
    listRow: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginLeft: 50,
        marginTop: 10,
        height: 30
    },
    iconRow: {
        padding: 10,
        marginLeft: 150
    },
    marginRow: {
        marginBottom: 20
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

module.exports = SearchScreen;