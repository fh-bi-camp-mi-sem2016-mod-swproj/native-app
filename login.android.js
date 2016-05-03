/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert,} from 'react-native';


var bild = {posters: {thumbnail: 'http://q-review.co.uk/wp-content/uploads/2014/03/your-logo-here.png'}};


class findme extends Component {
    render() {
        return (
            <View style={styles.appContainer}>
                <View style={styles.titleView}>

                    <Image style={styles.thumbnail}
                           source={{uri: bild.posters.thumbnail}}
                    />

                    <Text style={styles.titleText}>
                       Welcome to Find.me
                    </Text>
                </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Login :
                        </Text>
                        <TextInput style={styles.input} onChangeText={(text) => this.setState({text})} placeholder="Username">

                        </TextInput>
                    </View>

                    <View style={styles.inputContainerView}>
                        <Text style={styles.text}>
                            Password :
                        </Text>
                        <TextInput style={styles.input} onChangeText={(text) => this.setState({text})} placeholder="****">

                        </TextInput>
                    </View>

                <TouchableHighlight style ={styles.button} onPress={this.showAlert}>
                    <Text style={styles.btnText}> Einloggen </Text>
                </TouchableHighlight>

            </View>


        );
    }

    showAlert(){
        Alert.alert('Awesome', 'pushed the Button', [{text: 'ok'}])
    }
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1
    },
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
        alignSelf: 'center',
        marginTop:6
    },
    button: {
        flex: 2,
        height: 36,
        backgroundColor: '#48afdb',
        justifyContent: 'center',
        borderRadius: 4,
        margin: 75
    },
    text: {
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    }
});


AppRegistry.registerComponent('findme', () => findme);
