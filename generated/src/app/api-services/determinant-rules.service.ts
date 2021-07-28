/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantRules } from '../api-models/determinant-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DeterminantRulesService {

    private determinantRulesUrl: string = `${environment.apiUrl}/determinantruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantRules[]> {
        var url = `${this.determinantRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantRules[]),
                catchError(this.sharedService.handleError))
    }

    getDeterminantRules(keyword : string): Observable<DeterminantRules> {
        return this.httpClient.get(`${this.determinantRulesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantRules),
                catchError(this.sharedService.handleError))
    }

    getDeterminantRulesesCount(): Observable<number> {
        var url = `${this.determinantRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDeterminantRules(determinantRules : DeterminantRules): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.post(this.determinantRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDeterminantRules(determinantRules : DeterminantRules, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.put(`${this.determinantRulesUrl}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDeterminantRules(determinantRules : DeterminantRules, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.patch(`${this.determinantRulesUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDeterminantRules(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantRulesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}