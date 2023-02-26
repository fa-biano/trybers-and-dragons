import Figther, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

export default class PVE extends Battle {
  private _environment: Array<SimpleFighter | Figther>;

  constructor(player: Figther, environment: Array<SimpleFighter | Figther>) {
    super(player);
    this._environment = [...environment];
  }

  fight(): number {
    do {
      this._environment.forEach((env) => this.player.attack(env));
      this._environment.forEach((env) => env.attack(this.player));
    }
    while (
      this.player.lifePoints > -1 
      && this._environment.some((env) => env.lifePoints > -1)
    );

    return this.player.lifePoints === -1 ? -1 : 1;
  }
}