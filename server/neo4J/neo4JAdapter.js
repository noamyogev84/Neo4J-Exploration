"use strict";

var neo4j = require('node-neo4j');
var baseUrl = 'http://localhost';
var port = 7474;
var db = new neo4j('http://neo4j:1234@localhost:7474');

var Neo4JAdapter = function() {}

Neo4JAdapter.prototype.getAllPlayers = function(callback) {
    db.readNodesWithLabel('Player',function(err,result){
      if(err) throw err;
        return callback(result);
  });
}

Neo4JAdapter.prototype.addPlayer = function(node,callback) {
    db.insertNode(node,'Player',function(err, result){
      if(err) throw err;
        return callback(result);
  })
}

Neo4JAdapter.prototype.getPlayer = function(id,callback) {
    db.readNode(id,function(err, result){
      if(err) throw err;
        return callback(result);
  })
}

Neo4JAdapter.prototype.executeDBCommand = function(command,params,callback) {
  switch(command) {
    case 'getAllPlayers':
      return this.getAllPlayers(callback);
    case 'addPlayer':
      var node = params;
      return this.addPlayer(node,callback);
    case 'getPlayer':
      var id = params;
      return this.getPlayer(id,callback);
    default:
      //do nothing
  }
}

module.exports = new Neo4JAdapter();
