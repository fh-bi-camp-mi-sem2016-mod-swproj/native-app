/**
 * Created by Dennis on 18.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'

class HauptMenueScreen extends Component {


    render() {
        return (
             <ViewContainer>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Welcome to Find.me
                        </Text>
                        <Text style={styles.titleText}>
                            Hauptmenue:
                        </Text>
                    </View>
                 <ButtonContainer>
                     <TouchableHighlight onPress={(event) => this._navigateToProfile()}>
                         <Text style={styles.btnText}> Zum Profile </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                 <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToPraeferenzScreen()}>
                        <Text style={styles.btnText}> Zu den Praeferenzen </Text>
                    </TouchableHighlight>
                 </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToFreundes()}>
                        <Text style={styles.btnText}> Zum FreundesKreis </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                 <ButtonContainer>
                     <TouchableHighlight onPress={(event) => this._navigateToLogin()}>
                        <Text style={styles.btnText}> Log Out </Text>
                    </TouchableHighlight>
                 </ButtonContainer>
                 <StatusBarBackground />
             </ViewContainer>


        );
    }
    _navigateToLogin(){
        this.props.navigator.push({
            ident: "Login"
        })
    }
    _navigateToFreundes(){
        this.props.navigator.push({
            ident: "Freundes"
        })
    }
    _navigateToPraeferenzScreen(){
        this.props.navigator.push({
            ident: "Praeferenz"
        })
    }
    _navigateToProfile(){
        this.props.navigator.push({
            ident: "Profile"
        })
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

module.exports = HauptMenueScreen;