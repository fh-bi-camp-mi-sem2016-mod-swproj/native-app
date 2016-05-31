/**
 * Created by dbene on 20.05.2016.
 */

'use strict';
import React from 'react-native'

class Profile {

    id="";
    email="";
    firstname="";
    lastname="";
    birthday="";
    sex="";
    aboutme="";


    constructor(pID, pEmail, pFirstname, pLastname, pBirthday, pSex, pAboutme) {
        this.id = pID;
        this.email = pEmail;
        this.firstname = pFirstname;
        this.lastname = pLastname;
        this.birthday = pBirthday;
        this.sex = pSex;
        this.aboutme = pAboutme;
    }

}
module.exports = Profile;
