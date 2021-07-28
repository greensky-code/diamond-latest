/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthProcedureRange } from '../api-models/auth-procedure-range.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthProcedureRangeService {

    private authProcedureRangeUrl: string = `${environment.apiUrl}/authprocedureranges`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthProcedureRanges(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthProcedureRange[]> {
        var url = `${this.authProcedureRangeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRange[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthProcedureRange(authProcRangeId : string): Observable<AuthProcedureRange> {
        return this.httpClient.get(`${this.authProcedureRangeUrl}/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedureRange),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthProcedureRangesCount(): Observable<number> {
        var url = `${this.authProcedureRangeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createAuthProcedureRange(authProcedureRange : AuthProcedureRange): Observable<any> {
        let body = JSON.stringify(authProcedureRange);
        return this.httpClient.post(this.authProcedureRangeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthProcedureRange(authProcedureRange : AuthProcedureRange, authProcRangeId : string): Observable<any> {
        let body = JSON.stringify(authProcedureRange);
        return this.httpClient.put(`${this.authProcedureRangeUrl}/${authProcRangeId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthProcedureRange(authProcedureRange : AuthProcedureRange, authProcRangeId : string): Observable<any> {
        let body = JSON.stringify(authProcedureRange);
        return this.httpClient.patch(`${this.authProcedureRangeUrl}/${authProcRangeId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthProcedureRange(authProcRangeId : string): Observable<any> {
        return this.httpClient.delete(`${this.authProcedureRangeUrl}/${authProcRangeId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
