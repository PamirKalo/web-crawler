'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Years", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2018-03-13T13:50:23.424Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Years",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "producedYear": {
                "type": Sequelize.INTEGER
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
