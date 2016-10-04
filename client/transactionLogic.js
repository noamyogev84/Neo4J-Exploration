import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';


@inject(HttpClient)
export class TransactionLogic {

  constructor(httpClient) {
    this.http = httpClient;
  }

  executeCommandOnServer(command) {
    this.http.fetch('http://localhost:3000/commands', {
      method: 'post',
      body: json({command: command})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  createPlayer(player) {

  }

  getAllPlayers() {
    console.log("getAllPlayers executed");
    this.executeCommandOnServer("getAllPlayers");
  }


}
