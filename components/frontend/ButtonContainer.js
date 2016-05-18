/**
 * Created by Dennis on 18.05.2016.
 */
'use strict'
import React, { Component, View } from 'react-native'

class ButtonContainer extends Component {
    render() {
        return (
            <View style={styles.buttonContainer}>
                {this.props.children}
            </View>
        )
    }
}
const styles = React.StyleSheet.create({

    buttonContainer: {
        alignSelf: 'center',
        width: 200,
        height: 32,
        backgroundColor: '#48afdb',
        justifyContent: 'center',
        margin: 5
    }
});

module.exports = ButtonContainer;