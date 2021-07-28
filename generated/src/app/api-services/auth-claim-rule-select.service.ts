/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthClaimRuleSelect } from '../api-models/auth-claim-rule-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthClaimRuleSelectService {

    private authClaimRuleSelectUrl: string = `${environment.apiUrl}/authclaimruleselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthClaimRuleSelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthClaimRuleSelect[]> {
        var url = `${this.authClaimRuleSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimRuleSelect[]),
                catchError(this.sharedService.handleError))
    }

    getAuthClaimRuleSelect(lineOfBusiness : string): Observable<AuthClaimRuleSelect> {
        return this.httpClient.get(`${this.authClaimRuleSelectUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimRuleSelect),
                catchError(this.sharedService.handleError))
    }

    getAuthClaimRuleSelectsCount(): Observable<number> {
        var url = `${this.authClaimRuleSelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAuthClaimRuleSelect(authClaimRuleSelect : AuthClaimRuleSelect): Observable<any> {
        let body = JSON.stringify(authClaimRuleSelect);
        return this.httpClient.post(this.authClaimRuleSelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthClaimRuleSelect(authClaimRuleSelect : AuthClaimRuleSelect, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimRuleSelect);
        return this.httpClient.put(`${this.authClaimRuleSelectUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthClaimRuleSelect(authClaimRuleSelect : AuthClaimRuleSelect, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimRuleSelect);
        return this.httpClient.patch(`${this.authClaimRuleSelectUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthClaimRuleSelect(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.authClaimRuleSelectUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}