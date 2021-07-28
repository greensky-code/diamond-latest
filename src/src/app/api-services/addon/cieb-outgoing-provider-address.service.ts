/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {SharedService} from "../../shared/services/shared.service";
import {environment} from "../../../environments/environment";
import {CiebOutgoingProviderAddress} from "../../api-models/addon/cieb-outgoing-provider-address.model";
import {ProvAddress} from "../../api-models/prov-address.model";

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
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getCiebOutgoingProviderAddress(seqClaimId : number): Observable<CiebOutgoingProviderAddress> {
        return this.httpClient.get(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebOutgoingProviderAddress),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    existsCiebOutgoingProviderAddress(seqClaimId : number): Observable<CiebOutgoingProviderAddress> {
        return this.httpClient.get(`${this.ciebOutgoingProviderAddressUrl}/exists/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as Boolean),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getCiebOutgoingProviderAddressesCount(): Observable<number> {
        var url = `${this.ciebOutgoingProviderAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }





    createCiebOutgoingProviderAddress(ciebOutgoingProviderAddress : CiebOutgoingProviderAddress): Observable<any> {
        let body = JSON.stringify(ciebOutgoingProviderAddress);
        return this.httpClient.post(this.ciebOutgoingProviderAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebOutgoingProviderAddress(ciebOutgoingProviderAddress : CiebOutgoingProviderAddress, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(ciebOutgoingProviderAddress);
        return this.httpClient.put(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebOutgoingProviderAddress(ciebOutgoingProviderAddress : CiebOutgoingProviderAddress, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(ciebOutgoingProviderAddress);
        return this.httpClient.patch(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    deleteCiebOutgoingProviderAddress(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findBySeqClaimIdByStoredProcedure(seqClaimId: any) {
        return this.httpClient.get(`${this.ciebOutgoingProviderAddressUrl}/${seqClaimId}/list/sp`, {observe: 'response'})
            .pipe(map(response => response.body as ProvAddress),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
