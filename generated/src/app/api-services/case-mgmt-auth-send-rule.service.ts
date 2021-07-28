/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CaseMgmtAuthSendRule } from '../api-models/case-mgmt-auth-send-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CaseMgmtAuthSendRuleService {

    private caseMgmtAuthSendRuleUrl: string = `${environment.apiUrl}/casemgmtauthsendrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCaseMgmtAuthSendRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CaseMgmtAuthSendRule[]> {
        var url = `${this.caseMgmtAuthSendRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CaseMgmtAuthSendRule[]),
                catchError(this.sharedService.handleError))
    }

    getCaseMgmtAuthSendRule(caseMgmtAuthSendRuleSeq : number): Observable<CaseMgmtAuthSendRule> {
        return this.httpClient.get(`${this.caseMgmtAuthSendRuleUrl}/${caseMgmtAuthSendRuleSeq}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseMgmtAuthSendRule),
                catchError(this.sharedService.handleError))
    }

    getCaseMgmtAuthSendRulesCount(): Observable<number> {
        var url = `${this.caseMgmtAuthSendRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCaseMgmtAuthSendRule(caseMgmtAuthSendRule : CaseMgmtAuthSendRule): Observable<any> {
        let body = JSON.stringify(caseMgmtAuthSendRule);
        return this.httpClient.post(this.caseMgmtAuthSendRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCaseMgmtAuthSendRule(caseMgmtAuthSendRule : CaseMgmtAuthSendRule, caseMgmtAuthSendRuleSeq : number): Observable<any> {
        let body = JSON.stringify(caseMgmtAuthSendRule);
        return this.httpClient.put(`${this.caseMgmtAuthSendRuleUrl}/${caseMgmtAuthSendRuleSeq}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCaseMgmtAuthSendRule(caseMgmtAuthSendRule : CaseMgmtAuthSendRule, caseMgmtAuthSendRuleSeq : number): Observable<any> {
        let body = JSON.stringify(caseMgmtAuthSendRule);
        return this.httpClient.patch(`${this.caseMgmtAuthSendRuleUrl}/${caseMgmtAuthSendRuleSeq}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCaseMgmtAuthSendRule(caseMgmtAuthSendRuleSeq : number): Observable<any> {
        return this.httpClient.delete(`${this.caseMgmtAuthSendRuleUrl}/${caseMgmtAuthSendRuleSeq}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}