
export class Player {

  constructor(player) {
    this.id = player._id;
    this.name = player.name;
    this.age = player.age;
    this.points = player.points;
  }

  generateRandomAvatar() {
    let num = Math.floor(5 % parseInt(this.id));
    return "media/small/" + num + ".jpg";
  }
}
