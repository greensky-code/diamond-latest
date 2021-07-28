/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { InstClaimHeaderEdiW } from '../api-models/inst-claim-header-edi-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class InstClaimHeaderEdiWService {

    private instClaimHeaderEdiWUrl: string = `${environment.apiUrl}/instclaimheaderediws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getInstClaimHeaderEdiWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<InstClaimHeaderEdiW[]> {
        var url = `${this.instClaimHeaderEdiWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeaderEdiW[]),
                catchError(this.sharedService.handleError))
    }

    getInstClaimHeaderEdiW(seqPrediId : number): Observable<InstClaimHeaderEdiW> {
        return this.httpClient.get(`${this.instClaimHeaderEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as InstClaimHeaderEdiW),
                catchError(this.sharedService.handleError))
    }

    getInstClaimHeaderEdiWsCount(): Observable<number> {
        var url = `${this.instClaimHeaderEdiWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createInstClaimHeaderEdiW(instClaimHeaderEdiW : InstClaimHeaderEdiW): Observable<any> {
        let body = JSON.stringify(instClaimHeaderEdiW);
        return this.httpClient.post(this.instClaimHeaderEdiWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateInstClaimHeaderEdiW(instClaimHeaderEdiW : InstClaimHeaderEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(instClaimHeaderEdiW);
        return this.httpClient.put(`${this.instClaimHeaderEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateInstClaimHeaderEdiW(instClaimHeaderEdiW : InstClaimHeaderEdiW, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(instClaimHeaderEdiW);
        return this.httpClient.patch(`${this.instClaimHeaderEdiWUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteInstClaimHeaderEdiW(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.instClaimHeaderEdiWUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}