/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapEntityWork } from '../api-models/cap-entity-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapEntityWorkService {

    private capEntityWorkUrl: string = `${environment.apiUrl}/capentityworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapEntityWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapEntityWork[]> {
        var url = `${this.capEntityWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapEntityWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapEntityWork(seqCapEntityWork : number): Observable<CapEntityWork> {
        return this.httpClient.get(`${this.capEntityWorkUrl}/${seqCapEntityWork}`, {observe: 'response'})
            .pipe(map(response => response.body as CapEntityWork),
                catchError(this.sharedService.handleError))
    }

    getCapEntityWorksCount(): Observable<number> {
        var url = `${this.capEntityWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapEntityWork(capEntityWork : CapEntityWork): Observable<any> {
        let body = JSON.stringify(capEntityWork);
        return this.httpClient.post(this.capEntityWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapEntityWork(capEntityWork : CapEntityWork, seqCapEntityWork : number): Observable<any> {
        let body = JSON.stringify(capEntityWork);
        return this.httpClient.put(`${this.capEntityWorkUrl}/${seqCapEntityWork}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapEntityWork(capEntityWork : CapEntityWork, seqCapEntityWork : number): Observable<any> {
        let body = JSON.stringify(capEntityWork);
        return this.httpClient.patch(`${this.capEntityWorkUrl}/${seqCapEntityWork}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapEntityWork(seqCapEntityWork : number): Observable<any> {
        return this.httpClient.delete(`${this.capEntityWorkUrl}/${seqCapEntityWork}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}