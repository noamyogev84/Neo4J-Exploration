import {inject} from 'aurelia-framework';
import {GraphQuery} from '../modules/graphQuery';
import {Commands} from '../modules/commands';

@inject(GraphQuery)
export class Players {

  constructor(graphQuery,) {
    this._query = graphQuery;
    this._isInitialized = false;
    this._players = [];
    this.playersCount = 0;
  }

  async initialize() {
    await this.buildPlayersDictionary();
    this._isInitialized = true;
    console.log("players : " + this.playersCount);
  }

  async getPlayers() {
    if(!this._isInitialized)
      await this.initialize();

    return this._players;
  }

  async removePlayer(player) {
    if(!this._isInitialized)
      await this.initialize();
    var res = await this._query.executeOnGraph(Commands.removePlayer,player)
    if(!res)
      return false;

    this._players.splice(player,1);
    console.log("remove player " + player + " successful");
    return true;
  }

  async buildPlayersDictionary() {
    var data = await this._query.executeOnGraph(Commands.getAllPlayers())
    for(var i = 0; i < data.length; i++) {
      this._players[data[i]._id] = data[i];
    }
  }

  async getPlayersCount() {
    if(!this._isInitialized)
      await this.initialize();
    return Object.keys(this._players).length;
  }

  async addPlayer(player) {
    if(!this._isInitialized)
      await this.initialize();
    var res = await this._query.executeOnGraph(Commands.addPlayer(),player);
    this._players[res._id] = res;
    return res;
  }
}

