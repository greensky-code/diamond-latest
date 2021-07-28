/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FinalNonApRptWork } from '../api-models/final-non-ap-rpt-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class FinalNonApRptWorkService {

    private finalNonApRptWorkUrl: string = `${environment.apiUrl}/finalnonaprptworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getFinalNonApRptWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<FinalNonApRptWork[]> {
        var url = `${this.finalNonApRptWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as FinalNonApRptWork[]),
                catchError(this.sharedService.handleError))
    }

    getFinalNonApRptWork(seqFinalId : number): Observable<FinalNonApRptWork> {
        return this.httpClient.get(`${this.finalNonApRptWorkUrl}/${seqFinalId}`, {observe: 'response'})
            .pipe(map(response => response.body as FinalNonApRptWork),
                catchError(this.sharedService.handleError))
    }

    getFinalNonApRptWorksCount(): Observable<number> {
        var url = `${this.finalNonApRptWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createFinalNonApRptWork(finalNonApRptWork : FinalNonApRptWork): Observable<any> {
        let body = JSON.stringify(finalNonApRptWork);
        return this.httpClient.post(this.finalNonApRptWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateFinalNonApRptWork(finalNonApRptWork : FinalNonApRptWork, seqFinalId : number): Observable<any> {
        let body = JSON.stringify(finalNonApRptWork);
        return this.httpClient.put(`${this.finalNonApRptWorkUrl}/${seqFinalId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateFinalNonApRptWork(finalNonApRptWork : FinalNonApRptWork, seqFinalId : number): Observable<any> {
        let body = JSON.stringify(finalNonApRptWork);
        return this.httpClient.patch(`${this.finalNonApRptWorkUrl}/${seqFinalId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteFinalNonApRptWork(seqFinalId : number): Observable<any> {
        return this.httpClient.delete(`${this.finalNonApRptWorkUrl}/${seqFinalId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}