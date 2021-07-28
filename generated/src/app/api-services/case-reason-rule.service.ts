/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CaseReasonRule } from '../api-models/case-reason-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CaseReasonRuleService {

    private caseReasonRuleUrl: string = `${environment.apiUrl}/casereasonrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCaseReasonRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CaseReasonRule[]> {
        var url = `${this.caseReasonRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CaseReasonRule[]),
                catchError(this.sharedService.handleError))
    }

    getCaseReasonRule(seqReasonRuleId : number): Observable<CaseReasonRule> {
        return this.httpClient.get(`${this.caseReasonRuleUrl}/${seqReasonRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReasonRule),
                catchError(this.sharedService.handleError))
    }

    getCaseReasonRulesCount(): Observable<number> {
        var url = `${this.caseReasonRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCategory1CsCode(category1CsCode : string): Observable<CaseReasonRule[]> {
        return this.httpClient.get(`${this.caseReasonRuleUrl}/find-by-category1cscode/${category1CsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReasonRule),
                catchError(this.sharedService.handleError))
    }
    findByCategory2CsCode(category2CsCode : string): Observable<CaseReasonRule[]> {
        return this.httpClient.get(`${this.caseReasonRuleUrl}/find-by-category2cscode/${category2CsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReasonRule),
                catchError(this.sharedService.handleError))
    }
    findByReasonCsCode(reasonCsCode : string): Observable<CaseReasonRule[]> {
        return this.httpClient.get(`${this.caseReasonRuleUrl}/find-by-reasoncscode/${reasonCsCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseReasonRule),
                catchError(this.sharedService.handleError))
    }




    createCaseReasonRule(caseReasonRule : CaseReasonRule): Observable<any> {
        let body = JSON.stringify(caseReasonRule);
        return this.httpClient.post(this.caseReasonRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCaseReasonRule(caseReasonRule : CaseReasonRule, seqReasonRuleId : number): Observable<any> {
        let body = JSON.stringify(caseReasonRule);
        return this.httpClient.put(`${this.caseReasonRuleUrl}/${seqReasonRuleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCaseReasonRule(caseReasonRule : CaseReasonRule, seqReasonRuleId : number): Observable<any> {
        let body = JSON.stringify(caseReasonRule);
        return this.httpClient.patch(`${this.caseReasonRuleUrl}/${seqReasonRuleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCaseReasonRule(seqReasonRuleId : number): Observable<any> {
        return this.httpClient.delete(`${this.caseReasonRuleUrl}/${seqReasonRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}