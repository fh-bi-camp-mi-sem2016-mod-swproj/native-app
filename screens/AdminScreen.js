/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Fetch, AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert, ListView, TouchableOpacity} from 'react-native';
import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import _ from 'lodash'

class AdminScreen extends Component {

/*    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
        this.state = {
            peopleDataSource: ds.cloneWithRows(people)
        }
    }

    _renderPersonRow(person) {
        return (
            <TouchableOpacity style={styles.personRow} onPress={(event) => console.log(person)}>
                <Text
                    style={styles.personName}> {`${_.autoCapitalize(person.firstName)} ${_.autoCapitalize(person.lastName)}`} </Text>
                <View style={{flex: 1}}/>
                <Text> ein tolles ICON</Text>
            </TouchableOpacity>
        )
    }
}*/
    
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            ds:[{User: "Ruben", Info: "beleidigung"},
                {User: "Bene", Info: "belästigung"},
                {User: "Dennis", Info: "geilheit"},
                {User: "Florian", Info: "dauerdruck"},
                {User: "Fynn", Info: "Wasser"}],
            dataSource:ds
        }
    }
    componentDidMount(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(people)
        })

    }
    renderRow(rowData) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'>
                <View style={styles.row}>
                    <Text style={{fontSize:18}}>
                        {rowData.User}
                        </Text>
                    <TouchableHighlight style={{flex: 2, borderRadius: 4, backgroundColor: '#48afdb', justifyContent: 'center'}} onPress={this.showAlert}>
                        <Text style={{fontSize:15, color:'#fff', textAlign: 'center'}}> show </Text>
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.appContainer}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Administration
                    </Text>
                    <ListView
                        //style = {{marginTop: 100}}
                        //dataSource={this.state.peopleDataSource}
                        //renderRow={(person) =>{ return this._renderPersonRow(person)}}/>
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}>
                    </ListView>

                </View>
                <TouchableHighlight style ={styles.button} onPress={this.showAlertBenutzer}>
                    <Text style={styles.btnText}> melden </Text>
                </TouchableHighlight>

            </View>


        );
    }
    showAlert()
    {
        Alert.alert('Awesome', 'Hier sollte was sinnvolles kommen!', [{text: 'ok'}])
    }
    showAlertBenutzer(){

        Alert.alert('Gemeldeter Benutzer: ','hier steht der gemeldete Benutzer', [{text: 'ok'}])
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
        flex: 1,
        height: 20,
        backgroundColor: '#48afdb',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 150,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 50
    },
    text: {
        flexDirection: 'row',
        padding: 5,
        height: 20,
        margin: 10
    },
    row:{
        flex:1,
        flexDirection:'row',
        padding:10,
        borderBottomWidth: 1,
        borderColor: '#d7d7d7'
    },
    selectionText:{
        fontSize:15,
        paddingTop:3,
        color:'#b5b5b5',
        textAlign:'right'
    },



    personRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"

    },

    personName: {
        flexDirection: "row"
    }
});

module.exports = AdminScreen