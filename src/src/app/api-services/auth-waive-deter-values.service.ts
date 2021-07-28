/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthWaiveDeterValues } from '../api-models/auth-waive-deter-values.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthWaiveDeterValuesService {

    private authWaiveDeterValuesUrl: string = `${environment.apiUrl}/authwaivedetervalueses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthWaiveDeterValueses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthWaiveDeterValues[]> {
        var url = `${this.authWaiveDeterValuesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveDeterValues[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthWaiveDeterValues(seqAwRule : number): Observable<AuthWaiveDeterValues> {
        return this.httpClient.get(`${this.authWaiveDeterValuesUrl}/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveDeterValues),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthWaiveDeterValuesBySearchSequenceAndSeqAwRule(searchSequence: any, seqAwRule: number): Observable<AuthWaiveDeterValues[]> {
        return this.httpClient.get(`${this.authWaiveDeterValuesUrl}/${searchSequence}/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthWaiveDeterValues[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthWaiveDeterValuesesCount(): Observable<number> {
        var url = `${this.authWaiveDeterValuesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createAuthWaiveDeterValues(authWaiveDeterValues : AuthWaiveDeterValues): Observable<any> {
        let body = JSON.stringify(authWaiveDeterValues);
        return this.httpClient.post(this.authWaiveDeterValuesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthWaiveDeterValues(authWaiveDeterValues : AuthWaiveDeterValues, seqAwRule : number): Observable<any> {
        let body = JSON.stringify(authWaiveDeterValues);
        return this.httpClient.put(`${this.authWaiveDeterValuesUrl}/${seqAwRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthWaiveDeterValues(authWaiveDeterValues : AuthWaiveDeterValues, seqAwRule : number): Observable<any> {
        let body = JSON.stringify(authWaiveDeterValues);
        return this.httpClient.patch(`${this.authWaiveDeterValuesUrl}/${seqAwRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthWaiveDeterValues(seqAwRule : number): Observable<any> {
        return this.httpClient.delete(`${this.authWaiveDeterValuesUrl}/${seqAwRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthWaiveDeterValuesForm(apiRecords: AuthWaiveDeterValues[]) {
        let body = JSON.stringify(apiRecords);
        return this.httpClient.post(`${this.authWaiveDeterValuesUrl}/updateAuthWaiveDeterValues`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
