export interface IAPIResponse {
  data: any;
  config: object;
  headers: object;
  request: any;
  status: number;
  statusText: string;
}

export interface ILooseObject {
  [k: string]: any;
}

export interface IDictionaryCategory {
  malts?: IDictionaryEntry[];
  hops?: IDictionaryEntry[];
  yeast?: IDictionaryEntry[];
  other?: IDictionaryEntry[];
}

export interface IDictionaryEntry {
  description: string;
  flavors: string;
  id?: number;
  name: string;
  type?: string;
}

export interface IDictionary {
  hops: IDictionaryEntry[];
  malts: IDictionaryEntry[];
  update: number;
  yeast: IDictionaryEntry[];
  other: IDictionaryEntry[];
}

export interface IRecipe {
  description: string;
  id?: number;
  ingredients: any;
  name: string;
  style: string;
  targetbatchsize: string;
}

export interface IAPIDataResponse {
  [id: number]: IRecipe;
}
