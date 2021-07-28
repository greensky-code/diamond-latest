/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapPoolcalcWork } from '../api-models/cap-poolcalc-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapPoolcalcWorkService {

    private capPoolcalcWorkUrl: string = `${environment.apiUrl}/cappoolcalcworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapPoolcalcWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapPoolcalcWork[]> {
        var url = `${this.capPoolcalcWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapPoolcalcWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapPoolcalcWork(seqCapPoolcalcWork : number): Observable<CapPoolcalcWork> {
        return this.httpClient.get(`${this.capPoolcalcWorkUrl}/${seqCapPoolcalcWork}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPoolcalcWork),
                catchError(this.sharedService.handleError))
    }

    getCapPoolcalcWorksCount(): Observable<number> {
        var url = `${this.capPoolcalcWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqIncentiveRule(seqIncentiveRule : number): Observable<CapPoolcalcWork[]> {
        return this.httpClient.get(`${this.capPoolcalcWorkUrl}/find-by-seqincentiverule/${seqIncentiveRule}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPoolcalcWork),
                catchError(this.sharedService.handleError))
    }




    createCapPoolcalcWork(capPoolcalcWork : CapPoolcalcWork): Observable<any> {
        let body = JSON.stringify(capPoolcalcWork);
        return this.httpClient.post(this.capPoolcalcWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapPoolcalcWork(capPoolcalcWork : CapPoolcalcWork, seqCapPoolcalcWork : number): Observable<any> {
        let body = JSON.stringify(capPoolcalcWork);
        return this.httpClient.put(`${this.capPoolcalcWorkUrl}/${seqCapPoolcalcWork}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapPoolcalcWork(capPoolcalcWork : CapPoolcalcWork, seqCapPoolcalcWork : number): Observable<any> {
        let body = JSON.stringify(capPoolcalcWork);
        return this.httpClient.patch(`${this.capPoolcalcWorkUrl}/${seqCapPoolcalcWork}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapPoolcalcWork(seqCapPoolcalcWork : number): Observable<any> {
        return this.httpClient.delete(`${this.capPoolcalcWorkUrl}/${seqCapPoolcalcWork}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}