/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClmDtlAuthProcLnkRule } from '../api-models/clm-dtl-auth-proc-lnk-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClmDtlAuthProcLnkRuleService {

    private clmDtlAuthProcLnkRuleUrl: string = `${environment.apiUrl}/clmdtlauthproclnkrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClmDtlAuthProcLnkRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClmDtlAuthProcLnkRule[]> {
        var url = `${this.clmDtlAuthProcLnkRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClmDtlAuthProcLnkRule[]),
                catchError(this.sharedService.handleError))
    }

    getClmDtlAuthProcLnkRule(ruleId : string): Observable<ClmDtlAuthProcLnkRule> {
        return this.httpClient.get(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClmDtlAuthProcLnkRule),
                catchError(this.sharedService.handleError))
    }

    getClmDtlAuthProcLnkRulesCount(): Observable<number> {
        var url = `${this.clmDtlAuthProcLnkRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule : ClmDtlAuthProcLnkRule): Observable<any> {
        let body = JSON.stringify(clmDtlAuthProcLnkRule);
        return this.httpClient.post(this.clmDtlAuthProcLnkRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule : ClmDtlAuthProcLnkRule, ruleId : string): Observable<any> {
        let body = JSON.stringify(clmDtlAuthProcLnkRule);
        return this.httpClient.put(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule : ClmDtlAuthProcLnkRule, ruleId : string): Observable<any> {
        let body = JSON.stringify(clmDtlAuthProcLnkRule);
        return this.httpClient.patch(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClmDtlAuthProcLnkRule(ruleId : string): Observable<any> {
        return this.httpClient.delete(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}