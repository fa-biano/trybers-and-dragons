import { SimpleFighter } from './Fighter';

export default class Monster implements SimpleFighter {
  protected _lifePoints: number;
  private _strength: number;

  constructor() {
    this._lifePoints = 85;
    this._strength = 63;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  attack(enemy: SimpleFighter): void {
    const attackDmg = this._strength;
    enemy.receiveDamage(attackDmg);
  }

  receiveDamage(attackPoints: number): number {
    const decreaseLifePoints = attackPoints;    
    const updateLifePoints = this._lifePoints - decreaseLifePoints;

    if (updateLifePoints <= -1) {
      this._lifePoints = -1;
    } else {
      this._lifePoints = updateLifePoints;
    }

    return this._lifePoints;
  }
}