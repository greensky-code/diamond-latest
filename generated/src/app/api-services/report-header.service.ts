/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReportHeader } from '../api-models/report-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ReportHeaderService {

    private reportHeaderUrl: string = `${environment.apiUrl}/reportheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getReportHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ReportHeader[]> {
        var url = `${this.reportHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ReportHeader[]),
                catchError(this.sharedService.handleError))
    }

    getReportHeader(seqJobId : number): Observable<ReportHeader> {
        return this.httpClient.get(`${this.reportHeaderUrl}/${seqJobId}`, {observe: 'response'})
            .pipe(map(response => response.body as ReportHeader),
                catchError(this.sharedService.handleError))
    }

    getReportHeadersCount(): Observable<number> {
        var url = `${this.reportHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByKeywordName(keywordName : string): Observable<ReportHeader[]> {
        return this.httpClient.get(`${this.reportHeaderUrl}/find-by-keywordname/${keywordName}`, {observe: 'response'})
            .pipe(map(response => response.body as ReportHeader),
                catchError(this.sharedService.handleError))
    }




    createReportHeader(reportHeader : ReportHeader): Observable<any> {
        let body = JSON.stringify(reportHeader);
        return this.httpClient.post(this.reportHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateReportHeader(reportHeader : ReportHeader, seqJobId : number): Observable<any> {
        let body = JSON.stringify(reportHeader);
        return this.httpClient.put(`${this.reportHeaderUrl}/${seqJobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateReportHeader(reportHeader : ReportHeader, seqJobId : number): Observable<any> {
        let body = JSON.stringify(reportHeader);
        return this.httpClient.patch(`${this.reportHeaderUrl}/${seqJobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteReportHeader(seqJobId : number): Observable<any> {
        return this.httpClient.delete(`${this.reportHeaderUrl}/${seqJobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}