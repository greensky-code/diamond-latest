/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CodereviewAuditDetails } from '../api-models/codereview-audit-details.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CodereviewAuditDetailsService {

    private codereviewAuditDetailsUrl: string = `${environment.apiUrl}/codereviewauditdetailss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCodereviewAuditDetailss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CodereviewAuditDetails[]> {
        var url = `${this.codereviewAuditDetailsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewAuditDetails[]),
                catchError(this.sharedService.handleError))
    }

    getCodereviewAuditDetails(claimNumber : string): Observable<CodereviewAuditDetails> {
        return this.httpClient.get(`${this.codereviewAuditDetailsUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as CodereviewAuditDetails),
                catchError(this.sharedService.handleError))
    }

    getCodereviewAuditDetailssCount(): Observable<number> {
        var url = `${this.codereviewAuditDetailsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCodereviewAuditDetails(codereviewAuditDetails : CodereviewAuditDetails): Observable<any> {
        let body = JSON.stringify(codereviewAuditDetails);
        return this.httpClient.post(this.codereviewAuditDetailsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCodereviewAuditDetails(codereviewAuditDetails : CodereviewAuditDetails, claimNumber : string): Observable<any> {
        let body = JSON.stringify(codereviewAuditDetails);
        return this.httpClient.put(`${this.codereviewAuditDetailsUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCodereviewAuditDetails(codereviewAuditDetails : CodereviewAuditDetails, claimNumber : string): Observable<any> {
        let body = JSON.stringify(codereviewAuditDetails);
        return this.httpClient.patch(`${this.codereviewAuditDetailsUrl}/${claimNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCodereviewAuditDetails(claimNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.codereviewAuditDetailsUrl}/${claimNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}