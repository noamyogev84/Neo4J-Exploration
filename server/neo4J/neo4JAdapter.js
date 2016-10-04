"use strict";

var neo4j = require('node-neo4j');
var baseUrl = 'http://localhost';
var port = 7474;
var db = new neo4j('http://neo4j:1234@localhost:7474');

var Neo4JAdapter = function() {}

Neo4JAdapter.prototype.getAllPlayers = function() {
  return db.readNodesWithLabel('Player',function(err,result){
    if(err) throw err;
    console.log(result);
  });
}

module.exports = new Neo4JAdapter();
