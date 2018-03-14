'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "allCarsAds", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-13T11:06:18.937Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "allCarsAds",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "title": {
                "type": Sequelize.STRING
            },
            "price": {
                "type": Sequelize.INTEGER
            },
            "year": {
                "type": Sequelize.INTEGER
            },
            "provider": {
                "type": Sequelize.STRING
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
