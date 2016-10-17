import {Players} from './models/players';
import {inject, BindingEngine} from 'aurelia-framework';

@inject(Players,BindingEngine)
export class App {

  constructor(playersProvider,bindingEngine) {
    this._playersProvider = playersProvider;
    this._bindingEngine = bindingEngine;
  }

  async activate() {
    await this._playersProvider.initialize();
    this._playersCount = this._playersProvider.players.length;
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:["","home"], moduleId:"components/home/home",
        title:"Home", nav:true},

      { route:"players", moduleId:"components/players/playersGrid",
        title:"Players", nav:true, settings: {showCount:true}},

      { route:"add-player", moduleId:"components/add-player/addPlayer",
        title:"Add Player", nav:true},


      { route:"edit-player/:id", moduleId:"components/edit-player/editPlayer",
      title:"Edit Player", nav:false}

    ]);
  }

}
