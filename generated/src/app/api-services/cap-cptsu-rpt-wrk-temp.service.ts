/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapCptsuRptWrkTemp } from '../api-models/cap-cptsu-rpt-wrk-temp.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapCptsuRptWrkTempService {

    private capCptsuRptWrkTempUrl: string = `${environment.apiUrl}/capcptsurptwrktemps`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapCptsuRptWrkTemps(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapCptsuRptWrkTemp[]> {
        var url = `${this.capCptsuRptWrkTempUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapCptsuRptWrkTemp[]),
                catchError(this.sharedService.handleError))
    }

    getCapCptsuRptWrkTemp(seqCapCptsuRptWrkTemp : number): Observable<CapCptsuRptWrkTemp> {
        return this.httpClient.get(`${this.capCptsuRptWrkTempUrl}/${seqCapCptsuRptWrkTemp}`, {observe: 'response'})
            .pipe(map(response => response.body as CapCptsuRptWrkTemp),
                catchError(this.sharedService.handleError))
    }

    getCapCptsuRptWrkTempsCount(): Observable<number> {
        var url = `${this.capCptsuRptWrkTempUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapCptsuRptWrkTemp(capCptsuRptWrkTemp : CapCptsuRptWrkTemp): Observable<any> {
        let body = JSON.stringify(capCptsuRptWrkTemp);
        return this.httpClient.post(this.capCptsuRptWrkTempUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapCptsuRptWrkTemp(capCptsuRptWrkTemp : CapCptsuRptWrkTemp, seqCapCptsuRptWrkTemp : number): Observable<any> {
        let body = JSON.stringify(capCptsuRptWrkTemp);
        return this.httpClient.put(`${this.capCptsuRptWrkTempUrl}/${seqCapCptsuRptWrkTemp}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapCptsuRptWrkTemp(capCptsuRptWrkTemp : CapCptsuRptWrkTemp, seqCapCptsuRptWrkTemp : number): Observable<any> {
        let body = JSON.stringify(capCptsuRptWrkTemp);
        return this.httpClient.patch(`${this.capCptsuRptWrkTempUrl}/${seqCapCptsuRptWrkTemp}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapCptsuRptWrkTemp(seqCapCptsuRptWrkTemp : number): Observable<any> {
        return this.httpClient.delete(`${this.capCptsuRptWrkTempUrl}/${seqCapCptsuRptWrkTemp}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}