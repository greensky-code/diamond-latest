/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {environment} from "../../../environments/environment";
import {ProcGetPricingAccntCodes} from "../../api-models/addon/proc-get-pricing-accnt-codes.input-model";
import {ProcGetPricingAccntCodesViewModel} from "../../api-models/addon/proc-get-pricing-accnt-codes.view-model";
import {SharedService} from "../../shared/services/shared.service";
import {catchError, map} from "rxjs/operators";
import { ExternalCarrier, PlanListAddon, PlanListAddonIn, ProductType } from '../../api-models/addon/get-plan-list-addon.model';

@Injectable({
  providedIn: "root",
})
export class ProcGetPlanListAddon {
  private url: string = `${environment.apiUrl}`;
  private contentHeaders = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {
    this.contentHeaders = this.contentHeaders.set("Accept", "application/json");
    this.contentHeaders = this.contentHeaders.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
  }

  procPlanListAddon(
    procProcessExternal: PlanListAddonIn
  ): Observable<PlanListAddon[]> {
    let body = JSON.stringify(procProcessExternal);
    return this.httpClient
      .post(`${this.url}/getplandata`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response as PlanListAddon),
        catchError(this.sharedService.handleError)
      );
  }
  addAndUpdate(procProcessExternal:any): Observable<any> {
    let body = JSON.stringify(procProcessExternal);
    console.log(body);
    const url = `${this.url}/procprocessexternalcarrier`;
    return this.httpClient.post(url, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
            catchError((error: any) => {
          return this.sharedService.handleError(error);
             }));
  }
  
  getProductType(): Observable<any> {
    return this.httpClient
      .get(`${this.url}/getplandata/ProductType`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ProductType[]),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }
  getExternalCarrier(): Observable<any> {
    return this.httpClient
      .get(`${this.url}/getplandata/ExternalCarrier`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as ExternalCarrier[]),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }
}
