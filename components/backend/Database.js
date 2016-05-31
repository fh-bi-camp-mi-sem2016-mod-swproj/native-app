/**
 * Created by dbene on 20.05.2016.
 */

'use strict';
import React, { Component, Alert } from 'react-native';
import User from './User';

class Database {
    connection = {
        server:"",
        user:"",
        password:"",
        database:""
    };

    constructor(pServer, pUser, pPassword, pDatabase) {
        this.connection.server = pServer;
        this.connection.user = pUser;
        this.connection.password = pPassword;
        this.connection.database = pDatabase;
    }

    _login(pEMail, pPassword)
    {
        var result = 'failed';
        var docID = "/user_" + pEMail;

         var test = "https://"
         + this.connection.user + ":"
         + this.connection.password + "@"
         + this.connection.server + "/"
         + this.connection.database + "/"
         + docID;

        fetch(test)
            .then((response) => response.text())
            .then((responseText) => {
                console.log(responseText);

                var doctype = '';

                var id = '';
                var firstname = '';
                var lastname = '';
                var password = '';
                var birthdate = '';
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
                        birthdate = v;
                    } else if (k == 'sex'){
                        sex = v;
                    }
                });

                if(doctype == 'user') {
                    if (pPassword == password) {

                        User.currentUser = new User(id, firstname, lastname, password, birthdate, sex);

                        // Debug ausgabe
                        console.log(User.currentUser.firstname + " " + User.currentUser.lastname + " hat am "
                            + User.currentUser.birthdate + " Geburtstag und ist " + User.currentUser.sex + ".");

                    } else {
                        Alert.alert('Fehler', "Das Passwort passt nicht zum Benutzer" , [{text: 'ok'}])
                    }
                } else {
                    Alert.alert('Fehler', "Den Benutzer gibt es nicht!" , [{text: 'ok'}])
                }

            }).catch((error) => {
            console.warn(error);
        });

        // Debug ausgabe
        console.log(User.currentUser.firstname + " " + User.currentUser.lastname + " hat am "
            + User.currentUser.birthdate + " Geburtstag und ist " + User.currentUser.sex + ".");

        return result;
    }


    _getDocument(pID)
    {
        var result = "getDocument failed";

        var document = "https://"
            + this.connection.user + ":"
            + this.connection.password + "@"
            + this.connection.server + "/"
            + this.connection.database + "/"
            + pID;

        fetch(document)
            .then((response) => response.text())
            .then((responseText) => {

                result = responseText;

                // wird korrekt ausgegeben
                console.log(result);


            }).catch((error) => {
            console.warn(error);
        });

        // result hat immernoch den wert "getDocument failed"
        Alert.alert('_getDocument', result , [{text: 'ok'}]);

        return result;
    }

}

module.exports = Database;
