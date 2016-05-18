/**
 * Created by Dennis on 18.05.2016.
 */
import React, {AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert,} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'


class FreundesScreen extends Component {


    render() {
        return (
            <ViewContainer>
                    <View style={styles.titleView}>
                        <Text>
                            Welcome to Find.me
                        </Text>
                        <Text style={styles.titleText}>
                           FreundesKreis:
                         </Text>
                     </View>
                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToHauptMenue()}>
                        <Text style={styles.btnText}> Back </Text>
                    </TouchableHighlight>
                </ButtonContainer>
                <StatusBarBackground />
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

module.exports = FreundesScreen;