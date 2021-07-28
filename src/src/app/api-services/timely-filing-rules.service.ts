/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { TimelyFilingRules } from '../api-models/timely-filing-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TimelyFilingRulesService {

    private timelyFilingRulesUrl: string = `${environment.apiUrl}/timelyfilingruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getTimelyFilingRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<TimelyFilingRules[]> {
        var url = `${this.timelyFilingRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as TimelyFilingRules[]),
                catchError(this.sharedService.handleError))
    }

    getTimelyFilingRules(seqTfrulId : number): Observable<TimelyFilingRules> {
        return this.httpClient.get(`${this.timelyFilingRulesUrl}/${seqTfrulId}`, {observe: 'response'})
            .pipe(map(response => response.body as TimelyFilingRules),
                catchError(this.sharedService.handleError))
    }

    getTimelyFilingRulesByRuleOrder(claimType: string, ruleOrder : number): Observable<TimelyFilingRules[]> {
        return this.httpClient.get(`${this.timelyFilingRulesUrl}/rule-order/${claimType}/${ruleOrder}`, {observe: 'response'})
            .pipe(map(response => response.body as TimelyFilingRules[]),
                catchError(this.sharedService.handleError))
    }

    getTimelyFilingRulesesCount(): Observable<number> {
        var url = `${this.timelyFilingRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    createTimelyFilingRules(timelyFilingRules : TimelyFilingRules): Observable<any> {
        let body = JSON.stringify(timelyFilingRules);
        return this.httpClient.post(this.timelyFilingRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateTimelyFilingRules(timelyFilingRules : TimelyFilingRules, seqTfrulId : number): Observable<any> {
        let body = JSON.stringify(timelyFilingRules);
        return this.httpClient.put(`${this.timelyFilingRulesUrl}/${seqTfrulId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateTimelyFilingRules(timelyFilingRules : TimelyFilingRules, seqTfrulId : number): Observable<any> {
        let body = JSON.stringify(timelyFilingRules);
        return this.httpClient.patch(`${this.timelyFilingRulesUrl}/${seqTfrulId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteTimelyFilingRules(seqTfrulId : number): Observable<any> {
        return this.httpClient.delete(`${this.timelyFilingRulesUrl}/${seqTfrulId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}