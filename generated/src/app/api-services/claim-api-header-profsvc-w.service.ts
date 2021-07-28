/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimApiHeaderProfsvcW } from '../api-models/claim-api-header-profsvc-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimApiHeaderProfsvcWService {

    private claimApiHeaderProfsvcWUrl: string = `${environment.apiUrl}/claimapiheaderprofsvcws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimApiHeaderProfsvcWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimApiHeaderProfsvcW[]> {
        var url = `${this.claimApiHeaderProfsvcWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiHeaderProfsvcW[]),
                catchError(this.sharedService.handleError))
    }

    getClaimApiHeaderProfsvcW(claimIdNo : string): Observable<ClaimApiHeaderProfsvcW> {
        return this.httpClient.get(`${this.claimApiHeaderProfsvcWUrl}/${claimIdNo}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiHeaderProfsvcW),
                catchError(this.sharedService.handleError))
    }

    getClaimApiHeaderProfsvcWsCount(): Observable<number> {
        var url = `${this.claimApiHeaderProfsvcWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimApiHeaderProfsvcW(claimApiHeaderProfsvcW : ClaimApiHeaderProfsvcW): Observable<any> {
        let body = JSON.stringify(claimApiHeaderProfsvcW);
        return this.httpClient.post(this.claimApiHeaderProfsvcWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimApiHeaderProfsvcW(claimApiHeaderProfsvcW : ClaimApiHeaderProfsvcW, claimIdNo : string): Observable<any> {
        let body = JSON.stringify(claimApiHeaderProfsvcW);
        return this.httpClient.put(`${this.claimApiHeaderProfsvcWUrl}/${claimIdNo}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimApiHeaderProfsvcW(claimApiHeaderProfsvcW : ClaimApiHeaderProfsvcW, claimIdNo : string): Observable<any> {
        let body = JSON.stringify(claimApiHeaderProfsvcW);
        return this.httpClient.patch(`${this.claimApiHeaderProfsvcWUrl}/${claimIdNo}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimApiHeaderProfsvcW(claimIdNo : string): Observable<any> {
        return this.httpClient.delete(`${this.claimApiHeaderProfsvcWUrl}/${claimIdNo}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}