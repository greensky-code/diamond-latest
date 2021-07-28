/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimSubmittedDataHdr } from '../api-models/claim-submitted-data-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimSubmittedDataHdrService {

    private claimSubmittedDataHdrUrl: string = `${environment.apiUrl}/claimsubmitteddatahdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimSubmittedDataHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimSubmittedDataHdr[]> {
        var url = `${this.claimSubmittedDataHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimSubmittedDataHdr[]),
                catchError(this.sharedService.handleError))
    }

    getClaimSubmittedDataHdr(seqClaimId : number): Observable<ClaimSubmittedDataHdr> {
        return this.httpClient.get(`${this.claimSubmittedDataHdrUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimSubmittedDataHdr),
                catchError(this.sharedService.handleError))
    }

    getClaimSubmittedDataHdrsCount(): Observable<number> {
        var url = `${this.claimSubmittedDataHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimSubmittedDataHdr(claimSubmittedDataHdr : ClaimSubmittedDataHdr): Observable<any> {
        let body = JSON.stringify(claimSubmittedDataHdr);
        return this.httpClient.post(this.claimSubmittedDataHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimSubmittedDataHdr(claimSubmittedDataHdr : ClaimSubmittedDataHdr, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimSubmittedDataHdr);
        return this.httpClient.put(`${this.claimSubmittedDataHdrUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimSubmittedDataHdr(claimSubmittedDataHdr : ClaimSubmittedDataHdr, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimSubmittedDataHdr);
        return this.httpClient.patch(`${this.claimSubmittedDataHdrUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimSubmittedDataHdr(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimSubmittedDataHdrUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}