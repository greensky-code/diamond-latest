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
import {SharedService} from '../../shared/services/shared.service';
import {environment} from '../../../environments/environment';
import {AuthAppeal} from '../../api-models/authorization/auth-appeal.model';

@Injectable()
export class AuthAppealService {

    private authAppealUrl = `${environment.apiUrl}/authappeals`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthAppeals(usePagination= false, page = 0, size = 0): Observable<AuthAppeal[]> {
        let url = `${this.authAppealUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthAppeal[]),
                catchError(this.sharedService.handleError))
    }

    getAuthAppeal(authNumber: number): Observable<AuthAppeal[]> {
        return this.httpClient.get(`${this.authAppealUrl}/find-by-authNo/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthAppeal[]),
                catchError(this.sharedService.handleError))
    }

    getAuthAppealsCount(): Observable<number> {
        let url = `${this.authAppealUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvId(seqProvId: number): Observable<AuthAppeal[]> {
        return this.httpClient.get(`${this.authAppealUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthAppeal),
                catchError(this.sharedService.handleError))
    }
    findByAdvisorDecision(advisorDecision: string): Observable<AuthAppeal[]> {
        return this.httpClient.get(`${this.authAppealUrl}/find-by-advisordecision/${advisorDecision}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthAppeal),
                catchError(this.sharedService.handleError))
    }

    createAuthAppeal(authAppeal: AuthAppeal): Observable<any> {
        let body = JSON.stringify(authAppeal);
        return this.httpClient.post(this.authAppealUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthAppeal(authAppeal: AuthAppeal, authNumber: number, seqAuthAppeal: number, secondaryAuthNo: string): Observable<any> {
        let body = JSON.stringify(authAppeal);
        return this.httpClient.put(`${this.authAppealUrl}/${seqAuthAppeal}/${secondaryAuthNo}/${authNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthAppeal(authAppeal: AuthAppeal, authNumber: number): Observable<any> {
        let body = JSON.stringify(authAppeal);
        return this.httpClient.patch(`${this.authAppealUrl}/${authNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthAppeal(authNumber: number): Observable<any> {
        return this.httpClient.delete(`${this.authAppealUrl}/${authNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
