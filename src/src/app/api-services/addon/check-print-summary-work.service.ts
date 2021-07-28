/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CheckPrintSummaryWork} from "../../api-models/addon/check-print-summary-work.model";

@Injectable({
    providedIn: "root"
})
export class CheckPrintSummaryWorkService {

    private checkPrintSummaryWorkUrl: string = `${environment.apiUrl}/checkprintsummaryworks`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckPrintSummaryWorks(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CheckPrintSummaryWork[]> {
        var url = `${this.checkPrintSummaryWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintSummaryWork[]),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintSummaryWork(seqCkprtId: number): Observable<CheckPrintSummaryWork> {
        return this.httpClient.get(`${this.checkPrintSummaryWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckPrintSummaryWork),
                catchError(this.sharedService.handleError))
    }

    getCheckPrintSummaryWorksCount(): Observable<number> {
        var url = `${this.checkPrintSummaryWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCheckPrintSummaryWork(checkPrintSummaryWork: CheckPrintSummaryWork): Observable<any> {
        let body = JSON.stringify(checkPrintSummaryWork);
        return this.httpClient.post(this.checkPrintSummaryWorkUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCheckPrintSummaryWork(checkPrintSummaryWork: CheckPrintSummaryWork, seqCkprtId: number): Observable<any> {
        let body = JSON.stringify(checkPrintSummaryWork);
        return this.httpClient.put(`${this.checkPrintSummaryWorkUrl}/${seqCkprtId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckPrintSummaryWork(checkPrintSummaryWork: CheckPrintSummaryWork, seqCkprtId: number): Observable<any> {
        let body = JSON.stringify(checkPrintSummaryWork);
        return this.httpClient.patch(`${this.checkPrintSummaryWorkUrl}/${seqCkprtId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckPrintSummaryWork(seqCkprtId: number): Observable<any> {
        return this.httpClient.delete(`${this.checkPrintSummaryWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
