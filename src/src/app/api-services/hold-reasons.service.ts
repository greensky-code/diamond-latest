/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IncentiveQualityPgm } from '../api-models/incentive-quality-pgm.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HoldReasonsService {

    private claimHoldReasonsUrl: string = `${environment.apiUrl}/holdreasons`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getHoldReasons(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IncentiveQualityPgm[]> {
        var url = `${this.claimHoldReasonsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IncentiveQualityPgm[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getHoldReasonsByClaimId(seqClaimId : number): Observable<IncentiveQualityPgm> {
        return this.httpClient.get(`${this.claimHoldReasonsUrl}/find-by-claimId/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getHoldReasonsCount(): Observable<number> {
        var url = `${this.claimHoldReasonsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

   

    createHoldReason(holdReason : any): Observable<any> {
        let body = JSON.stringify(holdReason);
        return this.httpClient.post(this.claimHoldReasonsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateIncentiveQualityPgm(holdreason : any, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(holdreason);
        return this.httpClient.put(`${this.claimHoldReasonsUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNextSequence(): Observable<number> {
        const url = `${this.claimHoldReasonsUrl}/next`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    
}
