/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthProcedure } from '../api-models/auth-procedure.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthProcedureService {

    private authProcedureUrl: string = `${environment.apiUrl}/authprocedures`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthProcedures(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthProcedure[]> {
        var url = `${this.authProcedureUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedure[]),
                catchError(this.sharedService.handleError))
    }

    getAuthProcedure(authNumber : number): Observable<AuthProcedure> {
        return this.httpClient.get(`${this.authProcedureUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedure),
                catchError(this.sharedService.handleError))
    }

    getAuthProceduresCount(): Observable<number> {
        var url = `${this.authProcedureUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByStatusReason(statusReason : string): Observable<AuthProcedure[]> {
        return this.httpClient.get(`${this.authProcedureUrl}/find-by-statusreason/${statusReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedure),
                catchError(this.sharedService.handleError))
    }
    findByMedDefCode(medDefCode : string): Observable<AuthProcedure[]> {
        return this.httpClient.get(`${this.authProcedureUrl}/find-by-meddefcode/${medDefCode}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthProcedure),
                catchError(this.sharedService.handleError))
    }




    createAuthProcedure(authProcedure : AuthProcedure): Observable<any> {
        let body = JSON.stringify(authProcedure);
        return this.httpClient.post(this.authProcedureUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthProcedure(authProcedure : AuthProcedure, authNumber : number): Observable<any> {
        let body = JSON.stringify(authProcedure);
        return this.httpClient.put(`${this.authProcedureUrl}/${authNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthProcedure(authProcedure : AuthProcedure, authNumber : number): Observable<any> {
        let body = JSON.stringify(authProcedure);
        return this.httpClient.patch(`${this.authProcedureUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthProcedure(authNumber : number): Observable<any> {
        return this.httpClient.delete(`${this.authProcedureUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}