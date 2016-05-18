/**
 * Created by Dennis on 17.05.2016.
 */
import React, {AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert, Label} from 'react-native';

import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'

import User from '../components/backend/User.js'


class ProfileScreen extends Component {
    render() {
        return (
            <ViewContainer>

                <View style={styles.titleView}>

                    <Text style={styles.titleText}>
                        Welcome to Find.me
                    </Text>
                    <Text style={styles.titleText}>
                        Profile:
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Id:
                    </Text>
                    <Text style={styles.input}>
                        {User.currentUser.id}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Firstname
                    </Text>
                    <Text style={styles.input}>
                        {User.currentUser.firstname}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Lastname:
                    </Text>
                    <Text style={styles.input}>
                        {User.currentUser.lastname}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Password:
                    </Text>
                    <Text style={styles.input}>
                        {User.currentUser.password}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Birthday:
                    </Text>
                    <Text style={styles.input}>
                        {User.currentUser.birthdate}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Sex:
                    </Text>
                    <Text style={styles.input}>
                        {User.currentUser.sex}
                    </Text>
                </View>

                 <ButtonContainer>
                     <TouchableHighlight style ={styles.button} onPress={(event) => this._navigateToHauptMenue()}>
                          <Text style={styles.btnText}> Back </Text>
                     </TouchableHighlight>
                 </ButtonContainer>

                <StatusBarBackground  />
             </ViewContainer>
        )
    }
    _navigateToHauptMenue(){
        User.currentUser="";
        this.props.navigator.push({
            ident: "Haupt"
        })
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
        flexDirection: 'row',
        marginTop: 5,
        padding:10
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
    btnText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    text: {
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    }
});

module.exports = ProfileScreen;
