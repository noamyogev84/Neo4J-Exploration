import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class GraphQuery {

  constructor(httpClient) {
    this._http = httpClient;
  }

  executeOnGraph(command, params) {
    var self = this; // closure
    return new Promise(function(resolve,reject) {
      self._http.fetch('http://localhost:3000/commands', {
        method: 'post',
        body: json({command: command, params: params})
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
  }
}
