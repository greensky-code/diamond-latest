/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HoldDenyLog } from '../api-models/hold-deny-log.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HoldDenyLogService {

    private holdDenyLogUrl: string = `${environment.apiUrl}/holddenylogs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getHoldDenyLogs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<HoldDenyLog[]> {
        var url = `${this.holdDenyLogUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as HoldDenyLog[]),
                catchError(this.sharedService.handleError))
    }

    getHoldDenyLog(seqClaimId : number): Observable<HoldDenyLog> {
        return this.httpClient.get(`${this.holdDenyLogUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as HoldDenyLog),
                catchError(this.sharedService.handleError))
    }

    getHoldDenyLogsCount(): Observable<number> {
        var url = `${this.holdDenyLogUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createHoldDenyLog(holdDenyLog : HoldDenyLog): Observable<any> {
        let body = JSON.stringify(holdDenyLog);
        return this.httpClient.post(this.holdDenyLogUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateHoldDenyLog(holdDenyLog : HoldDenyLog, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(holdDenyLog);
        return this.httpClient.put(`${this.holdDenyLogUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateHoldDenyLog(holdDenyLog : HoldDenyLog, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(holdDenyLog);
        return this.httpClient.patch(`${this.holdDenyLogUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteHoldDenyLog(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.holdDenyLogUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}