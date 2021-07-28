/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReportDefinition } from '../api-models/report-definition.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ReportDefinitionService {

    private reportDefinitionUrl: string = `${environment.apiUrl}/reportdefinitions`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getReportDefinitions(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ReportDefinition[]> {
        var url = `${this.reportDefinitionUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ReportDefinition[]),
                catchError(this.sharedService.handleError))
    }

    getReportDefinition(keywordName : string): Observable<ReportDefinition> {
        return this.httpClient.get(`${this.reportDefinitionUrl}/${keywordName}`, {observe: 'response'})
            .pipe(map(response => response.body as ReportDefinition),
                catchError(this.sharedService.handleError))
    }

    getReportDefinitionsCount(): Observable<number> {
        var url = `${this.reportDefinitionUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createReportDefinition(reportDefinition : ReportDefinition): Observable<any> {
        let body = JSON.stringify(reportDefinition);
        return this.httpClient.post(this.reportDefinitionUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateReportDefinition(reportDefinition : ReportDefinition, keywordName : string): Observable<any> {
        let body = JSON.stringify(reportDefinition);
        return this.httpClient.put(`${this.reportDefinitionUrl}/${keywordName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateReportDefinition(reportDefinition : ReportDefinition, keywordName : string): Observable<any> {
        let body = JSON.stringify(reportDefinition);
        return this.httpClient.patch(`${this.reportDefinitionUrl}/${keywordName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteReportDefinition(keywordName : string): Observable<any> {
        return this.httpClient.delete(`${this.reportDefinitionUrl}/${keywordName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}