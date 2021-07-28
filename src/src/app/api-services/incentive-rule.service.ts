/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IncentiveRule } from '../api-models/incentive-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IncentiveRuleService {

    private incentiveRuleUrl: string = `${environment.apiUrl}/incentiverules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIncentiveRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IncentiveRule[]> {
        var url = `${this.incentiveRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IncentiveRule[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getIncentiveRule(seqIncentiveRule: number): Observable<IncentiveRule> {
        return this.httpClient.get(`${this.incentiveRuleUrl}/${seqIncentiveRule}`, {observe: 'response'})
            .pipe(map(response => response.body as IncentiveRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getIncentiveRuleByRuleId(incentiveRule: any): Observable<any> {
        let body = JSON.stringify(incentiveRule);
        return this.httpClient.post(`${this.incentiveRuleUrl}/find-by-rule-id`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getIncentiveRulesCount(): Observable<number> {
        var url = `${this.incentiveRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createIncentiveRule(incentiveRule : IncentiveRule): Observable<any> {
        let body = JSON.stringify(incentiveRule);
        return this.httpClient.post(this.incentiveRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateIncentiveRule(incentiveRule : IncentiveRule, seqIncentiveRule : number): Observable<any> {
        let body = JSON.stringify(incentiveRule);
        return this.httpClient.put(`${this.incentiveRuleUrl}/${seqIncentiveRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateIncentiveRule(incentiveRule : IncentiveRule, seqIncentiveRule : number): Observable<any> {
        let body = JSON.stringify(incentiveRule);
        return this.httpClient.patch(`${this.incentiveRuleUrl}/${seqIncentiveRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteIncentiveRule(seqIncentiveRule : number): Observable<any> {
        return this.httpClient.delete(`${this.incentiveRuleUrl}/${seqIncentiveRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
