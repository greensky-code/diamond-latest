/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapReportSetup } from '../api-models/cap-report-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapReportSetupService {

    private capReportSetupUrl: string = `${environment.apiUrl}/capreportsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapReportSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapReportSetup[]> {
        var url = `${this.capReportSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapReportSetup[]),
                catchError(this.sharedService.handleError))
    }

    getCapReportSetup(seqCprptId : number): Observable<CapReportSetup> {
        return this.httpClient.get(`${this.capReportSetupUrl}/${seqCprptId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapReportSetup),
                catchError(this.sharedService.handleError))
    }

    getCapReportSetupsCount(): Observable<number> {
        var url = `${this.capReportSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapReportSetup(capReportSetup : CapReportSetup): Observable<any> {
        let body = JSON.stringify(capReportSetup);
        return this.httpClient.post(this.capReportSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapReportSetup(capReportSetup : CapReportSetup, seqCprptId : number): Observable<any> {
        let body = JSON.stringify(capReportSetup);
        return this.httpClient.put(`${this.capReportSetupUrl}/${seqCprptId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapReportSetup(capReportSetup : CapReportSetup, seqCprptId : number): Observable<any> {
        let body = JSON.stringify(capReportSetup);
        return this.httpClient.patch(`${this.capReportSetupUrl}/${seqCprptId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapReportSetup(seqCprptId : number): Observable<any> {
        return this.httpClient.delete(`${this.capReportSetupUrl}/${seqCprptId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}