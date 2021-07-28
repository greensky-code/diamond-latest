/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {AuthClaimMatchRules} from "../../api-models/authorization/auth-claim-match-rules.model";

@Injectable({
    providedIn: 'root'
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthClaimMatchRules(lineOfBusiness : string): Observable<AuthClaimMatchRules> {
        return this.httpClient.get(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimMatchRules),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthClaimMatchRulesesCount(): Observable<number> {
        var url = `${this.authClaimMatchRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createAuthClaimMatchRules(authClaimMatchRules : AuthClaimMatchRules): Observable<any> {
        let body = JSON.stringify(authClaimMatchRules);
        return this.httpClient.post(this.authClaimMatchRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthClaimMatchRules(authClaimMatchRules : AuthClaimMatchRules, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimMatchRules);
        return this.httpClient.put(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthClaimMatchRules(authClaimMatchRules : AuthClaimMatchRules, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimMatchRules);
        return this.httpClient.patch(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthClaimMatchRules(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.authClaimMatchRulesUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
