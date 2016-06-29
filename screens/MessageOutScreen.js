/**
 * Created by Dennis on 27.06.2016.
 */
import React, {Component, StyleSheet, Text, View, TouchableHighlight, ListView, button, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'

import Database from './../components/backend/Database'

import User from './../components/backend/User'

import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

var instance = null;
var data = [];

class MessageOutScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;

        this._showUserMessage(instance, "48cf296b53896d16da217994e001b058");

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
                    {rowData.title + " " + rowData.content}
                </Text>
                <View style = {styles.Icon}/>
                <TouchableHighlight onPress={() => this._showUserMessage(this.state.user, this.state.message)}>
                    <Icon name = "mail-reply"
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
                        {title: 'NewMessage', iconName:'envelope-square', iconSize: 30,  show: 'always'},
                        {title: 'MessageIn', iconName:'inbox', iconSize: 30,  show: 'always'},
                        {title: 'Log Out', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Postausgang:
                    </Text>
                </View>

                <ListView
                    style={styles.listViewMargin}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {return this.renderRow(rowData)}}>
                </ListView>

            </ViewContainer>
        );
    }

    _navigateToMainMenue() {
        this.props.navigator.pop({
            ident: "Main"
        })
    }
    _navigateToLoginScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }
    _navigateToNewMessageScreen() {
        this.props.navigator.push({
            ident: "NewMessage"
        })
    }
    _navigateToMessageInScreen() {
        this.props.navigator.push({
            ident: "Inbox"
        })
    }

    _showUserMessage(self, pID){
        // Alert.alert('Nachricht:',"User: "+ pInputUser + "\nNachricht: " +pInputMessage, [{text: 'gesendet'}])

        var callbacks = {
            success: function (data) {
                console.log(data);

                //Alert.alert('Benutzer', JSON.stringify(data), [{text: 'ok'}]);
                if (data.length == 0) {
                    // User nicht gefunden
                    //Alert.alert('Benutzer', "Ein Benutzer mit diesem Namen konnte nicht gefunden werden.", [{text: 'ok'}]);
                } else if (data.length >= 1) {
                    for(var i = 0; i < data.length; i++){
                        console.log(data[i]);
                        self._addListViewRow("Titel: " + data[i].title,"\n Nachricht: " + data[i].content);
                        //Alert.alert('msg', JSON.stringify(data[i]), [{text: 'ok'}]);

                    }
                }
            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        var db = Database.getInstance();
        db.msg.findByTo(pID, callbacks);
    }



    _onActionSelected(position) {
        switch(position) {
            case 0:
                instance._navigateToMainMenue();
                break;
            case 1:
                instance._navigateToNewMessageScreen();
                break;
            case 2:
                instance._navigateToMessageInScreen();
                break;
            case 3:
                Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
                instance._navigateToLoginScreen();
                break;
        }
    }

    _addListViewRow(pTitle, pContent){
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        data = data.concat([{title: pTitle, content: pContent}]);
        this.setState({dataSource: ds.cloneWithRows(data)});
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
        width: 100,
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    },
    listRow: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginLeft: 50,
        marginTop: 10,
        height: 50
    },
    Icon: {
        padding: 10,
        marginLeft: 100
    },
    toolbarView: {
        height: 50,
        marginRight: 150
    },
    button: {
        marginRight: 10
    },
    listViewMargin: {
        marginBottom: 20
    }
});

module.exports = MessageOutScreen;
