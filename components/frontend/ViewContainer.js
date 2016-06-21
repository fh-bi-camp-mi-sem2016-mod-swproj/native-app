/**
 * Created by Dennis on 17.05.2016.
 */
'use strict';
import React, { Component, View } from 'react-native'

class ViewContainer extends Component {
    render() {
        return (
            <View style={styles.viewContainer}>
                {this.props.children}
            </View>
        )
    }
}

const styles = React.StyleSheet.create({

    viewContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: "#F5FCFF"
    }

})

module.exports = ViewContainer;