/**
 * Created by Dennis on 18.05.2016.
 */

import React, {AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert,} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'

class PraeferenzScreen extends Component {
    

    render() {
        return (
            <ViewContainer>

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Welcome to Find.me
                    </Text>
                        <Text style={styles.titleText}>
                        Praeferenz:
                    </Text>
                </View>
                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToHauptMenue()}>
                        <Text style={styles.btnText}> Back </Text>
                     </TouchableHighlight>
                </ButtonContainer>

                <StatusBarBackground/>

            </ViewContainer>


        );
    }
    _navigateToHauptMenue(){
        this.props.navigator.push({
            ident: "Haupt"
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
    thumbnail: {
        marginBottom: 10,
        width: 300,
        height: 200
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
    text: {
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    }
});

module.exports = PraeferenzScreen;
