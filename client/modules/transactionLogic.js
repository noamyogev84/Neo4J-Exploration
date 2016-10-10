import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';


@inject(HttpClient)
export class TransactionLogic {

  constructor(httpClient) {
    this.http = httpClient;
  }

  executeCommandOnServer(command, params) {
    var self = this; // closure
    return new Promise(function(resolve,reject) {
      self.http.fetch('http://localhost:3000/commands', {
        method: 'post',
        body: json({command: command, params: params})
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
  }

  async getAllPlayers() {
    console.log("getAllPlayers executed");
    let res = await this.executeCommandOnServer("getAllPlayers");
    return res;
  }

  async saveNewPlayer(player) {
    console.log("addNewPlayer executed");
    let res = await this.executeCommandOnServer("addPlayer",player);
    return res;
  }

  async getPlayer(playerId) {
    console.log("getPlayer executed");
    let res = await this.executeCommandOnServer("getPlayer",playerId);
    return res;
  }

}
