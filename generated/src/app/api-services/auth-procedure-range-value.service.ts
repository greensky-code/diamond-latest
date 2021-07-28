/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthProcedureRangeValue } from '../api-models/auth-procedure-range-value.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthProcedureRangeValueService {

    private authProcedureRangeValueUrl: string = `${environment.apiUrl}/authprocedurerangevalues`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthProcedureRangeValues(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthProcedureRangeValue[]> {
        var url = `${this.authProcedureRangeValueUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRangeValue[]),
                catchError(this.sharedService.handleError))
    }

    getAuthProcedureRangeValue(authProcRangeId : string): Observable<AuthProcedureRangeValue> {
        return this.httpClient.get(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRangeValue),
                catchError(this.sharedService.handleError))
    }

    getAuthProcedureRangeValuesCount(): Observable<number> {
        var url = `${this.authProcedureRangeValueUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByAuthProcRangeId(authProcRangeId : string): Observable<AuthProcedureRangeValue[]> {
        return this.httpClient.get(`${this.authProcedureRangeValueUrl}/find-by-authprocrangeid/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRangeValue),
                catchError(this.sharedService.handleError))
    }




    createAuthProcedureRangeValue(authProcedureRangeValue : AuthProcedureRangeValue): Observable<any> {
        let body = JSON.stringify(authProcedureRangeValue);
        return this.httpClient.post(this.authProcedureRangeValueUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthProcedureRangeValue(authProcedureRangeValue : AuthProcedureRangeValue, authProcRangeId : string): Observable<any> {
        let body = JSON.stringify(authProcedureRangeValue);
        return this.httpClient.put(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthProcedureRangeValue(authProcedureRangeValue : AuthProcedureRangeValue, authProcRangeId : string): Observable<any> {
        let body = JSON.stringify(authProcedureRangeValue);
        return this.httpClient.patch(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthProcedureRangeValue(authProcRangeId : string): Observable<any> {
        return this.httpClient.delete(`${this.authProcedureRangeValueUrl}/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}