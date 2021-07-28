/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CodereviewRules } from '../api-models/codereview-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CodereviewRulesService {

    private codereviewRulesUrl: string = `${environment.apiUrl}/codereviewruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCodereviewRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CodereviewRules[]> {
        var url = `${this.codereviewRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewRules[]),
                catchError(this.sharedService.handleError))
    }

    getCodereviewRules(claimResultCode : string): Observable<CodereviewRules> {
        return this.httpClient.get(`${this.codereviewRulesUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewRules),
                catchError(this.sharedService.handleError))
    }

    getCodereviewRulesesCount(): Observable<number> {
        var url = `${this.codereviewRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCodereviewRules(codereviewRules : CodereviewRules): Observable<any> {
        let body = JSON.stringify(codereviewRules);
        return this.httpClient.post(this.codereviewRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCodereviewRules(codereviewRules : CodereviewRules, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(codereviewRules);
        return this.httpClient.put(`${this.codereviewRulesUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCodereviewRules(codereviewRules : CodereviewRules, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(codereviewRules);
        return this.httpClient.patch(`${this.codereviewRulesUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCodereviewRules(claimResultCode : string): Observable<any> {
        return this.httpClient.delete(`${this.codereviewRulesUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}