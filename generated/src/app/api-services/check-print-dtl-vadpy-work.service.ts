/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckPrintDtlVadpyWork } from '../api-models/check-print-dtl-vadpy-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CheckPrintDtlVadpyWorkService {

    private checkPrintDtlVadpyWorkUrl: string = `${environment.apiUrl}/checkprintdtlvadpyworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckPrintDtlVadpyWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckPrintDtlVadpyWork[]> {
        var url = `${this.checkPrintDtlVadpyWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintDtlVadpyWork[]),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintDtlVadpyWork(seqCkprtId : number): Observable<CheckPrintDtlVadpyWork> {
        return this.httpClient.get(`${this.checkPrintDtlVadpyWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintDtlVadpyWork),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintDtlVadpyWorksCount(): Observable<number> {
        var url = `${this.checkPrintDtlVadpyWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCheckPrintDtlVadpyWork(checkPrintDtlVadpyWork : CheckPrintDtlVadpyWork): Observable<any> {
        let body = JSON.stringify(checkPrintDtlVadpyWork);
        return this.httpClient.post(this.checkPrintDtlVadpyWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckPrintDtlVadpyWork(checkPrintDtlVadpyWork : CheckPrintDtlVadpyWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(checkPrintDtlVadpyWork);
        return this.httpClient.put(`${this.checkPrintDtlVadpyWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckPrintDtlVadpyWork(checkPrintDtlVadpyWork : CheckPrintDtlVadpyWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(checkPrintDtlVadpyWork);
        return this.httpClient.patch(`${this.checkPrintDtlVadpyWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckPrintDtlVadpyWork(seqCkprtId : number): Observable<any> {
        return this.httpClient.delete(`${this.checkPrintDtlVadpyWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}