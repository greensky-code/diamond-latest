/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimApiInsurnProfsvcW } from '../api-models/claim-api-insurn-profsvc-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimApiInsurnProfsvcWService {

    private claimApiInsurnProfsvcWUrl: string = `${environment.apiUrl}/claimapiinsurnprofsvcws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimApiInsurnProfsvcWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimApiInsurnProfsvcW[]> {
        var url = `${this.claimApiInsurnProfsvcWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiInsurnProfsvcW[]),
                catchError(this.sharedService.handleError))
    }

    getClaimApiInsurnProfsvcW(claimIdNo : string): Observable<ClaimApiInsurnProfsvcW> {
        return this.httpClient.get(`${this.claimApiInsurnProfsvcWUrl}/${claimIdNo}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiInsurnProfsvcW),
                catchError(this.sharedService.handleError))
    }

    getClaimApiInsurnProfsvcWsCount(): Observable<number> {
        var url = `${this.claimApiInsurnProfsvcWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimApiInsurnProfsvcW(claimApiInsurnProfsvcW : ClaimApiInsurnProfsvcW): Observable<any> {
        let body = JSON.stringify(claimApiInsurnProfsvcW);
        return this.httpClient.post(this.claimApiInsurnProfsvcWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimApiInsurnProfsvcW(claimApiInsurnProfsvcW : ClaimApiInsurnProfsvcW, claimIdNo : string): Observable<any> {
        let body = JSON.stringify(claimApiInsurnProfsvcW);
        return this.httpClient.put(`${this.claimApiInsurnProfsvcWUrl}/${claimIdNo}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimApiInsurnProfsvcW(claimApiInsurnProfsvcW : ClaimApiInsurnProfsvcW, claimIdNo : string): Observable<any> {
        let body = JSON.stringify(claimApiInsurnProfsvcW);
        return this.httpClient.patch(`${this.claimApiInsurnProfsvcWUrl}/${claimIdNo}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimApiInsurnProfsvcW(claimIdNo : string): Observable<any> {
        return this.httpClient.delete(`${this.claimApiInsurnProfsvcWUrl}/${claimIdNo}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}