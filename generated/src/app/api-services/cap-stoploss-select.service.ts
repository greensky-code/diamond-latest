/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapStoplossSelect } from '../api-models/cap-stoploss-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapStoplossSelectService {

    private capStoplossSelectUrl: string = `${environment.apiUrl}/capstoplossselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapStoplossSelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapStoplossSelect[]> {
        var url = `${this.capStoplossSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapStoplossSelect[]),
                catchError(this.sharedService.handleError))
    }

    getCapStoplossSelect(capModelId : string): Observable<CapStoplossSelect> {
        return this.httpClient.get(`${this.capStoplossSelectUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapStoplossSelect),
                catchError(this.sharedService.handleError))
    }

    getCapStoplossSelectsCount(): Observable<number> {
        var url = `${this.capStoplossSelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapStoplossSelect(capStoplossSelect : CapStoplossSelect): Observable<any> {
        let body = JSON.stringify(capStoplossSelect);
        return this.httpClient.post(this.capStoplossSelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapStoplossSelect(capStoplossSelect : CapStoplossSelect, capModelId : string): Observable<any> {
        let body = JSON.stringify(capStoplossSelect);
        return this.httpClient.put(`${this.capStoplossSelectUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapStoplossSelect(capStoplossSelect : CapStoplossSelect, capModelId : string): Observable<any> {
        let body = JSON.stringify(capStoplossSelect);
        return this.httpClient.patch(`${this.capStoplossSelectUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapStoplossSelect(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capStoplossSelectUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}