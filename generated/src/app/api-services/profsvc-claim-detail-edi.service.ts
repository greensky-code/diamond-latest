/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimDetailEdi } from '../api-models/profsvc-claim-detail-edi.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimDetailEdiService {

    private profsvcClaimDetailEdiUrl: string = `${environment.apiUrl}/profsvcclaimdetailedis`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimDetailEdis(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimDetailEdi[]> {
        var url = `${this.profsvcClaimDetailEdiUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetailEdi[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailEdi(transactionSetId : string): Observable<ProfsvcClaimDetailEdi> {
        return this.httpClient.get(`${this.profsvcClaimDetailEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetailEdi),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailEdisCount(): Observable<number> {
        var url = `${this.profsvcClaimDetailEdiUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimDetailEdi(profsvcClaimDetailEdi : ProfsvcClaimDetailEdi): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailEdi);
        return this.httpClient.post(this.profsvcClaimDetailEdiUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimDetailEdi(profsvcClaimDetailEdi : ProfsvcClaimDetailEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailEdi);
        return this.httpClient.put(`${this.profsvcClaimDetailEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimDetailEdi(profsvcClaimDetailEdi : ProfsvcClaimDetailEdi, transactionSetId : string): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailEdi);
        return this.httpClient.patch(`${this.profsvcClaimDetailEdiUrl}/${transactionSetId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimDetailEdi(transactionSetId : string): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimDetailEdiUrl}/${transactionSetId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}