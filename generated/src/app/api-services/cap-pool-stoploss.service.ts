/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapPoolStoploss } from '../api-models/cap-pool-stoploss.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapPoolStoplossService {

    private capPoolStoplossUrl: string = `${environment.apiUrl}/cappoolstoplosses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapPoolStoplosses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapPoolStoploss[]> {
        var url = `${this.capPoolStoplossUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapPoolStoploss[]),
                catchError(this.sharedService.handleError))
    }

    getCapPoolStoploss(capModelId : string): Observable<CapPoolStoploss> {
        return this.httpClient.get(`${this.capPoolStoplossUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPoolStoploss),
                catchError(this.sharedService.handleError))
    }

    getCapPoolStoplossesCount(): Observable<number> {
        var url = `${this.capPoolStoplossUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCompanyCodeStop(companyCodeStop : string): Observable<CapPoolStoploss[]> {
        return this.httpClient.get(`${this.capPoolStoplossUrl}/find-by-companycodestop/${companyCodeStop}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPoolStoploss),
                catchError(this.sharedService.handleError))
    }




    createCapPoolStoploss(capPoolStoploss : CapPoolStoploss): Observable<any> {
        let body = JSON.stringify(capPoolStoploss);
        return this.httpClient.post(this.capPoolStoplossUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapPoolStoploss(capPoolStoploss : CapPoolStoploss, capModelId : string): Observable<any> {
        let body = JSON.stringify(capPoolStoploss);
        return this.httpClient.put(`${this.capPoolStoplossUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapPoolStoploss(capPoolStoploss : CapPoolStoploss, capModelId : string): Observable<any> {
        let body = JSON.stringify(capPoolStoploss);
        return this.httpClient.patch(`${this.capPoolStoplossUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapPoolStoploss(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capPoolStoplossUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}