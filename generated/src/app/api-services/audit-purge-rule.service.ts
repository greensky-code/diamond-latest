/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuditPurgeRule } from '../api-models/audit-purge-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuditPurgeRuleService {

    private auditPurgeRuleUrl: string = `${environment.apiUrl}/auditpurgerules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuditPurgeRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuditPurgeRule[]> {
        var url = `${this.auditPurgeRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuditPurgeRule[]),
                catchError(this.sharedService.handleError))
    }

    getAuditPurgeRule(ruleName : string): Observable<AuditPurgeRule> {
        return this.httpClient.get(`${this.auditPurgeRuleUrl}/${ruleName}`, {observe: 'response'})
            .pipe(map(response => response.body as AuditPurgeRule),
                catchError(this.sharedService.handleError))
    }

    getAuditPurgeRulesCount(): Observable<number> {
        var url = `${this.auditPurgeRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuditPurgeRule(auditPurgeRule : AuditPurgeRule): Observable<any> {
        let body = JSON.stringify(auditPurgeRule);
        return this.httpClient.post(this.auditPurgeRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuditPurgeRule(auditPurgeRule : AuditPurgeRule, ruleName : string): Observable<any> {
        let body = JSON.stringify(auditPurgeRule);
        return this.httpClient.put(`${this.auditPurgeRuleUrl}/${ruleName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuditPurgeRule(auditPurgeRule : AuditPurgeRule, ruleName : string): Observable<any> {
        let body = JSON.stringify(auditPurgeRule);
        return this.httpClient.patch(`${this.auditPurgeRuleUrl}/${ruleName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuditPurgeRule(ruleName : string): Observable<any> {
        return this.httpClient.delete(`${this.auditPurgeRuleUrl}/${ruleName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}