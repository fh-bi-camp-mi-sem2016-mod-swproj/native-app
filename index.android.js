/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Fetch, AppRegistry, Component, StyleSheet, Text, View, TouchableHighlight, button, TextInput, Image, Alert, ListView} from 'react-native';


class findme extends Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            ds:[{User1: "Ruben", Info1: "beleidigung"},
                {User2: "Bene", Info2: "belästigung"},
                {User3: "Dennis", Info3: "geilheit"},
                {User4: "Florian", Info4: "dauerdruck"},
                {User5: "Fynn", Info5: "Wasser"}],
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
            <TouchableHighlight
                underlayColor='#ddd'>
                <View style={styles.row}>
                    <Text style={{fontSize:18}}>
                        {rowData.User1}
                        {rowData.User2}
                        {rowData.User3}
                        {rowData.User4}
                        {rowData.User5}</Text>
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
                    <Text style={styles.text}>
                          </Text>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}>
                    </ListView>
                </View>
                <TouchableHighlight style ={styles.button} onPress={()=>this._createUser("test@mail.de","meier70")}>
                    <Text style={styles.btnText}> melden </Text>
                </TouchableHighlight>

            </View>


        );
    }
    showAlert()
    {
        Alert.alert('Awesome', 'pushed the Button', [{text: 'ok'}])
    }

	
    _login(pEMail, pPassword)
    {
        fetch('https://couchdb.cloudno.de/findme/user_' + pEMail)
            .then((response) => response.text())
            .then((responseText) => {console.log(responseText);

            //Alert.alert('Rückgabe', pEMail + " - " +  pPassword, [{text: 'ok'}])

            var doctype;

            var id;
            var firstname;
            var lastname;
            var password;
            var birthdate;
            var sex;

            JSON.parse(responseText, function(k, v) {
                if(k == 'doctype'){
                    doctype = v;
                } else if(k == '_id'){
                    id = v;
                } else if (k == 'firstname'){
                    firstname = v;
                } else if (k == 'lastname'){
                    lastname = v;
                } else if (k == 'password'){
                    password = v;
                } else if (k == 'birthdate'){
                    birthdate = v;
                } else if (k == 'sex'){
                    sex = v;
                }
                console.log(k + ": " + v);
                //Alert.alert('Rückgabe', k+": "+ v , [{text: 'ok'}])
            });

            if(doctype == 'user') {
                if (pPassword == password) {
                    var user = new User(id, firstname, lastname, password, birthdate, sex);

                    Alert.alert('Rückgabe', user.firstname + " " + user.lastname + " hat am "
                        + user.birthdate + " Geburtstag und ist " + user.sex + ".", [{text: 'ok'}])
                } else {
                    Alert.alert('Fehler', "Das Passwort passt nicht zum Benutzer" , [{text: 'ok'}])
                }
            } else {
                Alert.alert('Fehler', "Den Benutzer gibt es nicht!" , [{text: 'ok'}])
            }


		}).catch((error) => {
			console.warn(error);
		});
    }

    _createUser(pEMail, pPassword){
        Alert.alert('Fehler', 'https://couchdb.cloudno.de/findme/user_' + pEMail + ' -d "{ " password " : " pPassword " }" ' , [{text: 'ok'}])

        /*
        fetch('https://couchdb.cloudno.de/findme/user_' + pEMail + ' -d "{ " password " : " pPassword " }" ', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: 'user_' + pEMail,
                password: pPassword,
            })
        })
        */
    }
}

function User (pID, pFirstname, pLastname, pPassword, pBirthdate, pSex) {
    this.id = pID;
    this.firstname = pFirstname;
    this.lastname = pLastname;
    this.password = pPassword;
    this.birthdate = pBirthdate;
    this.sex = pSex;
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
    }
});




AppRegistry.registerComponent('findme', () => findme);
