/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthWaiveRules } from '../api-models/auth-waive-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthWaiveRulesService {

    private authWaiveRulesUrl: string = `${environment.apiUrl}/authwaiveruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthWaiveRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthWaiveRules[]> {
        var url = `${this.authWaiveRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveRules[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthWaiveRules(seqAwRule : number): Observable<AuthWaiveRules> {
        return this.httpClient.get(`${this.authWaiveRulesUrl}/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveRules),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthWaiveRulesesCount(): Observable<number> {
        var url = `${this.authWaiveRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createAuthWaiveRules(authWaiveRules : AuthWaiveRules): Observable<any> {
        let body = JSON.stringify(authWaiveRules);
        return this.httpClient.post(this.authWaiveRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    updateAuthWaiveRules(authWaiveRules : AuthWaiveRules, seqAwRule : number): Observable<any> {
        let body = JSON.stringify(authWaiveRules);
        return this.httpClient.put(`${this.authWaiveRulesUrl}/${seqAwRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthWaiveRules(authWaiveRules : AuthWaiveRules, seqAwRule : number): Observable<any> {
        let body = JSON.stringify(authWaiveRules);
        return this.httpClient.patch(`${this.authWaiveRulesUrl}/${seqAwRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthWaiveRules(seqAwRule : number): Observable<any> {
        return this.httpClient.delete(`${this.authWaiveRulesUrl}/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
