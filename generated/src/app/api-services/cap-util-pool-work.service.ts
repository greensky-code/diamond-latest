/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapUtilPoolWork } from '../api-models/cap-util-pool-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapUtilPoolWorkService {

    private capUtilPoolWorkUrl: string = `${environment.apiUrl}/caputilpoolworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapUtilPoolWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapUtilPoolWork[]> {
        var url = `${this.capUtilPoolWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapUtilPoolWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapUtilPoolWork(seqCcalcId : number): Observable<CapUtilPoolWork> {
        return this.httpClient.get(`${this.capUtilPoolWorkUrl}/${seqCcalcId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapUtilPoolWork),
                catchError(this.sharedService.handleError))
    }

    getCapUtilPoolWorksCount(): Observable<number> {
        var url = `${this.capUtilPoolWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapUtilPoolWork(capUtilPoolWork : CapUtilPoolWork): Observable<any> {
        let body = JSON.stringify(capUtilPoolWork);
        return this.httpClient.post(this.capUtilPoolWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapUtilPoolWork(capUtilPoolWork : CapUtilPoolWork, seqCcalcId : number): Observable<any> {
        let body = JSON.stringify(capUtilPoolWork);
        return this.httpClient.put(`${this.capUtilPoolWorkUrl}/${seqCcalcId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapUtilPoolWork(capUtilPoolWork : CapUtilPoolWork, seqCcalcId : number): Observable<any> {
        let body = JSON.stringify(capUtilPoolWork);
        return this.httpClient.patch(`${this.capUtilPoolWorkUrl}/${seqCcalcId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapUtilPoolWork(seqCcalcId : number): Observable<any> {
        return this.httpClient.delete(`${this.capUtilPoolWorkUrl}/${seqCcalcId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}