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
