/**
 * Created by Dennis on 17.05.2016.
 */

'use strict'
import React, { Component } from 'react-native'


    
class User {
    
    currentUser="";
    
    user= {
        id:"",
        firstname:"",
        lastname:"",
        password:"",
        birthdate:"",
        sex:""
    }

    constructor(pID, pFirstname, pLastname, pPassword, pBirthdate, pSex) {

        this.id = pID;
        this.firstname = pFirstname;
        this.lastname = pLastname;
        this.password = pPassword;
        this.birthdate = pBirthdate;
        this.sex = pSex;
        
    }
}
module.exports = User
