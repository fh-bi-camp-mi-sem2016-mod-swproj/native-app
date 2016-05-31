/**
 * Created by dbene on 20.05.2016.
 */

'use strict';
import React from 'react-native'

class Message {

    from="";
    to="";
    title="";
    text="";
    timestamp="";
    deletedFrom="";
    deletedTo="";

    constructor(pFrom, pTo, pTitle, pText, pTimestamp, pDeletedFrom, pDeletedTo) {
        this.from = pFrom;
        this.to = pTo;
        this.title = pTitle;
        this.text = pText;
        this.timestamp = pTimestamp;
        this.deletedFrom = pDeletedFrom;
        this.deletedTo = pDeletedTo;
    }

}
module.exports = Message;
