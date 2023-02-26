import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Figther, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Figther {
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _energy: Energy;

  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _dexterity: number;

  constructor(public name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get energy(): Energy {
    const { type_: type } = this._energy;
    const { amount } = this._energy;
    return { type_: type, amount };
  }
  
  attack(enemy: SimpleFighter): void {
    const attackDmg = this._strength;
    enemy.receiveDamage(attackDmg);
  }

  special?(enemy: SimpleFighter): void {
    const specialDmg = this._strength + this._dexterity;
    enemy.receiveDamage(specialDmg);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;

    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }

    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    let decreaseLifePoints = 1;

    if (damage > 0) decreaseLifePoints = damage;
    
    const updateLifePoints = this._lifePoints - decreaseLifePoints;

    if (updateLifePoints <= -1) {
      this._lifePoints = -1;
    } else {
      this._lifePoints = updateLifePoints;
    }

    return this._lifePoints;
  }
}