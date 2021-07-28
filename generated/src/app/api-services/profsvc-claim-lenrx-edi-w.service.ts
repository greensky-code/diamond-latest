/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimLenrxEdiW } from '../api-models/profsvc-claim-lenrx-edi-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimLenrxEdiWService {

    private profsvcClaimLenrxEdiWUrl: string = `${environment.apiUrl}/profsvcclaimlenrxediws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimLenrxEdiWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimLenrxEdiW[]> {
        var url = `${this.profsvcClaimLenrxEdiWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimLenrxEdiW[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimLenrxEdiW(seqPrediId : number): Observable<ProfsvcClaimLenrxEdiW> {
        return this.httpClient.get(`${this.profsvcClaimLenrxEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimLenrxEdiW),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimLenrxEdiWsCount(): Observable<number> {
        var url = `${this.profsvcClaimLenrxEdiWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimLenrxEdiW(profsvcClaimLenrxEdiW : ProfsvcClaimLenrxEdiW): Observable<any> {
        let body = JSON.stringify(profsvcClaimLenrxEdiW);
        return this.httpClient.post(this.profsvcClaimLenrxEdiWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimLenrxEdiW(profsvcClaimLenrxEdiW : ProfsvcClaimLenrxEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimLenrxEdiW);
        return this.httpClient.put(`${this.profsvcClaimLenrxEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimLenrxEdiW(profsvcClaimLenrxEdiW : ProfsvcClaimLenrxEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimLenrxEdiW);
        return this.httpClient.patch(`${this.profsvcClaimLenrxEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimLenrxEdiW(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimLenrxEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}