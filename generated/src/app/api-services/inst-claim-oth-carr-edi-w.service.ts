/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstClaimOthCarrEdiW } from '../api-models/inst-claim-oth-carr-edi-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class InstClaimOthCarrEdiWService {

    private instClaimOthCarrEdiWUrl: string = `${environment.apiUrl}/instclaimothcarrediws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstClaimOthCarrEdiWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstClaimOthCarrEdiW[]> {
        var url = `${this.instClaimOthCarrEdiWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimOthCarrEdiW[]),
                catchError(this.sharedService.handleError))
    }

    getInstClaimOthCarrEdiW(seqPrediId : number): Observable<InstClaimOthCarrEdiW> {
        return this.httpClient.get(`${this.instClaimOthCarrEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimOthCarrEdiW),
                catchError(this.sharedService.handleError))
    }

    getInstClaimOthCarrEdiWsCount(): Observable<number> {
        var url = `${this.instClaimOthCarrEdiWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createInstClaimOthCarrEdiW(instClaimOthCarrEdiW : InstClaimOthCarrEdiW): Observable<any> {
        let body = JSON.stringify(instClaimOthCarrEdiW);
        return this.httpClient.post(this.instClaimOthCarrEdiWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstClaimOthCarrEdiW(instClaimOthCarrEdiW : InstClaimOthCarrEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(instClaimOthCarrEdiW);
        return this.httpClient.put(`${this.instClaimOthCarrEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstClaimOthCarrEdiW(instClaimOthCarrEdiW : InstClaimOthCarrEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(instClaimOthCarrEdiW);
        return this.httpClient.patch(`${this.instClaimOthCarrEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstClaimOthCarrEdiW(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimOthCarrEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}