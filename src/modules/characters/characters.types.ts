// I noticed that you used both type and interfaces, heres the quote to understand the difference

// "Type aliases and interfaces are very similar,
// and in many cases you can choose between them freely.
// Almost all features of an interface are available in type,
// the key distinction is that a type cannot be re-opened to add new properties
// vs an interface which is always extendable."

// usual practice is to use INTERFACE for objects and TYPE for union types, aliases, etc.

// example:

export interface Car {
  engineId: number;
  horsePower: number;
}

export type TBrake = 'disc' | 'caliper' | 'counter';

export interface Bicycle {
  totalGears: number;
  brakeType: TBrake;
}

export type Vehicle = Car | Bicycle;

// end of example

// All types that are related to bussiness logic entities, goes into <moduleName>.types.ts

// Often used interface naming convention is to prefix the name with letter "I"
// otherwise its often  confusing if something is actual value or an interface 

// export interface ICharacter {
export interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
}



// This two are examples of bad naming
// we cant tell only from the name where those interfaces are used
// its better to expand the name with the api endpoint 


// export interface IFetchCharactersQueryParams {
export interface QueryParams {
  page: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}


// export interface IFetchCharactersApiData {
export interface ApiData {
  results: Character[];
}

