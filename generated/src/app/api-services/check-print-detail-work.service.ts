/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckPrintDetailWork } from '../api-models/check-print-detail-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CheckPrintDetailWorkService {

    private checkPrintDetailWorkUrl: string = `${environment.apiUrl}/checkprintdetailworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckPrintDetailWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckPrintDetailWork[]> {
        var url = `${this.checkPrintDetailWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintDetailWork[]),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintDetailWork(seqCkprtId : number): Observable<CheckPrintDetailWork> {
        return this.httpClient.get(`${this.checkPrintDetailWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintDetailWork),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintDetailWorksCount(): Observable<number> {
        var url = `${this.checkPrintDetailWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCheckPrintDetailWork(checkPrintDetailWork : CheckPrintDetailWork): Observable<any> {
        let body = JSON.stringify(checkPrintDetailWork);
        return this.httpClient.post(this.checkPrintDetailWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckPrintDetailWork(checkPrintDetailWork : CheckPrintDetailWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(checkPrintDetailWork);
        return this.httpClient.put(`${this.checkPrintDetailWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckPrintDetailWork(checkPrintDetailWork : CheckPrintDetailWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(checkPrintDetailWork);
        return this.httpClient.patch(`${this.checkPrintDetailWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckPrintDetailWork(seqCkprtId : number): Observable<any> {
        return this.httpClient.delete(`${this.checkPrintDetailWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}