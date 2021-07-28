/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapEligWork } from '../api-models/cap-elig-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapEligWorkService {

    private capEligWorkUrl: string = `${environment.apiUrl}/capeligworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapEligWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapEligWork[]> {
        var url = `${this.capEligWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapEligWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapEligWork(seqCapEligWork : number): Observable<CapEligWork> {
        return this.httpClient.get(`${this.capEligWorkUrl}/${seqCapEligWork}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEligWork),
                catchError(this.sharedService.handleError))
    }

    getCapEligWorksCount(): Observable<number> {
        var url = `${this.capEligWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapEligWork(capEligWork : CapEligWork): Observable<any> {
        let body = JSON.stringify(capEligWork);
        return this.httpClient.post(this.capEligWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapEligWork(capEligWork : CapEligWork, seqCapEligWork : number): Observable<any> {
        let body = JSON.stringify(capEligWork);
        return this.httpClient.put(`${this.capEligWorkUrl}/${seqCapEligWork}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapEligWork(capEligWork : CapEligWork, seqCapEligWork : number): Observable<any> {
        let body = JSON.stringify(capEligWork);
        return this.httpClient.patch(`${this.capEligWorkUrl}/${seqCapEligWork}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapEligWork(seqCapEligWork : number): Observable<any> {
        return this.httpClient.delete(`${this.capEligWorkUrl}/${seqCapEligWork}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}