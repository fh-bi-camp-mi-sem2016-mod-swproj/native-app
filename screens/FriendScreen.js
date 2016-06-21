/**
 * Created by Dennis on 18.05.2016.
 */
import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, Alert, ListView} from 'react-native';

import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Database from './../components/backend/Database'
import User from './../components/backend/User'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

var data = [];
var incData = [];

var friendInstanz;
var set = 0;

class FriendScreen extends Component {

    constructor(props) {
        super(props);

        friendInstanz = this;
        this._addFriendsToListView(friendInstanz, "ca5c2c9fb2d201991f8b6f06e62196ff");

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        var ds1 = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(data),
            dataSource1: ds1.cloneWithRows(incData)
        };

        // zum testen
        User.getInstance().currentUSER.profile = {_id: "ca5c2c9fb2d201991f8b6f06e62196ff", _rev: "1-75814ab18741c8c0fe75e57ceda4319f", doctype: "profile", user_id: "<uuid>", firstname: "bertha", lastname: "meier", email: "bertha@test.de", birthday: -316656000, gender: 0, familystatus: 1, children: 2, aboutme: "fröhlich, erlich", privacy: {friends: 1, pictures: 0}, profilepic: "<uuid>", haircolor: 3, eyecolor: 0, figure: 1};
    }

    renderRow(rowData) {
        return (
            <View style = {styles.listRow}>
                    <Text>
                     {rowData.firstname + " " + rowData.lastname}
                    </Text>
                <View style = {styles.iconRow}/>
                <TouchableHighlight onPress={() => this._setFriend(rowData.profile_id, 2)}>
                    <Icon name = "minus-square"
                          size = {20}
                    />
                </TouchableHighlight>
            </View>
        )
    }

    renderRow1(rowData) {
        return (
            <View style = {styles.listRow}>
                <Text>
                    {rowData.firstname + " " + rowData.lastname}
                </Text>
                <View style = {styles.iconRow}/>
                <TouchableHighlight style = {styles.button} onPress={() => this._setFriend(rowData.profile_id, 1)}>
                    <Icon name = "plus-square"
                          size = {20}
                    />
                </TouchableHighlight>

                <TouchableHighlight style = {styles.button} onPress={() => this._delete(rowData.profile_id, 2)}>
                    <Icon name = "minus-square"
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
                        {title: 'Search', iconName:'user-plus', iconSize: 30, show: 'always'},
                        {title: 'Log Out', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        FriendZone:
                    </Text>
                </View>

                <Text style={styles.text}>
                    Freunde:
                </Text>

                <ListView
                    style={styles.marginRow}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {return this.renderRow(rowData)}}>
                </ListView>

                <Text style={styles.text}>
                    Freundesanfragen:
                </Text>

                <ListView
                    style={styles.marginRow}
                    dataSource={this.state.dataSource1}
                    renderRow={(rowData) => {return this.renderRow1(rowData)}}>
                </ListView>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._save()}>
                        <Text style={styles.btnText}> save </Text>
                    </TouchableHighlight>
                </ButtonContainer>

            </ViewContainer>
        );
    }

    _navigateToMainMenue() {
        this.props.navigator.pop({
            ident: "Main"
        })
    }

    _navigateToSearchScreen() {
        this.props.navigator.push({
            ident: "UserSearch"
        })
    }

    _navigateToLoginScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }

    _onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            friendInstanz._navigateToMainMenue();
        }
        if (position === 1) {
            friendInstanz._navigateToSearchScreen();
        }
        if (position === 2) {
            Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
            friendInstanz._navigateToLoginScreen();
        }
    }
    _setFriend(pProfileId, pValue) {
        Alert.alert('SET:', "Id: " + pProfileId +"\nValue "+pValue, [{text: 'ok'}]);
        for (var i = 0; i < User.getInstance().currentUSER.friends.friends.length; i++) {
            if (User.getInstance().currentUSER.friends.friends[i].id == pProfileId) {
                User.getInstance().currentUSER.friends.friends[i].status = pValue;
            }
        }
    }
    _save() {

        var callbacksSaveOther = {
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        };

        var callbacksOtherFriend = {
            success: function (data) {
                console.log(data);

                if (data.length == 1){
                    var changed = false;
                    var otherFriendlist = data[0];
                    for(var i = 0; i < otherFriendlist.friends.length; i++) {
                        console.log("Schleife:");
                        if(otherFriendlist.friends[i].id == User.getInstance().currentUSER.profile._id){
                            for(var j = 0 ; j < User.getInstance().currentUSER.friends.friends.length ; j++){
                                console.log("Schleife2:");
                                if(otherFriendlist.profile_id == User.getInstance().currentUSER.friends.friends[j].id){
                                    var status = User.getInstance().currentUSER.friends.friends[j].status;
                                    console.log("Status = ", status);
                                    if(status == 1){
                                        otherFriendlist.friends[i].status = 1;
                                        changed = true;
                                    } else if(status = 2){
                                        otherFriendlist.friends[i].status = 2;
                                        changed = true;
                                    }
                                }
                            }
                        }
                    }
                    if(changed){
                        // andere Freundeslise updaten
                        console.log("gefunden");
                        var db = Database.getInstance();
                        db.friends.update(otherFriendlist, callbacksSaveOther);
                    } else {
                        console.log("nicht gefunden");

                        var status;
                        for(var j = 0 ; j < User.getInstance().currentUSER.friends.friends.length ; j++){
                            if(otherFriendlist.profile_id == User.getInstance().currentUSER.friends.friends[j].id){
                                status = User.getInstance().currentUSER.friends.friends[j].status;
                            }
                        }

                        var row = {
                            id: User.getInstance().currentUSER.profile._id,
                            status: status
                        };

                        otherFriendlist.friends.push(row);

                        var db = Database.getInstance();
                        db.friends.update(otherFriendlist, callbacksSaveOther);
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

                var db = Database.getInstance();

                var ownFriendList = User.getInstance().currentUSER.friends;

                for(var i = 0 ; i < ownFriendList.friends.length ; i++){
                    db.friends.findByProfileId(ownFriendList.friends[i].id, callbacksOtherFriend);
                }

                User.getInstance().currentUSER.friends._rev = data.rev;

                Alert.alert('Success', "Die Freundesliste wurde erfolgreich gespeichert.", [{text: 'ok'}]);
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Die Freundesliste konnte nicht in die Datenbank geschrieben werden.", [{text: 'ok'}]);
            }
        };

        var friendlist = User.getInstance().currentUSER.friends;
        var db = Database.getInstance();
        db.friends.update(friendlist, callbacks);

    }

    _delete(pProfileId, pValue) {
        var index;
        for (var i = 0; i < User.getInstance().currentUSER.friends.friends.length; i++) {
            if ( User.getInstance().currentUSER.friends.friends[i].id == pProfileId ) {
                index = i;
                User.getInstance().currentUSER.friends.friends[index].status = pValue;
            }
        }
        Alert.alert('Liste', JSON.stringify(index), [{text: 'ok'}]);
        delete User.getInstance().currentUSER.friends.friends[index];
    }

    _addListViewRow(pFirstname, pLastname, pStatus, pProfileId){
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        if ( pStatus == 1){
            data = data.concat([{firstname: pFirstname, lastname: pLastname, profile_id: pProfileId }]);
            this.setState({dataSource: ds.cloneWithRows(data)});
        }
        else if ( pStatus == 0){
            incData = incData.concat([{firstname: pFirstname, lastname: pLastname, profile_id: pProfileId }]);
            this.setState({dataSource1: ds.cloneWithRows(incData)});
        }
    }

    _addFriendsToListView(self, pProfileId) {

        var db = null;
        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    Alert.alert('Fehler', "Sie können keine Freunde ohne Profile haben", [{text: 'ok'}]);
                } else if (data.length > 1) {
                    Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
                }
                else if (set == 0){
                    User.getInstance().currentUSER.friends = data[0];
                    for(var i = 0; i < data[0].friends.length; i++) {
                        self._addProfile(self, data[0].friends[i].id, data[0].friends[i].status);
                    }
                    set = 1;
                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };
        if (pProfileId == null) {
            Alert.alert('Fehler', "Sie können keine Freunde ohne Profile haben", [{text: 'ok'}]);
        }
        else if( set == 0) {
            db = Database.getInstance();
            db.friends.findByProfileId(pProfileId, callbacks);
        }
    }

    _addProfile(self, pProfileId, pFriendStatus) {

        var db = null;
        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length == 0) {
                    Alert.alert('Fehler', "Ihr Freund hat noch keine ProfilId", [{text: 'ok'}]);
                } else if (data.length > 1) {
                    Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
                }
                else {
                    self._addListViewRow(data[0].firstname, data[0].lastname, pFriendStatus, pProfileId);
                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        if (pProfileId == null) {
            Alert.alert('Fehler', "Ihr Freund hat kein Profil", [{text: 'ok'}]);
        }
        else {
            db = Database.getInstance();
            db.profile.findById(pProfileId, callbacks);
        }
    }
}

const styles = StyleSheet.create({

    titleView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,
        paddingBottom: 15
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    text: {
        width: 200,
        flexDirection: 'row',
        fontSize: 20,
        marginLeft: 50,
        padding: 5,
        height: 30,
        margin: 5,
        fontWeight: 'bold'
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
    toolbarView: {
        height: 50,
        marginRight: 200
    },
    button: {
      marginRight: 10
    },
    marginRow: {
        marginBottom: 20
    }
});

module.exports = FriendScreen;