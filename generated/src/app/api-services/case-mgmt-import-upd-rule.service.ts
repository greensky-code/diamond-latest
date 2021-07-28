/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CaseMgmtImportUpdRule } from '../api-models/case-mgmt-import-upd-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CaseMgmtImportUpdRuleService {

    private caseMgmtImportUpdRuleUrl: string = `${environment.apiUrl}/casemgmtimportupdrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCaseMgmtImportUpdRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CaseMgmtImportUpdRule[]> {
        var url = `${this.caseMgmtImportUpdRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CaseMgmtImportUpdRule[]),
                catchError(this.sharedService.handleError))
    }

    getCaseMgmtImportUpdRule(caseMgmtImportUpdRuleSeq : number): Observable<CaseMgmtImportUpdRule> {
        return this.httpClient.get(`${this.caseMgmtImportUpdRuleUrl}/${caseMgmtImportUpdRuleSeq}`, {observe: 'response'})
            .pipe(map(response => response.body as CaseMgmtImportUpdRule),
                catchError(this.sharedService.handleError))
    }

    getCaseMgmtImportUpdRulesCount(): Observable<number> {
        var url = `${this.caseMgmtImportUpdRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCaseMgmtImportUpdRule(caseMgmtImportUpdRule : CaseMgmtImportUpdRule): Observable<any> {
        let body = JSON.stringify(caseMgmtImportUpdRule);
        return this.httpClient.post(this.caseMgmtImportUpdRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCaseMgmtImportUpdRule(caseMgmtImportUpdRule : CaseMgmtImportUpdRule, caseMgmtImportUpdRuleSeq : number): Observable<any> {
        let body = JSON.stringify(caseMgmtImportUpdRule);
        return this.httpClient.put(`${this.caseMgmtImportUpdRuleUrl}/${caseMgmtImportUpdRuleSeq}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCaseMgmtImportUpdRule(caseMgmtImportUpdRule : CaseMgmtImportUpdRule, caseMgmtImportUpdRuleSeq : number): Observable<any> {
        let body = JSON.stringify(caseMgmtImportUpdRule);
        return this.httpClient.patch(`${this.caseMgmtImportUpdRuleUrl}/${caseMgmtImportUpdRuleSeq}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCaseMgmtImportUpdRule(caseMgmtImportUpdRuleSeq : number): Observable<any> {
        return this.httpClient.delete(`${this.caseMgmtImportUpdRuleUrl}/${caseMgmtImportUpdRuleSeq}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}