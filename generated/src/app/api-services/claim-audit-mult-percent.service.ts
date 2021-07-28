/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimAuditMultPercent } from '../api-models/claim-audit-mult-percent.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimAuditMultPercentService {

    private claimAuditMultPercentUrl: string = `${environment.apiUrl}/claimauditmultpercents`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimAuditMultPercents(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimAuditMultPercent[]> {
        var url = `${this.claimAuditMultPercentUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditMultPercent[]),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditMultPercent(claimResultCode : string): Observable<ClaimAuditMultPercent> {
        return this.httpClient.get(`${this.claimAuditMultPercentUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditMultPercent),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditMultPercentsCount(): Observable<number> {
        var url = `${this.claimAuditMultPercentUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByClaimResultCode(claimResultCode : string): Observable<ClaimAuditMultPercent[]> {
        return this.httpClient.get(`${this.claimAuditMultPercentUrl}/find-by-claimresultcode/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditMultPercent),
                catchError(this.sharedService.handleError))
    }




    createClaimAuditMultPercent(claimAuditMultPercent : ClaimAuditMultPercent): Observable<any> {
        let body = JSON.stringify(claimAuditMultPercent);
        return this.httpClient.post(this.claimAuditMultPercentUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimAuditMultPercent(claimAuditMultPercent : ClaimAuditMultPercent, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(claimAuditMultPercent);
        return this.httpClient.put(`${this.claimAuditMultPercentUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimAuditMultPercent(claimAuditMultPercent : ClaimAuditMultPercent, claimResultCode : string): Observable<any> {
        let body = JSON.stringify(claimAuditMultPercent);
        return this.httpClient.patch(`${this.claimAuditMultPercentUrl}/${claimResultCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimAuditMultPercent(claimResultCode : string): Observable<any> {
        return this.httpClient.delete(`${this.claimAuditMultPercentUrl}/${claimResultCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}