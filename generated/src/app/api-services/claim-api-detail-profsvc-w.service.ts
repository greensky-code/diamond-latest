/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimApiDetailProfsvcW } from '../api-models/claim-api-detail-profsvc-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimApiDetailProfsvcWService {

    private claimApiDetailProfsvcWUrl: string = `${environment.apiUrl}/claimapidetailprofsvcws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimApiDetailProfsvcWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimApiDetailProfsvcW[]> {
        var url = `${this.claimApiDetailProfsvcWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiDetailProfsvcW[]),
                catchError(this.sharedService.handleError))
    }

    getClaimApiDetailProfsvcW(claimIdNo : string): Observable<ClaimApiDetailProfsvcW> {
        return this.httpClient.get(`${this.claimApiDetailProfsvcWUrl}/${claimIdNo}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiDetailProfsvcW),
                catchError(this.sharedService.handleError))
    }

    getClaimApiDetailProfsvcWsCount(): Observable<number> {
        var url = `${this.claimApiDetailProfsvcWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimApiDetailProfsvcW(claimApiDetailProfsvcW : ClaimApiDetailProfsvcW): Observable<any> {
        let body = JSON.stringify(claimApiDetailProfsvcW);
        return this.httpClient.post(this.claimApiDetailProfsvcWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimApiDetailProfsvcW(claimApiDetailProfsvcW : ClaimApiDetailProfsvcW, claimIdNo : string): Observable<any> {
        let body = JSON.stringify(claimApiDetailProfsvcW);
        return this.httpClient.put(`${this.claimApiDetailProfsvcWUrl}/${claimIdNo}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimApiDetailProfsvcW(claimApiDetailProfsvcW : ClaimApiDetailProfsvcW, claimIdNo : string): Observable<any> {
        let body = JSON.stringify(claimApiDetailProfsvcW);
        return this.httpClient.patch(`${this.claimApiDetailProfsvcWUrl}/${claimIdNo}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimApiDetailProfsvcW(claimIdNo : string): Observable<any> {
        return this.httpClient.delete(`${this.claimApiDetailProfsvcWUrl}/${claimIdNo}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}