import {inject} from 'aurelia-framework';
import {TransactionLogic} from '../modules/transactionLogic';

@inject(TransactionLogic)
export class Players {

  constructor(transactionLogic) {
    this._transactions = transactionLogic;
    this._isInitialized = false;
    this._players = [];
    this.playersCount = 0;
  }

  async getPlayers() {
    console.log("players: " + this._isInitialized);
    if(!this._isInitialized)
      await this.initialize();

    return this._players;
  }

  async removePlayer(player) {
    console.log("players: " + this._isInitialized);
    if(!this._isInitialized)
      await this.initialize();
    var res = await this._transactions.removePlayer(player);
    if(!res)
      return false;

    this._players.splice(player,1);
    console.log("remove player " + player + " successful");
    return true;
  }

  async initialize() {
    await this.buildPlayersDictionary();
    this._isInitialized = true;
    console.log("players : " + this.playersCount);
  }

  async buildPlayersDictionary() {
    var data = await this._transactions.getAllPlayers();
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
    var res = await this._transactions.saveNewPlayer(player);
    this._players[res._id] = res;
    return res;
  }
}

