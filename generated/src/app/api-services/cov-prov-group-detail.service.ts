/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CovProvGroupDetail } from '../api-models/cov-prov-group-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CovProvGroupDetailService {

    private covProvGroupDetailUrl: string = `${environment.apiUrl}/covprovgroupdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCovProvGroupDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CovProvGroupDetail[]> {
        var url = `${this.covProvGroupDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail[]),
                catchError(this.sharedService.handleError))
    }

    getCovProvGroupDetail(seqCovProvGrp : number): Observable<CovProvGroupDetail> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError(this.sharedService.handleError))
    }

    getCovProvGroupDetailsCount(): Observable<number> {
        var url = `${this.covProvGroupDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqDfltVendAddress(seqDfltVendAddress : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqdfltvendaddress/${seqDfltVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqDfltVendId(seqDfltVendId : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqdfltvendid/${seqDfltVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqCovProvGrp(seqCovProvGrp : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqcovprovgrp/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqProvId(seqProvId : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError(this.sharedService.handleError))
    }
    findByTermReasn(termReasn : string): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-termreasn/${termReasn}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError(this.sharedService.handleError))
    }
    findBySeqDfltVendAddress(seqDfltVendAddress : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqdfltvendaddress/${seqDfltVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError(this.sharedService.handleError))
    }




    createCovProvGroupDetail(covProvGroupDetail : CovProvGroupDetail): Observable<any> {
        let body = JSON.stringify(covProvGroupDetail);
        return this.httpClient.post(this.covProvGroupDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCovProvGroupDetail(covProvGroupDetail : CovProvGroupDetail, seqCovProvGrp : number): Observable<any> {
        let body = JSON.stringify(covProvGroupDetail);
        return this.httpClient.put(`${this.covProvGroupDetailUrl}/${seqCovProvGrp}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCovProvGroupDetail(covProvGroupDetail : CovProvGroupDetail, seqCovProvGrp : number): Observable<any> {
        let body = JSON.stringify(covProvGroupDetail);
        return this.httpClient.patch(`${this.covProvGroupDetailUrl}/${seqCovProvGrp}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCovProvGroupDetail(seqCovProvGrp : number): Observable<any> {
        return this.httpClient.delete(`${this.covProvGroupDetailUrl}/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}