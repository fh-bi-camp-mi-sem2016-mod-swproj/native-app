/**
 * Created by Dennis on 06.06.2016.
 */
import React, {Component, StyleSheet, Text, View, TouchableHighlight, ListView, button, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'

import Database from './../components/backend/Database'

import User from './../components/backend/User'

import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

var posteingang = null;
var data = null;

class MessageScreen extends Component {

    constructor(props) {
        super(props);
        posteingang = this;

        data =[{User: "Ruben", Info: "beleidigung"},
            {User: "Bene", Info: "belästigung"},
            {User: "Dennis", Info: "geilheit"},
            {User: "Florian", Info: "dauerdruck"},
            {User: "Fynn", Info: "Wasser"}];

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
                    {rowData.User + " " + rowData.Info}
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
                        {title: 'Log Out', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Posteingang:
                    </Text>
                </View>

                <ListView
                    style={styles.listViewMargin}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {return this.renderRow(rowData)}}>
                </ListView>

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
        this.props.navigator.pop({
            ident: "Main"
        })
    }
    _navigateToLoginScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }
    navigateToNewMessageScreen() {
        this.props.navigator.push({
            ident: "NewMessage"
        })
    }

    _showUserMessage(pInputUser, pInputMessage){
        Alert.alert('Nachricht:',"User: "+ pInputUser + "\nNachricht: " +pInputMessage, [{text: 'gesendet'}])
    }

    _onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            posteingang._navigateToMainMenue();
        }
        if (position === 1) {
            posteingang.navigateToNewMessageScreen();
        }
        if ( position === 2 ) {
            Alert.alert("", "Sie wurden ausgeloggt", [{text: 'ok'}]);
            posteingang._navigateToLoginScreen();
        }
    }
    _add(){
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
            data = data.concat([{firstname: "bla", lastname: "blup", profile_id: "blip" }]);
            this.setState({dataSource: ds.cloneWithRows(data)});
            instanz._navigateToMainMenue();

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
        height: 30
    },
    Icon: {
        padding: 10,
        marginLeft: 100
    },
    toolbarView: {
        height: 50,
        marginRight: 200
    },
    button: {
        marginRight: 10
    },
    listViewMargin: {
        marginBottom: 20
    }
});

module.exports = MessageScreen;
