/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/services/shared.service';
import { CovProvGroupDetail } from '../../api-models/provider/cov-prov-group-detail.model';

@Injectable({
    providedIn: 'root'
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCovProvGroupDetail(seqCovProvGrp : number): Observable<CovProvGroupDetail> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCovProvGroupDetailsCount(): Observable<number> {
        var url = `${this.covProvGroupDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    findBySeqDfltVendId(seqDfltVendId : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqdfltvendid/${seqDfltVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqCovProvGrp(seqCovProvGrp : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqcovprovgrp/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqProvId(seqProvId : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByTermReasn(termReasn : string): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-termreasn/${termReasn}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqDfltVendAddress(seqDfltVendAddress : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqdfltvendaddress/${seqDfltVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createCovProvGroupDetail(covProvGroupDetail : CovProvGroupDetail): Observable<any> {
        let body = JSON.stringify(covProvGroupDetail);
        return this.httpClient.post(this.covProvGroupDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCovProvGroupDetail(covProvGroupDetail : CovProvGroupDetail, seqCovProvGrp : number): Observable<any> {
        let body = JSON.stringify(covProvGroupDetail);
        return this.httpClient.put(`${this.covProvGroupDetailUrl}/${covProvGroupDetail.covProvGroupDetailPrimaryKey.seqProvId}/${seqCovProvGrp}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCovProvGroupDetail(covProvGroupDetail : CovProvGroupDetail, seqCovProvGrp : number): Observable<any> {
        let body = JSON.stringify(covProvGroupDetail);
        return this.httpClient.patch(`${this.covProvGroupDetailUrl}/${seqCovProvGrp}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCovProvGroupDetail(seqCovProvGrp : number): Observable<any> {
        return this.httpClient.delete(`${this.covProvGroupDetailUrl}/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }



    findBySeqCovProvidervGrp(seqCovProvGrp : number): Observable<CovProvGroupDetail[]> {
        return this.httpClient.get(`${this.covProvGroupDetailUrl}/find-by-seqcovprovidergrp/${seqCovProvGrp}`, {observe: 'response'})
            .pipe(map(response => response.body as CovProvGroupDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


}
