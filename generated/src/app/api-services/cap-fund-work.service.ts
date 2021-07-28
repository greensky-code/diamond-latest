/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFundWork } from '../api-models/cap-fund-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapFundWorkService {

    private capFundWorkUrl: string = `${environment.apiUrl}/capfundworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapFundWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapFundWork[]> {
        var url = `${this.capFundWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapFundWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapFundWork(seqCfdstId : number): Observable<CapFundWork> {
        return this.httpClient.get(`${this.capFundWorkUrl}/${seqCfdstId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundWork),
                catchError(this.sharedService.handleError))
    }

    getCapFundWorksCount(): Observable<number> {
        var url = `${this.capFundWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCapFundModelId(capFundModelId : string): Observable<CapFundWork[]> {
        return this.httpClient.get(`${this.capFundWorkUrl}/find-by-capfundmodelid/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundWork),
                catchError(this.sharedService.handleError))
    }




    createCapFundWork(capFundWork : CapFundWork): Observable<any> {
        let body = JSON.stringify(capFundWork);
        return this.httpClient.post(this.capFundWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapFundWork(capFundWork : CapFundWork, seqCfdstId : number): Observable<any> {
        let body = JSON.stringify(capFundWork);
        return this.httpClient.put(`${this.capFundWorkUrl}/${seqCfdstId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapFundWork(capFundWork : CapFundWork, seqCfdstId : number): Observable<any> {
        let body = JSON.stringify(capFundWork);
        return this.httpClient.patch(`${this.capFundWorkUrl}/${seqCfdstId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapFundWork(seqCfdstId : number): Observable<any> {
        return this.httpClient.delete(`${this.capFundWorkUrl}/${seqCfdstId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}