/**
 * Created by dbene on 20.05.2016.
 */

var Database = (function () {
    var instance;

    function createInstance() {
        var object = new DatabaseClass("couchdb.cloudno.de", "bst.findme", "UmqWPQloCk", "findme");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

'use strict';
import React, { Component, Alert } from 'react-native';
import UserClass from './User';
import User from './User';

class DatabaseClass {

    connection = {
        server:"",
        user:"",
        apikey:"",
        database:""
    };

    constructor(pServer, pUser, pApiKey, pDatabase) {
        this.connection.server = pServer;
        this.connection.user = pUser;
        this.connection.apikey = pApiKey;
        this.connection.database = pDatabase;
    }

    _login(pEMail, pPassword)
    {
        var docID = "/user_" + pEMail;

         var document = "https://"
         + this.connection.user + ":"
         + this.connection.apikey + "@"
         + this.connection.server + "/"
         + this.connection.database + "/"
         + docID;

        fetch(document)
            .then((response) => response.text())
            .then((responseText) => {
                console.log(responseText);

                var doctype = '';

                var id = '';
                var firstname = '';
                var lastname = '';
                var password = '';
                var birthday = '';
                var sex = '';

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
                        birthday = v;
                    } else if (k == 'sex'){
                        sex = v;
                    }
                });

                if(doctype == 'user') {
                    if (pPassword == password) {

                        var userVar = User.getInstance(0);

                        userVar.id = id;
                        userVar.firstname = firstname;
                        userVar.lastname = lastname;
                        userVar.password = password;
                        userVar.birthday = birthday;
                        userVar.sex = sex;

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

}

module.exports = Database, DatabaseClass;
