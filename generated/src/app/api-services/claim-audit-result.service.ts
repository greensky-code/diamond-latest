/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimAuditResult } from '../api-models/claim-audit-result.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimAuditResultService {

    private claimAuditResultUrl: string = `${environment.apiUrl}/claimauditresults`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimAuditResults(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimAuditResult[]> {
        var url = `${this.claimAuditResultUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditResult[]),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditResult(claimResultCode : string): Observable<ClaimAuditResult> {
        return this.httpClient.get(`${this.claimAuditResultUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditResult),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditResultsCount(): Observable<number> {
        var url = `${this.claimAuditResultUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimAuditResult(claimAuditResult : ClaimAuditResult): Observable<any> {
        let body = JSON.stringify(claimAuditResult);
        return this.httpClient.post(this.claimAuditResultUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimAuditResult(claimAuditResult : ClaimAuditResult, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(claimAuditResult);
        return this.httpClient.put(`${this.claimAuditResultUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimAuditResult(claimAuditResult : ClaimAuditResult, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(claimAuditResult);
        return this.httpClient.patch(`${this.claimAuditResultUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimAuditResult(claimResultCode : string): Observable<any> {
        return this.httpClient.delete(`${this.claimAuditResultUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}