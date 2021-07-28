/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFundHistory } from '../api-models/cap-fund-history.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapFundHistoryService {

    private capFundHistoryUrl: string = `${environment.apiUrl}/capfundhistorys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapFundHistorys(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapFundHistory[]> {
        var url = `${this.capFundHistoryUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapFundHistory[]),
                catchError(this.sharedService.handleError))
    }

    getCapFundHistory(seqCfdstId : number): Observable<CapFundHistory> {
        return this.httpClient.get(`${this.capFundHistoryUrl}/${seqCfdstId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundHistory),
                catchError(this.sharedService.handleError))
    }

    getCapFundHistorysCount(): Observable<number> {
        var url = `${this.capFundHistoryUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapFundHistory(capFundHistory : CapFundHistory): Observable<any> {
        let body = JSON.stringify(capFundHistory);
        return this.httpClient.post(this.capFundHistoryUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapFundHistory(capFundHistory : CapFundHistory, seqCfdstId : number): Observable<any> {
        let body = JSON.stringify(capFundHistory);
        return this.httpClient.put(`${this.capFundHistoryUrl}/${seqCfdstId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapFundHistory(capFundHistory : CapFundHistory, seqCfdstId : number): Observable<any> {
        let body = JSON.stringify(capFundHistory);
        return this.httpClient.patch(`${this.capFundHistoryUrl}/${seqCfdstId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapFundHistory(seqCfdstId : number): Observable<any> {
        return this.httpClient.delete(`${this.capFundHistoryUrl}/${seqCfdstId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}