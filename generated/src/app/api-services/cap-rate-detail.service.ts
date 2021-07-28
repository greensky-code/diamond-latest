/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapRateDetail } from '../api-models/cap-rate-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapRateDetailService {

    private capRateDetailUrl: string = `${environment.apiUrl}/capratedetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapRateDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapRateDetail[]> {
        var url = `${this.capRateDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapRateDetail[]),
                catchError(this.sharedService.handleError))
    }

    getCapRateDetail(seqCapRateHdr : number): Observable<CapRateDetail> {
        return this.httpClient.get(`${this.capRateDetailUrl}/${seqCapRateHdr}`, {observe: 'response'})
            .pipe(map(response => response.body as CapRateDetail),
                catchError(this.sharedService.handleError))
    }

    getCapRateDetailsCount(): Observable<number> {
        var url = `${this.capRateDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqCapRateHdr(seqCapRateHdr : number): Observable<CapRateDetail[]> {
        return this.httpClient.get(`${this.capRateDetailUrl}/find-by-seqcapratehdr/${seqCapRateHdr}`, {observe: 'response'})
            .pipe(map(response => response.body as CapRateDetail),
                catchError(this.sharedService.handleError))
    }




    createCapRateDetail(capRateDetail : CapRateDetail): Observable<any> {
        let body = JSON.stringify(capRateDetail);
        return this.httpClient.post(this.capRateDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapRateDetail(capRateDetail : CapRateDetail, seqCapRateHdr : number): Observable<any> {
        let body = JSON.stringify(capRateDetail);
        return this.httpClient.put(`${this.capRateDetailUrl}/${seqCapRateHdr}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapRateDetail(capRateDetail : CapRateDetail, seqCapRateHdr : number): Observable<any> {
        let body = JSON.stringify(capRateDetail);
        return this.httpClient.patch(`${this.capRateDetailUrl}/${seqCapRateHdr}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapRateDetail(seqCapRateHdr : number): Observable<any> {
        return this.httpClient.delete(`${this.capRateDetailUrl}/${seqCapRateHdr}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}