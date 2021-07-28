/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimApiHeaderInstW } from '../api-models/claim-api-header-inst-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimApiHeaderInstWService {

    private claimApiHeaderInstWUrl: string = `${environment.apiUrl}/claimapiheaderinstws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimApiHeaderInstWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimApiHeaderInstW[]> {
        var url = `${this.claimApiHeaderInstWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiHeaderInstW[]),
                catchError(this.sharedService.handleError))
    }

    getClaimApiHeaderInstW(claimNumber : string): Observable<ClaimApiHeaderInstW> {
        return this.httpClient.get(`${this.claimApiHeaderInstWUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiHeaderInstW),
                catchError(this.sharedService.handleError))
    }

    getClaimApiHeaderInstWsCount(): Observable<number> {
        var url = `${this.claimApiHeaderInstWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimApiHeaderInstW(claimApiHeaderInstW : ClaimApiHeaderInstW): Observable<any> {
        let body = JSON.stringify(claimApiHeaderInstW);
        return this.httpClient.post(this.claimApiHeaderInstWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimApiHeaderInstW(claimApiHeaderInstW : ClaimApiHeaderInstW, claimNumber : string): Observable<any> {
        let body = JSON.stringify(claimApiHeaderInstW);
        return this.httpClient.put(`${this.claimApiHeaderInstWUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimApiHeaderInstW(claimApiHeaderInstW : ClaimApiHeaderInstW, claimNumber : string): Observable<any> {
        let body = JSON.stringify(claimApiHeaderInstW);
        return this.httpClient.patch(`${this.claimApiHeaderInstWUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimApiHeaderInstW(claimNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.claimApiHeaderInstWUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}