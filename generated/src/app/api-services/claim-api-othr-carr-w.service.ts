/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimApiOthrCarrW } from '../api-models/claim-api-othr-carr-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimApiOthrCarrWService {

    private claimApiOthrCarrWUrl: string = `${environment.apiUrl}/claimapiothrcarrws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimApiOthrCarrWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimApiOthrCarrW[]> {
        var url = `${this.claimApiOthrCarrWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiOthrCarrW[]),
                catchError(this.sharedService.handleError))
    }

    getClaimApiOthrCarrW(claimNumber : string): Observable<ClaimApiOthrCarrW> {
        return this.httpClient.get(`${this.claimApiOthrCarrWUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimApiOthrCarrW),
                catchError(this.sharedService.handleError))
    }

    getClaimApiOthrCarrWsCount(): Observable<number> {
        var url = `${this.claimApiOthrCarrWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimApiOthrCarrW(claimApiOthrCarrW : ClaimApiOthrCarrW): Observable<any> {
        let body = JSON.stringify(claimApiOthrCarrW);
        return this.httpClient.post(this.claimApiOthrCarrWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimApiOthrCarrW(claimApiOthrCarrW : ClaimApiOthrCarrW, claimNumber : string): Observable<any> {
        let body = JSON.stringify(claimApiOthrCarrW);
        return this.httpClient.put(`${this.claimApiOthrCarrWUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimApiOthrCarrW(claimApiOthrCarrW : ClaimApiOthrCarrW, claimNumber : string): Observable<any> {
        let body = JSON.stringify(claimApiOthrCarrW);
        return this.httpClient.patch(`${this.claimApiOthrCarrWUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimApiOthrCarrW(claimNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.claimApiOthrCarrWUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}