/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapReportWork } from '../api-models/cap-report-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapReportWorkService {

    private capReportWorkUrl: string = `${environment.apiUrl}/capreportworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapReportWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapReportWork[]> {
        var url = `${this.capReportWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapReportWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapReportWork(seqCapRptWork : number): Observable<CapReportWork> {
        return this.httpClient.get(`${this.capReportWorkUrl}/${seqCapRptWork}`, {observe: 'response'})
            .pipe(map(response => response.body as CapReportWork),
                catchError(this.sharedService.handleError))
    }

    getCapReportWorksCount(): Observable<number> {
        var url = `${this.capReportWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapReportWork(capReportWork : CapReportWork): Observable<any> {
        let body = JSON.stringify(capReportWork);
        return this.httpClient.post(this.capReportWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapReportWork(capReportWork : CapReportWork, seqCapRptWork : number): Observable<any> {
        let body = JSON.stringify(capReportWork);
        return this.httpClient.put(`${this.capReportWorkUrl}/${seqCapRptWork}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapReportWork(capReportWork : CapReportWork, seqCapRptWork : number): Observable<any> {
        let body = JSON.stringify(capReportWork);
        return this.httpClient.patch(`${this.capReportWorkUrl}/${seqCapRptWork}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapReportWork(seqCapRptWork : number): Observable<any> {
        return this.httpClient.delete(`${this.capReportWorkUrl}/${seqCapRptWork}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}