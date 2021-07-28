/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DelegationServiceCodes } from '../api-models/delegation-service-codes.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DelegationServiceCodesService {

    private delegationServiceCodesUrl: string = `${environment.apiUrl}/delegationservicecodeses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDelegationServiceCodeses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DelegationServiceCodes[]> {
        var url = `${this.delegationServiceCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DelegationServiceCodes[]),
                catchError(this.sharedService.handleError))
    }

    getDelegationServiceCodes(delegationServiceCode : string): Observable<DelegationServiceCodes> {
        return this.httpClient.get(`${this.delegationServiceCodesUrl}/${delegationServiceCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DelegationServiceCodes),
                catchError(this.sharedService.handleError))
    }

    getDelegationServiceCodesesCount(): Observable<number> {
        var url = `${this.delegationServiceCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDelegationServiceCodes(delegationServiceCodes : DelegationServiceCodes): Observable<any> {
        let body = JSON.stringify(delegationServiceCodes);
        return this.httpClient.post(this.delegationServiceCodesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDelegationServiceCodes(delegationServiceCodes : DelegationServiceCodes, delegationServiceCode : string): Observable<any> {
        let body = JSON.stringify(delegationServiceCodes);
        return this.httpClient.put(`${this.delegationServiceCodesUrl}/${delegationServiceCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDelegationServiceCodes(delegationServiceCodes : DelegationServiceCodes, delegationServiceCode : string): Observable<any> {
        let body = JSON.stringify(delegationServiceCodes);
        return this.httpClient.patch(`${this.delegationServiceCodesUrl}/${delegationServiceCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDelegationServiceCodes(delegationServiceCode : string): Observable<any> {
        return this.httpClient.delete(`${this.delegationServiceCodesUrl}/${delegationServiceCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}