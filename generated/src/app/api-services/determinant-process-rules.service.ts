/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantProcessRules } from '../api-models/determinant-process-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DeterminantProcessRulesService {

    private determinantProcessRulesUrl: string = `${environment.apiUrl}/determinantprocessruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantProcessRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantProcessRules[]> {
        var url = `${this.determinantProcessRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantProcessRules[]),
                catchError(this.sharedService.handleError))
    }

    getDeterminantProcessRules(keyword : string): Observable<DeterminantProcessRules> {
        return this.httpClient.get(`${this.determinantProcessRulesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantProcessRules),
                catchError(this.sharedService.handleError))
    }

    getDeterminantProcessRulesesCount(): Observable<number> {
        var url = `${this.determinantProcessRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDeterminantProcessRules(determinantProcessRules : DeterminantProcessRules): Observable<any> {
        let body = JSON.stringify(determinantProcessRules);
        return this.httpClient.post(this.determinantProcessRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDeterminantProcessRules(determinantProcessRules : DeterminantProcessRules, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantProcessRules);
        return this.httpClient.put(`${this.determinantProcessRulesUrl}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDeterminantProcessRules(determinantProcessRules : DeterminantProcessRules, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantProcessRules);
        return this.httpClient.patch(`${this.determinantProcessRulesUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDeterminantProcessRules(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantProcessRulesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}