/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapStoploss } from '../api-models/cap-stoploss.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapStoplossService {

    private capStoplossUrl: string = `${environment.apiUrl}/capstoplosses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapStoplosses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapStoploss[]> {
        var url = `${this.capStoplossUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapStoploss[]),
                catchError(this.sharedService.handleError))
    }

    getCapStoploss(capModelId : string): Observable<CapStoploss> {
        return this.httpClient.get(`${this.capStoplossUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapStoploss),
                catchError(this.sharedService.handleError))
    }

    getCapStoplossesCount(): Observable<number> {
        var url = `${this.capStoplossUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapStoploss(capStoploss : CapStoploss): Observable<any> {
        let body = JSON.stringify(capStoploss);
        return this.httpClient.post(this.capStoplossUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapStoploss(capStoploss : CapStoploss, capModelId : string): Observable<any> {
        let body = JSON.stringify(capStoploss);
        return this.httpClient.put(`${this.capStoplossUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapStoploss(capStoploss : CapStoploss, capModelId : string): Observable<any> {
        let body = JSON.stringify(capStoploss);
        return this.httpClient.patch(`${this.capStoplossUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapStoploss(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capStoplossUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}