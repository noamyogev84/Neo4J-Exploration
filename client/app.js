
export class App {

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:["", "players"], moduleId:"components/players/playersGrid",
      title:"Players", nav:true},

      { route:"edit-player/:id", moduleId:"components/edit-player/editPlayer",
      title:"Edit Player", nav:false}
    ]);
  }

}
