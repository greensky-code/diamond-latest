/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReportSpecification } from '../api-models/report-specification.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ReportSpecificationService {

    private reportSpecificationUrl: string = `${environment.apiUrl}/reportspecifications`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getReportSpecifications(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ReportSpecification[]> {
        var url = `${this.reportSpecificationUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ReportSpecification[]),
                catchError(this.sharedService.handleError))
    }

    getReportSpecification(reportCode : string): Observable<ReportSpecification> {
        return this.httpClient.get(`${this.reportSpecificationUrl}/${reportCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ReportSpecification),
                catchError(this.sharedService.handleError))
    }

    getReportSpecificationsCount(): Observable<number> {
        var url = `${this.reportSpecificationUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createReportSpecification(reportSpecification : ReportSpecification): Observable<any> {
        let body = JSON.stringify(reportSpecification);
        return this.httpClient.post(this.reportSpecificationUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateReportSpecification(reportSpecification : ReportSpecification, reportCode : string): Observable<any> {
        let body = JSON.stringify(reportSpecification);
        return this.httpClient.put(`${this.reportSpecificationUrl}/${reportCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateReportSpecification(reportSpecification : ReportSpecification, reportCode : string): Observable<any> {
        let body = JSON.stringify(reportSpecification);
        return this.httpClient.patch(`${this.reportSpecificationUrl}/${reportCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteReportSpecification(reportCode : string): Observable<any> {
        return this.httpClient.delete(`${this.reportSpecificationUrl}/${reportCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}