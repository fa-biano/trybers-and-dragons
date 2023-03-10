import Figther from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  private _player2: Figther;
  constructor(player: Figther, player2: Figther) {
    super(player);
    this._player2 = player2;
  }

  fight(): number {
    do {
      this.player.attack(this._player2);
      this._player2.attack(this.player);
    }
    while (this.player.lifePoints > -1 && this._player2.lifePoints > -1);

    return this.player.lifePoints === -1 ? -1 : 1;
  }
}