/**
 * Created by dbene on 20.05.2016.
 */

'use strict';

import CouchDbApi from '../../node_modules/findme-react-couchdb-api'
import DaoManager from '../../node_modules/findme-react-couchdb-api'

var Database = (function () {
    var instance;

    function createInstance() {
        var connSettings = require("./conn-settings.js");

        var object = new DatabaseClass(connSettings);
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


class DatabaseClass {
    user;
    msg;
    pic;

    constructor(connSettings) {
        var dm = new CouchDbApi.DaoManager(connSettings);

        this.user = dm.getDao(CouchDbApi.UserDAO);
        this.msg = dm.getDao(CouchDbApi.MessageDAO);
        this.pic = dm.getDao(CouchDbApi.PictureDAO);
    }


}

module.exports = Database, DatabaseClass;
