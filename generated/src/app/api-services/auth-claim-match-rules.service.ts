/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthClaimMatchRules } from '../api-models/auth-claim-match-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthClaimMatchRulesService {

    private authClaimMatchRulesUrl: string = `${environment.apiUrl}/authclaimmatchruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthClaimMatchRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthClaimMatchRules[]> {
        var url = `${this.authClaimMatchRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimMatchRules[]),
                catchError(this.sharedService.handleError))
    }

    getAuthClaimMatchRules(lineOfBusiness : string): Observable<AuthClaimMatchRules> {
        return this.httpClient.get(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimMatchRules),
                catchError(this.sharedService.handleError))
    }

    getAuthClaimMatchRulesesCount(): Observable<number> {
        var url = `${this.authClaimMatchRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuthClaimMatchRules(authClaimMatchRules : AuthClaimMatchRules): Observable<any> {
        let body = JSON.stringify(authClaimMatchRules);
        return this.httpClient.post(this.authClaimMatchRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthClaimMatchRules(authClaimMatchRules : AuthClaimMatchRules, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimMatchRules);
        return this.httpClient.put(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthClaimMatchRules(authClaimMatchRules : AuthClaimMatchRules, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimMatchRules);
        return this.httpClient.patch(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthClaimMatchRules(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}