/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimDetailEdiW } from '../api-models/profsvc-claim-detail-edi-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProfsvcClaimDetailEdiWService {

    private profsvcClaimDetailEdiWUrl: string = `${environment.apiUrl}/profsvcclaimdetailediws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimDetailEdiWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimDetailEdiW[]> {
        var url = `${this.profsvcClaimDetailEdiWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetailEdiW[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailEdiW(seqPrediId : number): Observable<ProfsvcClaimDetailEdiW> {
        return this.httpClient.get(`${this.profsvcClaimDetailEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetailEdiW),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailEdiWsCount(): Observable<number> {
        var url = `${this.profsvcClaimDetailEdiWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimDetailEdiW(profsvcClaimDetailEdiW : ProfsvcClaimDetailEdiW): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailEdiW);
        return this.httpClient.post(this.profsvcClaimDetailEdiWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimDetailEdiW(profsvcClaimDetailEdiW : ProfsvcClaimDetailEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailEdiW);
        return this.httpClient.put(`${this.profsvcClaimDetailEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimDetailEdiW(profsvcClaimDetailEdiW : ProfsvcClaimDetailEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetailEdiW);
        return this.httpClient.patch(`${this.profsvcClaimDetailEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimDetailEdiW(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimDetailEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}