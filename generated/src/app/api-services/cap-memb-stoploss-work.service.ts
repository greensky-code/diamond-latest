/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapMembStoplossWork } from '../api-models/cap-memb-stoploss-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapMembStoplossWorkService {

    private capMembStoplossWorkUrl: string = `${environment.apiUrl}/capmembstoplossworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapMembStoplossWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapMembStoplossWork[]> {
        var url = `${this.capMembStoplossWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapMembStoplossWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapMembStoplossWork(seqCcalcId : number): Observable<CapMembStoplossWork> {
        return this.httpClient.get(`${this.capMembStoplossWorkUrl}/${seqCcalcId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapMembStoplossWork),
                catchError(this.sharedService.handleError))
    }

    getCapMembStoplossWorksCount(): Observable<number> {
        var url = `${this.capMembStoplossWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapMembStoplossWork(capMembStoplossWork : CapMembStoplossWork): Observable<any> {
        let body = JSON.stringify(capMembStoplossWork);
        return this.httpClient.post(this.capMembStoplossWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapMembStoplossWork(capMembStoplossWork : CapMembStoplossWork, seqCcalcId : number): Observable<any> {
        let body = JSON.stringify(capMembStoplossWork);
        return this.httpClient.put(`${this.capMembStoplossWorkUrl}/${seqCcalcId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapMembStoplossWork(capMembStoplossWork : CapMembStoplossWork, seqCcalcId : number): Observable<any> {
        let body = JSON.stringify(capMembStoplossWork);
        return this.httpClient.patch(`${this.capMembStoplossWorkUrl}/${seqCcalcId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapMembStoplossWork(seqCcalcId : number): Observable<any> {
        return this.httpClient.delete(`${this.capMembStoplossWorkUrl}/${seqCcalcId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}