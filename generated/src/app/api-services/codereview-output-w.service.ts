/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CodereviewOutputW } from '../api-models/codereview-output-w.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CodereviewOutputWService {

    private codereviewOutputWUrl: string = `${environment.apiUrl}/codereviewoutputws`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCodereviewOutputWs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CodereviewOutputW[]> {
        var url = `${this.codereviewOutputWUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewOutputW[]),
                catchError(this.sharedService.handleError))
    }

    getCodereviewOutputW(loadcount : number): Observable<CodereviewOutputW> {
        return this.httpClient.get(`${this.codereviewOutputWUrl}/${loadcount}`, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewOutputW),
                catchError(this.sharedService.handleError))
    }

    getCodereviewOutputWsCount(): Observable<number> {
        var url = `${this.codereviewOutputWUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCodereviewOutputW(codereviewOutputW : CodereviewOutputW): Observable<any> {
        let body = JSON.stringify(codereviewOutputW);
        return this.httpClient.post(this.codereviewOutputWUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCodereviewOutputW(codereviewOutputW : CodereviewOutputW, loadcount : number): Observable<any> {
        let body = JSON.stringify(codereviewOutputW);
        return this.httpClient.put(`${this.codereviewOutputWUrl}/${loadcount}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCodereviewOutputW(codereviewOutputW : CodereviewOutputW, loadcount : number): Observable<any> {
        let body = JSON.stringify(codereviewOutputW);
        return this.httpClient.patch(`${this.codereviewOutputWUrl}/${loadcount}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCodereviewOutputW(loadcount : number): Observable<any> {
        return this.httpClient.delete(`${this.codereviewOutputWUrl}/${loadcount}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}