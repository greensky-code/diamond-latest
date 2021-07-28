/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimAuditFilter } from '../api-models/claim-audit-filter.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimAuditFilterService {

    private claimAuditFilterUrl: string = `${environment.apiUrl}/claimauditfilters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimAuditFilters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimAuditFilter[]> {
        var url = `${this.claimAuditFilterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditFilter[]),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditFilter(lineOfBusiness : string): Observable<ClaimAuditFilter> {
        return this.httpClient.get(`${this.claimAuditFilterUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditFilter),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditFiltersCount(): Observable<number> {
        var url = `${this.claimAuditFilterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimAuditFilter(claimAuditFilter : ClaimAuditFilter): Observable<any> {
        let body = JSON.stringify(claimAuditFilter);
        return this.httpClient.post(this.claimAuditFilterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimAuditFilter(claimAuditFilter : ClaimAuditFilter, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(claimAuditFilter);
        return this.httpClient.put(`${this.claimAuditFilterUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimAuditFilter(claimAuditFilter : ClaimAuditFilter, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(claimAuditFilter);
        return this.httpClient.patch(`${this.claimAuditFilterUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimAuditFilter(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.claimAuditFilterUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}