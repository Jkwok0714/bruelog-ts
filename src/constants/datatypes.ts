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

export interface IDisassembledIngredient {
  name: string;
  amount: string;
  limit: string;
  total: string;
  ratio?: number;
}

export interface ISeries {
  id?: number;
  userid?: number;
  name: string;
  image: string;
  description: string;
}

export interface IBrewStep {
  description?: string;
  time: string;
  gravity?: string;
  temperature?: string;
  amount?: string;
  ingredient?: string;
}

export interface IBrew {
  id?: number;
  userid?: number;
  name: string;
  style: string;
  image: string;
  description: string;
  brewdate: string;
  bottledate: string;
  mash: IBrewStep[];
  boil: IBrewStep[];
  fermentation: IBrewStep[];
  lageringtemp: string;
  length: string; // Lagering length
  bottling: string;
  tastingnote: string;
  archived: number;
  recipeid: number;
  attachments: string;
  notes: string;
  seriesid: number;
  token?: string;
  public: number;
  targetbatchsize: string;
  og: string;
  fg: string;
}
