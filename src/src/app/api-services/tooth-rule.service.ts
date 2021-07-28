/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ToothRule } from '../api-models/tooth-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ToothRuleService {

    private toothRuleUrl = `${environment.apiUrl}/toothrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getToothRules(usePagination= false, page = 0, size = 0): Observable<ToothRule[]> {
        let url = `${this.toothRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ToothRule[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getToothRule(seqToothRuleId: number): Observable<ToothRule> {
        return this.httpClient.get(`${this.toothRuleUrl}/${seqToothRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body as ToothRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getToothRuleByRuleNumber(toothRule: any): Observable<any> {
        let body = JSON.stringify(toothRule);
        return this.httpClient.post(`${this.toothRuleUrl}/find-by-tooth-rule-id`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getToothRulesCount(): Observable<number> {
        let url = `${this.toothRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createToothRule(toothRule: ToothRule): Observable<any> {
        let body = JSON.stringify(toothRule);
        return this.httpClient.post(this.toothRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateToothRule(toothRule: ToothRule, seqToothRuleId: number): Observable<any> {
        let body = JSON.stringify(toothRule);
        return this.httpClient.put(`${this.toothRuleUrl}/${seqToothRuleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateToothRule(toothRule: ToothRule, seqToothRuleId: number): Observable<any> {
        let body = JSON.stringify(toothRule);
        return this.httpClient.patch(`${this.toothRuleUrl}/${seqToothRuleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteToothRule(seqToothRuleId: number): Observable<any> {
        return this.httpClient.delete(`${this.toothRuleUrl}/${seqToothRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
