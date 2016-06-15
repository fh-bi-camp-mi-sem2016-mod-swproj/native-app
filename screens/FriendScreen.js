/**
 * Created by Dennis on 18.05.2016.
 */
import React, {AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert, ListView} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import ButtonContainer from '../components/frontend/ButtonContainer'

var data;

class FriendScreen extends Component {

    constructor(props){
        super(props);

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
            <View style={styles.inputListView}>
                <Text style={{fontSize:18}}>
                    {rowData.User +" "+ rowData.Info}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <ViewContainer>

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Welcome to Find.me
                    </Text>
                    <Text style={styles.titleText}>
                        FriendZone:
                    </Text>
                </View>
                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._navigateToSearchScreen()}>
                        <Text style={styles.btnText}> suchen </Text>
                    </TouchableHighlight>
                </ButtonContainer>
                <ViewContainer>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => {return this.renderRow(rowData)}}>
                    </ListView>

                </ViewContainer>


                <ButtonContainer>
                    <TouchableHighlight onPress={(event) => this._add()}>
                        <Text style={styles.btnText}> add </Text>
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
        this.props.navigator.push({
            ident: "Main"
        })
    }

    _navigateToSearchScreen() {
        this.props.navigator.push({
            ident: "UserSearch"
        })
    }
    _add(){
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        //data.push({User: "Test", Info: "Bla"});
        data = data.concat([{User: "Test2", Info: "Blup"}]);
        this.setState({dataSource: ds.cloneWithRows(data) });
        //concat bei Liste
        Alert.alert('Test', data[5].User+" "+data[5].Info, [{text: 'ok'}]);
        //Alert.alert('Test', data[6].User+" "+data[6].Info, [{text: 'ok'}]);
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
    },
    inputListView: {
        padding: 5,
        marginRight: 50,
        marginLeft: 50,
        flex: 1,
        alignSelf: "flex-start"
    }
});

module.exports = FriendScreen;