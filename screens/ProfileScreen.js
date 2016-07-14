/**
 * Created by Benedikt on 29.06.2016.
 */
import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    button,
    TextInput,
    Alert,
    Label,
    Image,
    ScrollView,
    ListView
} from 'react-native';

import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

import User from './../components/backend/User'
import Database from "./../components/backend/Database"

var instance;
var data = [];
var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
});

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;

        instance._loadPictures();

        instance.state = {
            dataSource: ds.cloneWithRows(data),
            avatarSource: require('./placeholder.png')
        };
    }

    render() {
        return (
            <ViewContainer>
                <ScrollView>

                    <Icon.ToolbarAndroid
                        style={styles.toolbarView}
                        actions={[
                            {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                            {title: 'ChangeProfile', iconName:'edit', iconSize: 30,  show: 'always'},
                            {title: 'Home', iconName:'home', iconSize: 30,  show: 'always'},
                            {title: 'Refresh', iconName:'refresh', iconSize: 30,  show: 'always'},
                            {title: 'Logout', iconName:'sign-out', iconSize: 30,  show: 'always'}
                        ]}
                        onActionSelected={this._onActionSelected}
                    />

                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Profile:
                        </Text>

                        <Image style={styles.thumbnail}
                               source={this.state.avatarSource}
                               style={{width: 300, height: 300}}
                        />
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Vorname:
                        </Text>
                        <Text style={styles.input}>
                            {User.getInstance().tag.profileForShowProfile.firstname}
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Nachname:
                        </Text>
                        <Text style={styles.input}>
                            {User.getInstance().tag.profileForShowProfile.lastname}
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            E-Mail:
                        </Text>
                        <Text style={styles.input}>
                            {User.getInstance().tag.profileForShowProfile.email}
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Geburtstag:
                        </Text>
                        <Text style={styles.input}>
                            {instance._parseTimestamp(User.getInstance().tag.profileForShowProfile.birthday)}
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Geschlecht:
                        </Text>
                        <Text style={styles.input}>
                            {instance._parseGender(User.getInstance().tag.profileForShowProfile.gender)}
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Familienstatus:
                        </Text>
                        <Text style={styles.input}>
                            {instance._parseFamilystatus(User.getInstance().tag.profileForShowProfile.familystatus)}
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Kinder:
                        </Text>
                        <Text style={styles.input}>
                            {User.getInstance().tag.profileForShowProfile.children}
                        </Text>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Über mich:
                        </Text>
                        <Text style={styles.input}>
                            {User.getInstance().tag.profileForShowProfile.aboutme}
                        </Text>
                    </View>

                    <ViewContainer>
                        <ListView
                            style={styles.marginRow}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => {return this.renderRow(rowData)}}>
                        </ListView>
                    </ViewContainer>

                </ScrollView>
            </ViewContainer>

        );
    }

    renderRow(rowData) {
        return (
            <View style={styles.pictureRow}>
                <Image style={styles.thumbnail}
                       source={{uri: rowData.imgSource}}
                       style={{width: 300, height: 300}}
                />
            </View>
        )
    }

    _addListViewRow(pSource) {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        data = data.concat([{imgSource: pSource}]);
        this.setState({dataSource: ds.cloneWithRows(data)});
    }

    _parseTimestamp(pTimestamp) {
        var date = new Date(pTimestamp * 1000);

        return date.toLocaleDateString();
    }

    _parseFamilystatus(pStatus) {
        switch (pStatus) {
            case 0:
                return "Single";
            case 1:
                return "Geschieden";
            case 2:
                return "Verheiratet";
            default:
                return "It's complicated";
        }
    }

    _parseGender(pGender) {
        switch (pGender) {
            case 0:
                return "Weiblich";
            case 1:
                return "Männlich";
            default:
                return "Sonstiges";
        }
    }


    _loadPictures() {
        data = [];
        instance._loadAvatar();
        instance._loadProfilPicture();
    }

    _loadAvatar() {
        var db = Database.getInstance();

        var callbacksAvatar = {
            success: function (data) {
                console.log(data);

                if (data.length == 1 && typeof data[0] != 'object') {
                    instance.state.avatarSource = {uri: data[0]};
                    instance.forceUpdate();
                }

            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        if (User.getInstance().tag.profileForShowProfile.profilepic != "<uuid>") {
            db.pic.findAttachmentURLsById(User.getInstance().tag.profileForShowProfile.profilepic, callbacksAvatar);
        }
    }

    _loadProfilPicture() {
        var db = Database.getInstance();

        var callbacks = {
            success: function (data) {
                console.log(data);

                if (typeof data[0] != 'object') {
                    for (var i = 0; i < data.length; i++) {
                        instance._addListViewRow(data[i]);
                    }

                    instance.forceUpdate();
                }

            },
            error: function (error) {
                console.log(error);
                Alert.alert('Fehler', "Es gab einen Fehler bei der Datenbankanfrage.", [{text: 'ok'}]);
            }
        };

        db.pic.findAttachmentURLsByProfile(User.getInstance().tag.profileForShowProfile._id, callbacks);
    }

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }

    _navigateToChangeProfileScreen() {
        this.props.navigator.push({
            ident: "ChangeProfile"
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
                instance._navigateToChangeProfileScreen();
                break;
            case 2:
                instance._navigateToMainMenue();
                break;
            case 3:
                instance._loadPictures();
                break;
            case 4:
                User.getInstance(1);
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
        marginRight: 100
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
        flexDirection: 'row',
        padding: 5,
        height: 25
    },
    marginRow: {
        marginBottom: 20
    },
    listRow: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginLeft: 50,
        marginTop: 10,
        height: 30
    },
    pictureRow: {
        width: 300,
        height: 300,
        alignSelf: 'center'
    }
});

module.exports = ProfileScreen;
