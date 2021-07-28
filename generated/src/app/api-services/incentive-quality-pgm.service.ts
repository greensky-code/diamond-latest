/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IncentiveQualityPgm } from '../api-models/incentive-quality-pgm.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IncentiveQualityPgmService {

    private incentiveQualityPgmUrl: string = `${environment.apiUrl}/incentivequalitypgms`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIncentiveQualityPgms(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<IncentiveQualityPgm[]> {
        var url = `${this.incentiveQualityPgmUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IncentiveQualityPgm[]),
                catchError(this.sharedService.handleError))
    }

    getIncentiveQualityPgm(seqQualityPgm : number): Observable<IncentiveQualityPgm> {
        return this.httpClient.get(`${this.incentiveQualityPgmUrl}/${seqQualityPgm}`, {observe: 'response'})
            .pipe(map(response => response.body as IncentiveQualityPgm),
                catchError(this.sharedService.handleError))
    }

    getIncentiveQualityPgmsCount(): Observable<number> {
        var url = `${this.incentiveQualityPgmUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqIncentiveRule(seqIncentiveRule : number): Observable<IncentiveQualityPgm[]> {
        return this.httpClient.get(`${this.incentiveQualityPgmUrl}/find-by-seqincentiverule/${seqIncentiveRule}`, {observe: 'response'})
            .pipe(map(response => response.body as IncentiveQualityPgm),
                catchError(this.sharedService.handleError))
    }




    createIncentiveQualityPgm(incentiveQualityPgm : IncentiveQualityPgm): Observable<any> {
        let body = JSON.stringify(incentiveQualityPgm);
        return this.httpClient.post(this.incentiveQualityPgmUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateIncentiveQualityPgm(incentiveQualityPgm : IncentiveQualityPgm, seqQualityPgm : number): Observable<any> {
        let body = JSON.stringify(incentiveQualityPgm);
        return this.httpClient.put(`${this.incentiveQualityPgmUrl}/${seqQualityPgm}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateIncentiveQualityPgm(incentiveQualityPgm : IncentiveQualityPgm, seqQualityPgm : number): Observable<any> {
        let body = JSON.stringify(incentiveQualityPgm);
        return this.httpClient.patch(`${this.incentiveQualityPgmUrl}/${seqQualityPgm}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteIncentiveQualityPgm(seqQualityPgm : number): Observable<any> {
        return this.httpClient.delete(`${this.incentiveQualityPgmUrl}/${seqQualityPgm}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}