/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimAuditResultDetail } from '../api-models/claim-audit-result-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimAuditResultDetailService {

    private claimAuditResultDetailUrl: string = `${environment.apiUrl}/claimauditresultdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimAuditResultDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimAuditResultDetail[]> {
        var url = `${this.claimAuditResultDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditResultDetail[]),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditResultDetail(claimResultCode : string): Observable<ClaimAuditResultDetail> {
        return this.httpClient.get(`${this.claimAuditResultDetailUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditResultDetail),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditResultDetailsCount(): Observable<number> {
        var url = `${this.claimAuditResultDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByClaimResultCode(claimResultCode : string): Observable<ClaimAuditResultDetail[]> {
        return this.httpClient.get(`${this.claimAuditResultDetailUrl}/find-by-claimresultcode/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditResultDetail),
                catchError(this.sharedService.handleError))
    }




    createClaimAuditResultDetail(claimAuditResultDetail : ClaimAuditResultDetail): Observable<any> {
        let body = JSON.stringify(claimAuditResultDetail);
        return this.httpClient.post(this.claimAuditResultDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimAuditResultDetail(claimAuditResultDetail : ClaimAuditResultDetail, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(claimAuditResultDetail);
        return this.httpClient.put(`${this.claimAuditResultDetailUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimAuditResultDetail(claimAuditResultDetail : ClaimAuditResultDetail, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(claimAuditResultDetail);
        return this.httpClient.patch(`${this.claimAuditResultDetailUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimAuditResultDetail(claimResultCode : string): Observable<any> {
        return this.httpClient.delete(`${this.claimAuditResultDetailUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}