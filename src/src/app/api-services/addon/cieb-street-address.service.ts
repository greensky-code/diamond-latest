/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { CiebStreetAddress } from '../../api-models';
import {CiebContactHistoryModel} from "../../api-models/addon/cieb-contact-history.model";
import {ProcAddrHistViewModel} from "../../api-models/addon/proc-addr-hist.view-model";

@Injectable({
  providedIn: "root",
})
export class CiebStreetAddressService {
  private ciebStreetAddressUrl: string = `${environment.apiUrl}/ciebstreetaddresses`;
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

  getCiebStreetAddresses(
    usePagination: boolean = false,
    page: number = 0,
    size: number = 0
  ): Observable<CiebStreetAddress[]> {
    var url = `${this.ciebStreetAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as CiebStreetAddress[]),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }

  getCiebStreetAddress(seqAddrId: number): Observable<CiebStreetAddress> {
    return this.httpClient
      .get(`${this.ciebStreetAddressUrl}/${seqAddrId}`, { observe: "response" })
      .pipe(
        map((response) => response.body as CiebStreetAddress),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  getCiebStreetAddressesCount(): Observable<number> {
    var url = `${this.ciebStreetAddressUrl}/count`;
    return this.httpClient.get(url, { observe: "response" }).pipe(
      map((response) => response.body as number),
      catchError((error: any) => {
        return this.sharedService.handleError(error);
      })
    );
  }

  createCiebStreetAddress(
    ciebStreetAddress: CiebStreetAddress
  ): Observable<any> {
    let body = JSON.stringify(ciebStreetAddress);
    return this.httpClient
      .post(this.ciebStreetAddressUrl, body, { headers: this.contentHeaders })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  updateCiebStreetAddress(
    ciebStreetAddress: CiebStreetAddress,
    seqAddrId: number
  ): Observable<any> {
    let body = JSON.stringify(ciebStreetAddress);
    return this.httpClient
      .put(`${this.ciebStreetAddressUrl}/${seqAddrId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

    getCiebStreetAddressBySeqEntityId(seqEntityId: number): Observable<CiebStreetAddress> {
        return this.httpClient.get(`${this.ciebStreetAddressUrl}/findBySeqEntityId/${seqEntityId}`, {
                observe: "response",
            })
            .pipe(map((response) => response.body as CiebStreetAddress),
                catchError((error: any) => {
                    return this.sharedService.handleError(error);
                }));
    }

    findCiebStreetAddressListBySeqEntityId(
        seqEntityId: number
    ): Observable<CiebStreetAddress[]> {
        return this.httpClient
            .get(`${this.ciebStreetAddressUrl}/findBySeqEntityId/${seqEntityId}/list`, {
                observe: "response",
            })
            .pipe(
                map((response) => response.body as CiebStreetAddress[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error);
                })
            );
    }

  getCiebStreetAddressBySeqEntityIdAndAddressCode(
    seqEntityId: number,addressCode:string
  ): Observable<CiebStreetAddress> {
    return this.httpClient
      .get(`${this.ciebStreetAddressUrl}/findBy/${seqEntityId}/${addressCode}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body as CiebStreetAddress)
      );
  }

  getCiebStreetAddressBySeqEntityIdAndAddrCode(seqEntityId : number, addressCode:string): Observable<CiebStreetAddress[]> {
    return this.httpClient.get(`${this.ciebStreetAddressUrl}/findBySeqEntityIdAndAddrCode/${seqEntityId}/${addressCode}`, {observe: 'response'})
        .pipe(map(response => response.body as CiebStreetAddress[]),
            catchError((error: any) => {
                 return this.sharedService.handleError(error)
             }));
}

  partiallyUpdateCiebStreetAddress(
    ciebStreetAddress: CiebStreetAddress,
    seqAddrId: number
  ): Observable<any> {
    let body = JSON.stringify(ciebStreetAddress);
    return this.httpClient
      .patch(`${this.ciebStreetAddressUrl}/${seqAddrId}`, body, {
        headers: this.contentHeaders,
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }

  deleteCiebStreetAddress(seqAddrId: number): Observable<any> {
    return this.httpClient
      .delete(`${this.ciebStreetAddressUrl}/${seqAddrId}`, {
        observe: "response",
      })
      .pipe(
        map((response) => response.body),
        catchError((error: any) => {
          return this.sharedService.handleError(error);
        })
      );
  }


  getCiebStreetAddressBySeqEntityAndAddressCode(seqEntityId:number, addressCode:string): Observable<CiebStreetAddress> {
    return this.httpClient
      .get(`${this.ciebStreetAddressUrl}/address/${seqEntityId}/${addressCode}`, { observe: "response" })
      .pipe(
        map((response) => response.body as CiebStreetAddress),
          catchError(this.sharedService.handleError)
      );
  }


    findCiebStreetAddressListByIds(seqEntityId: any, seqClaimId: any, seqMembId: any) {
        return this.httpClient
            .get(`${this.ciebStreetAddressUrl}/list/${seqEntityId}/${seqClaimId}/${seqMembId}`, { observe: "response" })
            .pipe(
                map((response) => response.body as any[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error);
                })
            );
    }

    getCiebAddressHistory( seqEntityId:number, effDate, endDate ): Observable<any> {
      let body = JSON.stringify({'seqEntityId':seqEntityId, 'effDate':effDate, 'endDate':endDate});
      return this.httpClient
        .post(`${this.ciebStreetAddressUrl}/addressHistory`, body, { headers: this.contentHeaders })
        .pipe(
          map((response) => response),
          catchError((error: any) => {
            return this.sharedService.handleError(error);
          })
        );
    }

    getCiebContactHistory( seqEntityId:number, effDate, endDate ): Observable<any> {
      let body = JSON.stringify({'seqEntityId':seqEntityId, 'effDate':effDate, 'endDate':endDate});
      return this.httpClient
        .post(`${this.ciebStreetAddressUrl}/contactHistory`, body, { headers: this.contentHeaders })
        .pipe(
          map((response) => response),
          catchError((error: any) => {
            return this.sharedService.handleError(error);
          })
        );
    }
}
