export interface Pokemon {
  id: string
  name: string
  height: string
  weight: string
  abilities: AbilityMeta[]
  moves: MoveMeta[]
  types: PokeType[]
  speciesUrl: string
  sprites: string[]
}

export interface AbilityMeta {
  name: string
  url: string
}

export interface Ability {
  name: string
  effect: string
}

export interface MoveMeta {
  name: string
  url: string
}

export interface Move {
  name: string
  flavorText: string
  damageClass: string
  type: string
  pp: number
}

export interface RecentView {
  name: string
  id: string
}

export enum PokeType {
  NORMAL = 'normal',
  FIGHTING = 'fighting',
  FLYING = 'flying',
  POISON = 'poison',
  GROUND = 'ground',
  ROCK = 'rock',
  BUG = 'bug',
  GHOST = 'ghost',
  STEEL = 'steel',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  PYSCHIC = 'psychic',
  ICE = 'ice',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
  UNKNOWN = 'unknown',
  SHADOW = 'shadow'
}