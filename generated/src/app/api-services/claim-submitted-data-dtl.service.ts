/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimSubmittedDataDtl } from '../api-models/claim-submitted-data-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimSubmittedDataDtlService {

    private claimSubmittedDataDtlUrl: string = `${environment.apiUrl}/claimsubmitteddatadtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimSubmittedDataDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimSubmittedDataDtl[]> {
        var url = `${this.claimSubmittedDataDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimSubmittedDataDtl[]),
                catchError(this.sharedService.handleError))
    }

    getClaimSubmittedDataDtl(seqClaimId : number): Observable<ClaimSubmittedDataDtl> {
        return this.httpClient.get(`${this.claimSubmittedDataDtlUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimSubmittedDataDtl),
                catchError(this.sharedService.handleError))
    }

    getClaimSubmittedDataDtlsCount(): Observable<number> {
        var url = `${this.claimSubmittedDataDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimSubmittedDataDtl(claimSubmittedDataDtl : ClaimSubmittedDataDtl): Observable<any> {
        let body = JSON.stringify(claimSubmittedDataDtl);
        return this.httpClient.post(this.claimSubmittedDataDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimSubmittedDataDtl(claimSubmittedDataDtl : ClaimSubmittedDataDtl, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimSubmittedDataDtl);
        return this.httpClient.put(`${this.claimSubmittedDataDtlUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimSubmittedDataDtl(claimSubmittedDataDtl : ClaimSubmittedDataDtl, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimSubmittedDataDtl);
        return this.httpClient.patch(`${this.claimSubmittedDataDtlUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimSubmittedDataDtl(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimSubmittedDataDtlUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}