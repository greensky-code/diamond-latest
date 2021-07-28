/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimDetailNdc } from '../api-models/claim-detail-ndc.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimDetailNdcService {

    private claimDetailNdcUrl: string = `${environment.apiUrl}/claimdetailndcs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimDetailNdcs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimDetailNdc[]> {
        var url = `${this.claimDetailNdcUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimDetailNdc[]),
                catchError(this.sharedService.handleError))
    }

    getClaimDetailNdc(seqClaimId : number): Observable<ClaimDetailNdc> {
        return this.httpClient.get(`${this.claimDetailNdcUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimDetailNdc),
                catchError(this.sharedService.handleError))
    }

    getClaimDetailNdcsCount(): Observable<number> {
        var url = `${this.claimDetailNdcUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByNdcCode(ndcCode : string): Observable<ClaimDetailNdc[]> {
        return this.httpClient.get(`${this.claimDetailNdcUrl}/find-by-ndccode/${ndcCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimDetailNdc),
                catchError(this.sharedService.handleError))
    }




    createClaimDetailNdc(claimDetailNdc : ClaimDetailNdc): Observable<any> {
        let body = JSON.stringify(claimDetailNdc);
        return this.httpClient.post(this.claimDetailNdcUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimDetailNdc(claimDetailNdc : ClaimDetailNdc, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimDetailNdc);
        return this.httpClient.put(`${this.claimDetailNdcUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimDetailNdc(claimDetailNdc : ClaimDetailNdc, seqClaimId : number): Observable<any> {
        let body = JSON.stringify(claimDetailNdc);
        return this.httpClient.patch(`${this.claimDetailNdcUrl}/${seqClaimId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimDetailNdc(seqClaimId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimDetailNdcUrl}/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}