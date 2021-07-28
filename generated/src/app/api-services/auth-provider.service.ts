/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../api-models/auth-provider.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthProviderService {

    private authProviderUrl: string = `${environment.apiUrl}/authproviders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthProviders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthProvider[]> {
        var url = `${this.authProviderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthProvider[]),
                catchError(this.sharedService.handleError))
    }

    getAuthProvider(authNumber : number): Observable<AuthProvider> {
        return this.httpClient.get(`${this.authProviderUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProvider),
                catchError(this.sharedService.handleError))
    }

    getAuthProvidersCount(): Observable<number> {
        var url = `${this.authProviderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendId(seqVendId : number): Observable<AuthProvider[]> {
        return this.httpClient.get(`${this.authProviderUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProvider),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvContract(seqProvContract : number): Observable<AuthProvider[]> {
        return this.httpClient.get(`${this.authProviderUrl}/find-by-seqprovcontract/${seqProvContract}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProvider),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<AuthProvider[]> {
        return this.httpClient.get(`${this.authProviderUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProvider),
                catchError(this.sharedService.handleError))
    }
    findBySeqCovProvGrp(seqCovProvGrp : number): Observable<AuthProvider[]> {
        return this.httpClient.get(`${this.authProviderUrl}/find-by-seqcovprovgrp/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProvider),
                catchError(this.sharedService.handleError))
    }
    findByPrevSeqProvId(prevSeqProvId : number): Observable<AuthProvider[]> {
        return this.httpClient.get(`${this.authProviderUrl}/find-by-prevseqprovid/${prevSeqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProvider),
                catchError(this.sharedService.handleError))
    }




    createAuthProvider(authProvider : AuthProvider): Observable<any> {
        let body = JSON.stringify(authProvider);
        return this.httpClient.post(this.authProviderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthProvider(authProvider : AuthProvider, authNumber : number): Observable<any> {
        let body = JSON.stringify(authProvider);
        return this.httpClient.put(`${this.authProviderUrl}/${authNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthProvider(authProvider : AuthProvider, authNumber : number): Observable<any> {
        let body = JSON.stringify(authProvider);
        return this.httpClient.patch(`${this.authProviderUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthProvider(authNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.authProviderUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}