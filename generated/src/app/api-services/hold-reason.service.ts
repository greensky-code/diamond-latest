/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HoldReason } from '../api-models/hold-reason.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HoldReasonService {

    private holdReasonUrl: string = `${environment.apiUrl}/holdreasons`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getHoldReasons(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<HoldReason[]> {
        var url = `${this.holdReasonUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as HoldReason[]),
                catchError(this.sharedService.handleError))
    }

    getHoldReason(holdReasonSequence : number): Observable<HoldReason> {
        return this.httpClient.get(`${this.holdReasonUrl}/${holdReasonSequence}`, {observe: 'response'})
            .pipe(map(response => response.body as HoldReason),
                catchError(this.sharedService.handleError))
    }

    getHoldReasonsCount(): Observable<number> {
        var url = `${this.holdReasonUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createHoldReason(holdReason : HoldReason): Observable<any> {
        let body = JSON.stringify(holdReason);
        return this.httpClient.post(this.holdReasonUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateHoldReason(holdReason : HoldReason, holdReasonSequence : number): Observable<any> {
        let body = JSON.stringify(holdReason);
        return this.httpClient.put(`${this.holdReasonUrl}/${holdReasonSequence}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateHoldReason(holdReason : HoldReason, holdReasonSequence : number): Observable<any> {
        let body = JSON.stringify(holdReason);
        return this.httpClient.patch(`${this.holdReasonUrl}/${holdReasonSequence}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteHoldReason(holdReasonSequence : number): Observable<any> {
        return this.httpClient.delete(`${this.holdReasonUrl}/${holdReasonSequence}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}