/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import {ClmDtlAuthProcLnkRule} from '../api-models';

@Injectable()
export class ClmDtlAuthProcLnkRuleService {

    private clmDtlAuthProcLnkRuleUrl: string = `${environment.apiUrl}/claimdetailauthproclnkrule`;
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getClmDtlAuthProcLnkRule(ruleId : string): Observable<ClmDtlAuthProcLnkRule> {
        return this.httpClient.get(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClmDtlAuthProcLnkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getClmDtlAuthProcLnkRulesCount(): Observable<number> {
        var url = `${this.clmDtlAuthProcLnkRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule : ClmDtlAuthProcLnkRule): Observable<any> {
        let body = JSON.stringify(clmDtlAuthProcLnkRule);
        return this.httpClient.post(this.clmDtlAuthProcLnkRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule : ClmDtlAuthProcLnkRule, ruleId : string): Observable<any> {
        let body = JSON.stringify(clmDtlAuthProcLnkRule);
        return this.httpClient.put(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule : ClmDtlAuthProcLnkRule, ruleId : string): Observable<any> {
        let body = JSON.stringify(clmDtlAuthProcLnkRule);
        return this.httpClient.patch(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteClmDtlAuthProcLnkRule(ruleId : string): Observable<any> {
        return this.httpClient.delete(`${this.clmDtlAuthProcLnkRuleUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSubmtVsAuthProcCodes(languageId: number): Observable<any> {
        return this.httpClient.get(`${this.clmDtlAuthProcLnkRuleUrl}/submit-auth-proc-code/drop-downs/${languageId}`, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthProcStatuses(languageId: number): Observable<any> {
        return this.httpClient.get(`${this.clmDtlAuthProcLnkRuleUrl}/auth-proc-status/drop-downs/${languageId}`, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCodeByCodeTypeAndLanguage(codeType: string, languageId: number): Observable<any> {
        return this.httpClient.post(`${this.clmDtlAuthProcLnkRuleUrl}/system-code/drop-downs/${codeType}/${languageId}`, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
