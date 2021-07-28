/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecWinDescr } from '../api-models/sec-win-descr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecWinDescrService {

    private secWinDescrUrl: string = `${environment.apiUrl}/secwindescrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecWinDescrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecWinDescr[]> {
        var url = `${this.secWinDescrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecWinDescr[]),
                catchError(this.sharedService.handleError))
    }

    getSecWinDescr(winId : string): Observable<SecWinDescr> {
        return this.httpClient.get(`${this.secWinDescrUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecWinDescr),
                catchError(this.sharedService.handleError))
    }

    getSecWinDescrsCount(): Observable<number> {
        var url = `${this.secWinDescrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSecWinDescr(secWinDescr : SecWinDescr): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.post(this.secWinDescrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecWinDescr(secWinDescr : SecWinDescr, winId : string): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.put(`${this.secWinDescrUrl}/${winId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecWinDescr(secWinDescr : SecWinDescr, winId : string): Observable<any> {
        let body = JSON.stringify(secWinDescr);
        return this.httpClient.patch(`${this.secWinDescrUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecWinDescr(winId : string): Observable<any> {
        return this.httpClient.delete(`${this.secWinDescrUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}