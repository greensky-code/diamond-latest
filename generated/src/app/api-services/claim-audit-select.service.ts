/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimAuditSelect } from '../api-models/claim-audit-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimAuditSelectService {

    private claimAuditSelectUrl: string = `${environment.apiUrl}/claimauditselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimAuditSelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimAuditSelect[]> {
        var url = `${this.claimAuditSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditSelect[]),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditSelect(lineOfBusiness : string): Observable<ClaimAuditSelect> {
        return this.httpClient.get(`${this.claimAuditSelectUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimAuditSelect),
                catchError(this.sharedService.handleError))
    }

    getClaimAuditSelectsCount(): Observable<number> {
        var url = `${this.claimAuditSelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimAuditSelect(claimAuditSelect : ClaimAuditSelect): Observable<any> {
        let body = JSON.stringify(claimAuditSelect);
        return this.httpClient.post(this.claimAuditSelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimAuditSelect(claimAuditSelect : ClaimAuditSelect, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(claimAuditSelect);
        return this.httpClient.put(`${this.claimAuditSelectUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimAuditSelect(claimAuditSelect : ClaimAuditSelect, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(claimAuditSelect);
        return this.httpClient.patch(`${this.claimAuditSelectUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimAuditSelect(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.claimAuditSelectUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}