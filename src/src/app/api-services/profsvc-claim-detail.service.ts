/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimDetail } from '../api-models/profsvc-claim-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ProfsvcClaimDetailService {

    private profsvcClaimDetailUrl: string = `${environment.apiUrl}/profsvcclaimdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProfsvcClaimDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProfsvcClaimDetail[]> {
        var url = `${this.profsvcClaimDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetail[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetail(subLineCode : string): Observable<ProfsvcClaimDetail> {
        return this.httpClient.get(`${this.profsvcClaimDetailUrl}/${subLineCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetail),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailBySeqClaimId(seqClaimId : number): Observable<ProfsvcClaimDetail[]> {
        return this.httpClient.get(`${this.profsvcClaimDetailUrl}/find-claim-details-by-SeqClaimId/${seqClaimId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProfsvcClaimDetail[]),
                catchError(this.sharedService.handleError))
    }

    getProfsvcClaimDetailsCount(): Observable<number> {
        var url = `${this.profsvcClaimDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProfsvcClaimDetail(profsvcClaimDetail : ProfsvcClaimDetail): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetail);
        return this.httpClient.post(this.profsvcClaimDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProfsvcClaimDetail(profsvcClaimDetail : ProfsvcClaimDetail, subLineCode : string): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetail);
        return this.httpClient.put(`${this.profsvcClaimDetailUrl}/${subLineCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProfsvcClaimDetail(profsvcClaimDetail : ProfsvcClaimDetail, subLineCode : string): Observable<any> {
        let body = JSON.stringify(profsvcClaimDetail);
        return this.httpClient.patch(`${this.profsvcClaimDetailUrl}/${subLineCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProfsvcClaimDetail(subLineCode : string): Observable<any> {
        return this.httpClient.delete(`${this.profsvcClaimDetailUrl}/${subLineCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}