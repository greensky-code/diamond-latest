/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MediCalPhpStatusRule } from '../api-models/medi-cal-php-status-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MediCalPhpStatusRuleService {

    private mediCalPhpStatusRuleUrl: string = `${environment.apiUrl}/medicalphpstatusrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMediCalPhpStatusRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MediCalPhpStatusRule[]> {
        var url = `${this.mediCalPhpStatusRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MediCalPhpStatusRule[]),
                catchError(this.sharedService.handleError))
    }

    getMediCalPhpStatusRule(countyCode : string): Observable<MediCalPhpStatusRule> {
        return this.httpClient.get(`${this.mediCalPhpStatusRuleUrl}/${countyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as MediCalPhpStatusRule),
                catchError(this.sharedService.handleError))
    }

    getMediCalPhpStatusRulesCount(): Observable<number> {
        var url = `${this.mediCalPhpStatusRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMediCalPhpStatusRule(mediCalPhpStatusRule : MediCalPhpStatusRule): Observable<any> {
        let body = JSON.stringify(mediCalPhpStatusRule);
        return this.httpClient.post(this.mediCalPhpStatusRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMediCalPhpStatusRule(mediCalPhpStatusRule : MediCalPhpStatusRule, countyCode : string): Observable<any> {
        let body = JSON.stringify(mediCalPhpStatusRule);
        return this.httpClient.put(`${this.mediCalPhpStatusRuleUrl}/${countyCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMediCalPhpStatusRule(mediCalPhpStatusRule : MediCalPhpStatusRule, countyCode : string): Observable<any> {
        let body = JSON.stringify(mediCalPhpStatusRule);
        return this.httpClient.patch(`${this.mediCalPhpStatusRuleUrl}/${countyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMediCalPhpStatusRule(countyCode : string): Observable<any> {
        return this.httpClient.delete(`${this.mediCalPhpStatusRuleUrl}/${countyCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}