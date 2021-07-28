/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimApiDetailInstW } from '../api-models/claim-api-detail-inst-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimApiDetailInstWService {

    private claimApiDetailInstWUrl: string = `${environment.apiUrl}/claimapidetailinstws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimApiDetailInstWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimApiDetailInstW[]> {
        var url = `${this.claimApiDetailInstWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiDetailInstW[]),
                catchError(this.sharedService.handleError))
    }

    getClaimApiDetailInstW(claimNumber : string): Observable<ClaimApiDetailInstW> {
        return this.httpClient.get(`${this.claimApiDetailInstWUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiDetailInstW),
                catchError(this.sharedService.handleError))
    }

    getClaimApiDetailInstWsCount(): Observable<number> {
        var url = `${this.claimApiDetailInstWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimApiDetailInstW(claimApiDetailInstW : ClaimApiDetailInstW): Observable<any> {
        let body = JSON.stringify(claimApiDetailInstW);
        return this.httpClient.post(this.claimApiDetailInstWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimApiDetailInstW(claimApiDetailInstW : ClaimApiDetailInstW, claimNumber : string): Observable<any> {
        let body = JSON.stringify(claimApiDetailInstW);
        return this.httpClient.put(`${this.claimApiDetailInstWUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimApiDetailInstW(claimApiDetailInstW : ClaimApiDetailInstW, claimNumber : string): Observable<any> {
        let body = JSON.stringify(claimApiDetailInstW);
        return this.httpClient.patch(`${this.claimApiDetailInstWUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimApiDetailInstW(claimNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.claimApiDetailInstWUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}