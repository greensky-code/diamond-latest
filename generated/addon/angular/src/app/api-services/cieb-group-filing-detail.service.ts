/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebGroupFilingDetail } from '../api-models/cieb-group-filing-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebGroupFilingDetailService {

    private ciebGroupFilingDetailUrl: string = `${environment.apiUrl}/ciebgroupfilingdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebGroupFilingDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebGroupFilingDetail[]> {
        var url = `${this.ciebGroupFilingDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebGroupFilingDetail[]),
                catchError(this.sharedService.handleError))
    }

    getCiebGroupFilingDetail(seqGrpfilingId : number): Observable<CiebGroupFilingDetail> {
        return this.httpClient.get(`${this.ciebGroupFilingDetailUrl}/${seqGrpfilingId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebGroupFilingDetail),
                catchError(this.sharedService.handleError))
    }

    getCiebGroupFilingDetailsCount(): Observable<number> {
        var url = `${this.ciebGroupFilingDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebGroupFilingDetail(ciebGroupFilingDetail : CiebGroupFilingDetail): Observable<any> {
        let body = JSON.stringify(ciebGroupFilingDetail);
        return this.httpClient.post(this.ciebGroupFilingDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebGroupFilingDetail(ciebGroupFilingDetail : CiebGroupFilingDetail, seqGrpfilingId : number): Observable<any> {
        let body = JSON.stringify(ciebGroupFilingDetail);
        return this.httpClient.put(`${this.ciebGroupFilingDetailUrl}/${seqGrpfilingId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebGroupFilingDetail(ciebGroupFilingDetail : CiebGroupFilingDetail, seqGrpfilingId : number): Observable<any> {
        let body = JSON.stringify(ciebGroupFilingDetail);
        return this.httpClient.patch(`${this.ciebGroupFilingDetailUrl}/${seqGrpfilingId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebGroupFilingDetail(seqGrpfilingId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebGroupFilingDetailUrl}/${seqGrpfilingId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}