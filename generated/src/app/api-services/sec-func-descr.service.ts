/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecFuncDescr } from '../api-models/sec-func-descr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SecFuncDescrService {

    private secFuncDescrUrl: string = `${environment.apiUrl}/secfuncdescrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecFuncDescrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecFuncDescr[]> {
        var url = `${this.secFuncDescrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecFuncDescr[]),
                catchError(this.sharedService.handleError))
    }

    getSecFuncDescr(funcId : string): Observable<SecFuncDescr> {
        return this.httpClient.get(`${this.secFuncDescrUrl}/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFuncDescr),
                catchError(this.sharedService.handleError))
    }

    getSecFuncDescrsCount(): Observable<number> {
        var url = `${this.secFuncDescrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByFuncId(funcId : string): Observable<SecFuncDescr[]> {
        return this.httpClient.get(`${this.secFuncDescrUrl}/find-by-funcid/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFuncDescr),
                catchError(this.sharedService.handleError))
    }




    createSecFuncDescr(secFuncDescr : SecFuncDescr): Observable<any> {
        let body = JSON.stringify(secFuncDescr);
        return this.httpClient.post(this.secFuncDescrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecFuncDescr(secFuncDescr : SecFuncDescr, funcId : string): Observable<any> {
        let body = JSON.stringify(secFuncDescr);
        return this.httpClient.put(`${this.secFuncDescrUrl}/${funcId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecFuncDescr(secFuncDescr : SecFuncDescr, funcId : string): Observable<any> {
        let body = JSON.stringify(secFuncDescr);
        return this.httpClient.patch(`${this.secFuncDescrUrl}/${funcId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecFuncDescr(funcId : string): Observable<any> {
        return this.httpClient.delete(`${this.secFuncDescrUrl}/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}