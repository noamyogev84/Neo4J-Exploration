"use strict";

var neo4j = require('node-neo4j');

//TODO: update to amazon cloud neo4j provider
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

Neo4JAdapter.prototype.updatePlayer = function(id,data,callback) {
  db.updateNodeById(id,data,function(err, result){
    if(err) throw err;
    return callback(result);
  })
}

Neo4JAdapter.prototype.removePlayer = function(id,callback) {
  db.deleteNode(id,function(err, result){
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
      console.log("server addPlayer: " + JSON.stringify(node));
      return this.addPlayer(node,callback);
    case 'getPlayer':
      var id = params;
      return this.getPlayer(id,callback);
    case 'updatePlayer':
      var playerId = params._id;
      var update = {name: params.name,age: params.age,points: params.points};
      return this.updatePlayer(playerId,update,callback);
    case 'removePlayer':
      var playerId = params;
      return this.removePlayer(playerId,callback);
    default:
      //do nothing
  }
}

module.exports = new Neo4JAdapter();
