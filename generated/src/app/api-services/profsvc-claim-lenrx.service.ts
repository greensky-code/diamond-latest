/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimLenrx } from '../api-models/profsvc-claim-lenrx.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimLenrxService {

    private profsvcClaimLenrxUrl: string = `${environment.apiUrl}/profsvcclaimlenrxes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimLenrxes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimLenrx[]> {
        var url = `${this.profsvcClaimLenrxUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimLenrx[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimLenrx(seqClaimId : number): Observable<ProfsvcClaimLenrx> {
        return this.httpClient.get(`${this.profsvcClaimLenrxUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimLenrx),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimLenrxesCount(): Observable<number> {
        var url = `${this.profsvcClaimLenrxUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqClaimId(seqClaimId : number): Observable<ProfsvcClaimLenrx[]> {
        return this.httpClient.get(`${this.profsvcClaimLenrxUrl}/find-by-seqclaimid/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimLenrx),
                catchError(this.sharedService.handleError))
    }




    createProfsvcClaimLenrx(profsvcClaimLenrx : ProfsvcClaimLenrx): Observable<any> {
        let body = JSON.stringify(profsvcClaimLenrx);
        return this.httpClient.post(this.profsvcClaimLenrxUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimLenrx(profsvcClaimLenrx : ProfsvcClaimLenrx, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimLenrx);
        return this.httpClient.put(`${this.profsvcClaimLenrxUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimLenrx(profsvcClaimLenrx : ProfsvcClaimLenrx, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimLenrx);
        return this.httpClient.patch(`${this.profsvcClaimLenrxUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimLenrx(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimLenrxUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}