/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapElgcntWork } from '../api-models/cap-elgcnt-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapElgcntWorkService {

    private capElgcntWorkUrl: string = `${environment.apiUrl}/capelgcntworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapElgcntWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapElgcntWork[]> {
        var url = `${this.capElgcntWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapElgcntWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapElgcntWork(seqCapElgcntWork : number): Observable<CapElgcntWork> {
        return this.httpClient.get(`${this.capElgcntWorkUrl}/${seqCapElgcntWork}`, {observe: 'response'})
            .pipe(map(response => response.body as CapElgcntWork),
                catchError(this.sharedService.handleError))
    }

    getCapElgcntWorksCount(): Observable<number> {
        var url = `${this.capElgcntWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapElgcntWork(capElgcntWork : CapElgcntWork): Observable<any> {
        let body = JSON.stringify(capElgcntWork);
        return this.httpClient.post(this.capElgcntWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapElgcntWork(capElgcntWork : CapElgcntWork, seqCapElgcntWork : number): Observable<any> {
        let body = JSON.stringify(capElgcntWork);
        return this.httpClient.put(`${this.capElgcntWorkUrl}/${seqCapElgcntWork}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapElgcntWork(capElgcntWork : CapElgcntWork, seqCapElgcntWork : number): Observable<any> {
        let body = JSON.stringify(capElgcntWork);
        return this.httpClient.patch(`${this.capElgcntWorkUrl}/${seqCapElgcntWork}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapElgcntWork(seqCapElgcntWork : number): Observable<any> {
        return this.httpClient.delete(`${this.capElgcntWorkUrl}/${seqCapElgcntWork}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}