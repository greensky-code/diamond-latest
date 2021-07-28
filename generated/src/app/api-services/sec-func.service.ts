/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecFunc } from '../api-models/sec-func.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecFuncService {

    private secFuncUrl: string = `${environment.apiUrl}/secfuncs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecFuncs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecFunc[]> {
        var url = `${this.secFuncUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc[]),
                catchError(this.sharedService.handleError))
    }

    getSecFunc(userId : string): Observable<SecFunc> {
        return this.httpClient.get(`${this.secFuncUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError(this.sharedService.handleError))
    }

    getSecFuncsCount(): Observable<number> {
        var url = `${this.secFuncUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByUserId(userId : string): Observable<SecFunc[]> {
        return this.httpClient.get(`${this.secFuncUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError(this.sharedService.handleError))
    }
    findByFuncId(funcId : string): Observable<SecFunc[]> {
        return this.httpClient.get(`${this.secFuncUrl}/find-by-funcid/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError(this.sharedService.handleError))
    }
    findByFuncId(funcId : string): Observable<SecFunc[]> {
        return this.httpClient.get(`${this.secFuncUrl}/find-by-funcid/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError(this.sharedService.handleError))
    }




    createSecFunc(secFunc : SecFunc): Observable<any> {
        let body = JSON.stringify(secFunc);
        return this.httpClient.post(this.secFuncUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecFunc(secFunc : SecFunc, userId : string): Observable<any> {
        let body = JSON.stringify(secFunc);
        return this.httpClient.put(`${this.secFuncUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecFunc(secFunc : SecFunc, userId : string): Observable<any> {
        let body = JSON.stringify(secFunc);
        return this.httpClient.patch(`${this.secFuncUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecFunc(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secFuncUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}