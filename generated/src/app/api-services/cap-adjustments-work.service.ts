/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapAdjustmentsWork } from '../api-models/cap-adjustments-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapAdjustmentsWorkService {

    private capAdjustmentsWorkUrl: string = `${environment.apiUrl}/capadjustmentsworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapAdjustmentsWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapAdjustmentsWork[]> {
        var url = `${this.capAdjustmentsWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapAdjustmentsWork[]),
                catchError(this.sharedService.handleError))
    }

    getCapAdjustmentsWork(seqCapAdjustmentWork : number): Observable<CapAdjustmentsWork> {
        return this.httpClient.get(`${this.capAdjustmentsWorkUrl}/${seqCapAdjustmentWork}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAdjustmentsWork),
                catchError(this.sharedService.handleError))
    }

    getCapAdjustmentsWorksCount(): Observable<number> {
        var url = `${this.capAdjustmentsWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapAdjustmentsWork(capAdjustmentsWork : CapAdjustmentsWork): Observable<any> {
        let body = JSON.stringify(capAdjustmentsWork);
        return this.httpClient.post(this.capAdjustmentsWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapAdjustmentsWork(capAdjustmentsWork : CapAdjustmentsWork, seqCapAdjustmentWork : number): Observable<any> {
        let body = JSON.stringify(capAdjustmentsWork);
        return this.httpClient.put(`${this.capAdjustmentsWorkUrl}/${seqCapAdjustmentWork}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapAdjustmentsWork(capAdjustmentsWork : CapAdjustmentsWork, seqCapAdjustmentWork : number): Observable<any> {
        let body = JSON.stringify(capAdjustmentsWork);
        return this.httpClient.patch(`${this.capAdjustmentsWorkUrl}/${seqCapAdjustmentWork}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapAdjustmentsWork(seqCapAdjustmentWork : number): Observable<any> {
        return this.httpClient.delete(`${this.capAdjustmentsWorkUrl}/${seqCapAdjustmentWork}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}