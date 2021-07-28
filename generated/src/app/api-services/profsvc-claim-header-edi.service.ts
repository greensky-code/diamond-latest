/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimHeaderEdi } from '../api-models/profsvc-claim-header-edi.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimHeaderEdiService {

    private profsvcClaimHeaderEdiUrl: string = `${environment.apiUrl}/profsvcclaimheaderedis`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimHeaderEdis(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimHeaderEdi[]> {
        var url = `${this.profsvcClaimHeaderEdiUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeaderEdi[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHeaderEdi(transactionSetId : string): Observable<ProfsvcClaimHeaderEdi> {
        return this.httpClient.get(`${this.profsvcClaimHeaderEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeaderEdi),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHeaderEdisCount(): Observable<number> {
        var url = `${this.profsvcClaimHeaderEdiUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimHeaderEdi(profsvcClaimHeaderEdi : ProfsvcClaimHeaderEdi): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeaderEdi);
        return this.httpClient.post(this.profsvcClaimHeaderEdiUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimHeaderEdi(profsvcClaimHeaderEdi : ProfsvcClaimHeaderEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeaderEdi);
        return this.httpClient.put(`${this.profsvcClaimHeaderEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimHeaderEdi(profsvcClaimHeaderEdi : ProfsvcClaimHeaderEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeaderEdi);
        return this.httpClient.patch(`${this.profsvcClaimHeaderEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimHeaderEdi(transactionSetId : string): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimHeaderEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}