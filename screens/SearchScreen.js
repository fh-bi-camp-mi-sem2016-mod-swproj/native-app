/**
 * Created by Dennis on 31.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, ListView, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';


var data = [];
var searchInstanz;

class SearchScreen extends Component {

    state = {
        suchstring: ''
    };

    constructor(props){
        super(props);
        searchInstanz = this;

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }

    renderRow(rowData) {
        return (
            <View style = {styles.listRow}>
                <Text>
                    {rowData.firstname + " " + rowData.lastname}
                </Text>
                <View style = {styles.iconRow}/>
                <TouchableHighlight onPress={() => this._setFriend(rowData.profile_id, 2)}>
                    <Icon name = "plus-square"
                          size = {20}
                    />
                </TouchableHighlight>

                <TouchableHighlight style = {styles.button} onPress={() => this._delete(rowData.profile_id, 2)}>
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
                    <TouchableHighlight onPress= {() => this.showAlert(this.state.suchstring)}>
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
    _navigateToFriendScreen(){
        this.props.navigator.pop()
    }
    _navigateToMainMenue(){
        this.props.navigator.push({
            ident: "Main"
        })
    }
    _navigateToLoginScreen(){
        this.props.navigator.push({
            ident: "Login"
        })
    }

    showAlert(pSearchString){
        Alert.alert('User:', pSearchString , [{text: 'ok'}])
    }

    _onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            searchInstanz._navigateToFriendScreen();
        }
        if (position === 1) { // index of 'Settings'
            searchInstanz._navigateToMainMenue();
        }
        if (position === 2) {
            Alert.alert("","Sie wurden ausgeloggt",[{text: 'ok'}]);
            searchInstanz._navigateToLoginScreen();
        }
    }

    _addSearchedProfilesToListView(self, pProfileId) {

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
                        self._searchProfiles(self, data[0].friends[i].id, data[0].friends[i].status);
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

    _searchProfiles(self, pProfileId) {

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
                    if( (data[0].firstname * " " + data[0].lastname).indexOf(suchstring) > -1 ){
                        self._addSearchedProfilesToListView(data[0].firstname, data[0].lastname, pProfileId);   
                    }
                    else if ( data[0].firstname.indexOf(suchstring) > -1 ){
                        self._addSearchedProfilesToListView(data[0].firstname, data[0].lastname, pProfileId);
                    }
                    else if ( data[0].lastname.indexOf(suchstring) > -1 ){
                        self._addSearchedProfilesToListView(data[0].lastname, data[0].lastname,  pProfileId);
                    }
                    else {
                        Alert.alert('Fehler', "Die gesuchte Person existiert nicht", [{text: 'ok'}]);
                    }
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