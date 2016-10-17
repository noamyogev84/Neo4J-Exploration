import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GraphQuery} from '../modules/graphQuery';
import {Commands} from '../modules/commands';

@inject(GraphQuery,EventAggregator)
export class Players {

  constructor(graphQuery,eventAggregator) {
    this._query = graphQuery;
    this._ea = eventAggregator;
    this._isInitialized = false;
    this.players = [];
  }

  async initialize() {
    if(this._isInitialized)
      return;
    this.players = await this._query.executeOnGraph(Commands.getAllPlayers())
    this._isInitialized = true;
  }

  async removePlayer(playerId) {
    if(!this._isInitialized)
      await this.initialize();
    var res = await this._query.executeOnGraph(Commands.removePlayer(),playerId)
    if(!res)
      return false;
    var index = this.players.map(e => e._id).indexOf(playerId);
    this.players.splice(index,1);
    this._ea.publish('nodeRemoved',playerId)
    console.log("remove player " + playerId + " successful");
    return true;
  }

  async getPlayersCount() {
    if(!this._isInitialized)
      await this.initialize();
    return this.players.length;
  }

  async addPlayer(player) {
    if(!this._isInitialized)
      await this.initialize();
    var res = await this._query.executeOnGraph(Commands.addPlayer(),player); //TODO: check result
    this.players.push(res)
    this._ea.publish('nodeAdded',res);
    return res;
  }
}

