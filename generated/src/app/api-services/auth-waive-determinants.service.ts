/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthWaiveDeterminants } from '../api-models/auth-waive-determinants.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthWaiveDeterminantsService {

    private authWaiveDeterminantsUrl: string = `${environment.apiUrl}/authwaivedeterminantss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthWaiveDeterminantss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthWaiveDeterminants[]> {
        var url = `${this.authWaiveDeterminantsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveDeterminants[]),
                catchError(this.sharedService.handleError))
    }

    getAuthWaiveDeterminants(seqAwRule : number): Observable<AuthWaiveDeterminants> {
        return this.httpClient.get(`${this.authWaiveDeterminantsUrl}/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveDeterminants),
                catchError(this.sharedService.handleError))
    }

    getAuthWaiveDeterminantssCount(): Observable<number> {
        var url = `${this.authWaiveDeterminantsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqAwRule(seqAwRule : number): Observable<AuthWaiveDeterminants[]> {
        return this.httpClient.get(`${this.authWaiveDeterminantsUrl}/find-by-seqawrule/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveDeterminants),
                catchError(this.sharedService.handleError))
    }




    createAuthWaiveDeterminants(authWaiveDeterminants : AuthWaiveDeterminants): Observable<any> {
        let body = JSON.stringify(authWaiveDeterminants);
        return this.httpClient.post(this.authWaiveDeterminantsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthWaiveDeterminants(authWaiveDeterminants : AuthWaiveDeterminants, seqAwRule : number): Observable<any> {
        let body = JSON.stringify(authWaiveDeterminants);
        return this.httpClient.put(`${this.authWaiveDeterminantsUrl}/${seqAwRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthWaiveDeterminants(authWaiveDeterminants : AuthWaiveDeterminants, seqAwRule : number): Observable<any> {
        let body = JSON.stringify(authWaiveDeterminants);
        return this.httpClient.patch(`${this.authWaiveDeterminantsUrl}/${seqAwRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthWaiveDeterminants(seqAwRule : number): Observable<any> {
        return this.httpClient.delete(`${this.authWaiveDeterminantsUrl}/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}