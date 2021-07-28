/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimHeaderEdiW } from '../api-models/profsvc-claim-header-edi-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimHeaderEdiWService {

    private profsvcClaimHeaderEdiWUrl: string = `${environment.apiUrl}/profsvcclaimheaderediws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimHeaderEdiWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimHeaderEdiW[]> {
        var url = `${this.profsvcClaimHeaderEdiWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeaderEdiW[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHeaderEdiW(seqPrediId : number): Observable<ProfsvcClaimHeaderEdiW> {
        return this.httpClient.get(`${this.profsvcClaimHeaderEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimHeaderEdiW),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimHeaderEdiWsCount(): Observable<number> {
        var url = `${this.profsvcClaimHeaderEdiWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimHeaderEdiW(profsvcClaimHeaderEdiW : ProfsvcClaimHeaderEdiW): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeaderEdiW);
        return this.httpClient.post(this.profsvcClaimHeaderEdiWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimHeaderEdiW(profsvcClaimHeaderEdiW : ProfsvcClaimHeaderEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeaderEdiW);
        return this.httpClient.put(`${this.profsvcClaimHeaderEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimHeaderEdiW(profsvcClaimHeaderEdiW : ProfsvcClaimHeaderEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimHeaderEdiW);
        return this.httpClient.patch(`${this.profsvcClaimHeaderEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimHeaderEdiW(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimHeaderEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}