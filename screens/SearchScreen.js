/**
 * Created by Dennis on 31.05.2016.
 */

import React, {Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, ListView, Alert} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'

class SearchScreen extends Component {

    state = {
        //zum Testen
        suchstring: 'Meier'
    };

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            ds:[{User: "Ruben"},
                {User: "Bene"},
                {User: "Dennis"},
                {User: "Florian"},
                {User: "Fynn"},
                {User: "Franz"},
                {User: "Meier"},
                {User: "Johann"},
                {User: "Ulli"},
                {User: "Jens"}],
            dataSource:ds
        }
    }

    componentDidMount(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.state.ds)
        })

    }
    renderRow(rowData) {
        return (
            <View>
                <Text style={{fontSize:18}}>
                    {rowData.User}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <ViewContainer>
                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        User:
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={suchstring => this.setState({suchstring})}
                        placeholder="searched user">
                    </TextInput>
                </View>
                <ButtonContainer>
                    <TouchableHighlight onPress= {() => this.showAlert(this.state.suchstring)}>
                        <Text style={styles.btnText}> search </Text>
                    </TouchableHighlight>
                </ButtonContainer>
                <ViewContainer>
                    <ListView
                        style={styles.inputContainerView}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}>
                    </ListView>
                </ViewContainer>
                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToFriendScreen()}>
                        <Text style={styles.btnText}> Back </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <StatusBarBackground/>

            </ViewContainer>


        );
    }
    _navigateToFriendScreen(){
        this.props.navigator.push({
            ident: "Friend"
        })
    }

    showAlert(pSearchString){
        Alert.alert('User:', pSearchString , [{text: 'ok'}])
    }

    _search(){
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

module.exports = SearchScreen;
