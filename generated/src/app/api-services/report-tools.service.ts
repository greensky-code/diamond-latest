/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReportTools } from '../api-models/report-tools.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ReportToolsService {

    private reportToolsUrl: string = `${environment.apiUrl}/reporttoolss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getReportToolss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ReportTools[]> {
        var url = `${this.reportToolsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ReportTools[]),
                catchError(this.sharedService.handleError))
    }

    getReportTools(toolName : string): Observable<ReportTools> {
        return this.httpClient.get(`${this.reportToolsUrl}/${toolName}`, {observe: 'response'})
            .pipe(map(response => response.body as ReportTools),
                catchError(this.sharedService.handleError))
    }

    getReportToolssCount(): Observable<number> {
        var url = `${this.reportToolsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createReportTools(reportTools : ReportTools): Observable<any> {
        let body = JSON.stringify(reportTools);
        return this.httpClient.post(this.reportToolsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateReportTools(reportTools : ReportTools, toolName : string): Observable<any> {
        let body = JSON.stringify(reportTools);
        return this.httpClient.put(`${this.reportToolsUrl}/${toolName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateReportTools(reportTools : ReportTools, toolName : string): Observable<any> {
        let body = JSON.stringify(reportTools);
        return this.httpClient.patch(`${this.reportToolsUrl}/${toolName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteReportTools(toolName : string): Observable<any> {
        return this.httpClient.delete(`${this.reportToolsUrl}/${toolName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}