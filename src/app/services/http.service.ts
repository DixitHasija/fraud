import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

type TParam = string | number | boolean;

type HttpExtras = {
  observe?: 'body' | undefined;
  reportProgress?: boolean | undefined;
  responseType?: 'json' | undefined;
};
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,

  ) { }

  putToUrl<T>(
    url: string,
    body: unknown,
    params = {},
    headers?: HttpHeaders,
    extras?: HttpExtras,
  ) {
    params = this.getQueryParam(params);
    return this.httpClient.put(url, body, {
      params,
      headers,
      ...extras,
    }) as Observable<T>;
  }
  getQueryParam(paramsObj: Record<string, TParam>): HttpParams {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj[key] === undefined) continue;
      params = params.set(key, paramsObj[key]);
    }
    return params;
  }
  requestByUrl<T>(url: string, params = {}, headers?: HttpHeaders) {
    params = this.getQueryParam(params);
    headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    });
    return this.httpClient.get(url, { params, headers }) as Observable<T>;
  }

  postByUrl<T>(url: string, body: unknown, params = {}, headers?: HttpHeaders) {
    params = this.getQueryParam(params);
    return this.httpClient.post(url, body, {
      params,
      headers,
    }) as Observable<T>;
  }

}
