/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebOutgoingProviderAddress } from '../api-models/cieb-outgoing-provider-address.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebOutgoingProviderAddressService {

    private ciebOutgoingProviderAddressUrl: string = `${environment.apiUrl}/cieboutgoingprovideraddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebOutgoingProviderAddresses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebOutgoingProviderAddress[]> {
        var url = `${this.ciebOutgoingProviderAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebOutgoingProviderAddress[]),
                catchError(this.sharedService.handleError))
    }

    getCiebOutgoingProviderAddress(seqClaimId : number): Observable<CiebOutgoingProviderAddress> {
        return this.httpClient.get(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebOutgoingProviderAddress),
                catchError(this.sharedService.handleError))
    }

    getCiebOutgoingProviderAddressesCount(): Observable<number> {
        var url = `${this.ciebOutgoingProviderAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebOutgoingProviderAddress(ciebOutgoingProviderAddress : CiebOutgoingProviderAddress): Observable<any> {
        let body = JSON.stringify(ciebOutgoingProviderAddress);
        return this.httpClient.post(this.ciebOutgoingProviderAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebOutgoingProviderAddress(ciebOutgoingProviderAddress : CiebOutgoingProviderAddress, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(ciebOutgoingProviderAddress);
        return this.httpClient.put(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebOutgoingProviderAddress(ciebOutgoingProviderAddress : CiebOutgoingProviderAddress, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(ciebOutgoingProviderAddress);
        return this.httpClient.patch(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebOutgoingProviderAddress(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}