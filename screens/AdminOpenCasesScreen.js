/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    Fetch,
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    button,
    TextInput,
    Image,
    Alert,
    ListView,
    TouchableOpacity
} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import Database from "./../components/backend/Database";
import ButtonContainer from '../components/frontend/ButtonContainer'
import _ from 'lodash'

class AdminOpenCasesScreen extends Component {

    constructor(props) {
        super(props);

        data = [
          //  {User: "", pID: "", uID: ""},
        ];

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }

    renderRow(rowData) {
        return (
            <View style={styles.inputListView}>
                <Text style={{fontSize:18}}>
                    {"User: " + rowData.User}
                </Text>
                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._fallAblehnen(rowData.pID)}>
                        <Text style={styles.btnText}> Fall ablehnen </Text>
                    </TouchableHighlight>
                </ButtonContainer>
                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._profilVerwarnen(rowData.pID)}>
                        <Text style={styles.btnText}> Profil verwarnen </Text>
                    </TouchableHighlight>
                </ButtonContainer>
                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._profilLoeschen(rowData.pID)}>
                        <Text style={styles.btnText}> Profil löschen </Text>
                    </TouchableHighlight>
                </ButtonContainer>
            </View>
        )
    }

    render() {
        return (
            <ViewContainer>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Offene Fälle
                    </Text>
                </View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {return this.renderRow(rowData)}}>
                </ListView>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._refresh(this)}>
                        <Text style={styles.btnText}> Aktualisieren </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToAdminMenue()}>
                        <Text style={styles.btnText}> Zurück </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <StatusBarBackground />
            </ViewContainer>
        );
    }
	
    _refresh(self) {
        var callbacks = {
            success: function (data) {
                console.log(data);

                if (data.length > 0) {

                    for (var i = 0; i < data.length; i++) {

                        //var reported = data[i].reported.toString();
						var reported = data[i].reported;
						
                        if(reported === true) {
                            var newReportedUser = data[i].firstname + " " + data[i].lastname;
                           // self._add(newReportedUser, data[i]);
                            self._add(newReportedUser, data[i]._id, data[i].user_id);
                        }
                    }
                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'Eh nicht!?'}]);

                /*
                Manchmal tritt der Fehler auf, manchmal nicht. ARRHGHGH!?
                Aber es funktioniert. So what?
                 */
            }
        };

        var db = Database.getInstance();
        db.profile.findAll(callbacks);
    }

    _add(user, pID, uID) {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        })

        data = data.concat([{User: user, pID: pID, uID: uID}]);
        this.setState({dataSource: ds.cloneWithRows(data)});
    }

    _fallAblehnen(pID) {
        // Reported-Flag des Users in der Datenbank auf false setzen

        var callbacks = {
            success: function (data) {
                console.log(data);

                data[0].reported = false;

                db.profile.update(data[0]);
				//_refresh();
                Alert.alert('Fall ablehnen', "Der Fall wurde abgelehnt.", [{text: 'Okay'}]);
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'Eh nicht!?'}]);
            }
        };

        var db = Database.getInstance();
        db.profile.findById(pID, callbacks);
    }

    _profilVerwarnen(pID) {
        // Verwarnung-Flag des Users in der Datenbank auf true setzen
        // Reported-Flag des Users in der Datenbank auf false setzen

        var callbacks = {
            success: function (data) {
                console.log(data);

				// An dieser Stelle: Verwarnen -> Eine Nachricht an den User schicken

                db.profile.update(data[0]);
                Alert.alert('Profil verwarnt', "Das Profil wurde verwarnt.", [{text: 'Okay'}]);
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'Eh nicht!?'}]);
            }
        };

        var db = Database.getInstance();
        db.profile.findById(pID, callbacks);
    }

    _profilLoeschen(pID) {

            var callbacks = {
                success: function (data) {
                    console.log(data);

                    db.profile.delete(data[0]);
                    Alert.alert('Profil gelöscht', "Das Profil wurde gelöscht.", [{text: 'Okay'}]);
                },
                error: function (error) {
                    console.log(error);
                    Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'Eh nicht!?'}]);
                }
            };

        var db = Database.getInstance();
        db.profile.findById(pID, callbacks);
    }

    _navigateToAdminMenue() {
        this.props.navigator.push({
            ident: "Admin"
        })
    }

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
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
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputContainerView: {
        flexDirection: 'row',
        marginTop: 10,
        padding: 10
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
        alignSelf: 'center',
        marginTop: 6
    },
    button: {
        flex: 1,
        height: 20,
        backgroundColor: '#48afdb',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 150,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 50
    },
    text: {
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#d7d7d7'
    },
    selectionText: {
        fontSize: 15,
        paddingTop: 3,
        color: '#b5b5b5',
        textAlign: 'right'
    },
    personRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"

    },
    personName: {
        flexDirection: "row"
    },
    inputListView: {
        padding: 5,
        marginRight: 50,
        marginLeft: 50,
        flex: 1,
        alignSelf: "flex-start"
    }
});

module.exports = AdminOpenCasesScreen;
