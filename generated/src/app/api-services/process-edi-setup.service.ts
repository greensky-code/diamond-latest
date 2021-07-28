/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcessEdiSetup } from '../api-models/process-edi-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProcessEdiSetupService {

    private processEdiSetupUrl: string = `${environment.apiUrl}/processedisetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProcessEdiSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProcessEdiSetup[]> {
        var url = `${this.processEdiSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProcessEdiSetup[]),
                catchError(this.sharedService.handleError))
    }

    getProcessEdiSetup(seqPrediId : number): Observable<ProcessEdiSetup> {
        return this.httpClient.get(`${this.processEdiSetupUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcessEdiSetup),
                catchError(this.sharedService.handleError))
    }

    getProcessEdiSetupsCount(): Observable<number> {
        var url = `${this.processEdiSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createProcessEdiSetup(processEdiSetup : ProcessEdiSetup): Observable<any> {
        let body = JSON.stringify(processEdiSetup);
        return this.httpClient.post(this.processEdiSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProcessEdiSetup(processEdiSetup : ProcessEdiSetup, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(processEdiSetup);
        return this.httpClient.put(`${this.processEdiSetupUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProcessEdiSetup(processEdiSetup : ProcessEdiSetup, seqPrediId : number): Observable<any> {
        let body = JSON.stringify(processEdiSetup);
        return this.httpClient.patch(`${this.processEdiSetupUrl}/${seqPrediId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProcessEdiSetup(seqPrediId : number): Observable<any> {
        return this.httpClient.delete(`${this.processEdiSetupUrl}/${seqPrediId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}