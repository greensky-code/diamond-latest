/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapCptdtRptWrk } from '../api-models/cap-cptdt-rpt-wrk.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapCptdtRptWrkService {

    private capCptdtRptWrkUrl: string = `${environment.apiUrl}/capcptdtrptwrks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapCptdtRptWrks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapCptdtRptWrk[]> {
        var url = `${this.capCptdtRptWrkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapCptdtRptWrk[]),
                catchError(this.sharedService.handleError))
    }

    getCapCptdtRptWrk(seqCapCptdtRptWrk : number): Observable<CapCptdtRptWrk> {
        return this.httpClient.get(`${this.capCptdtRptWrkUrl}/${seqCapCptdtRptWrk}`, {observe: 'response'})
            .pipe(map(response => response.body as CapCptdtRptWrk),
                catchError(this.sharedService.handleError))
    }

    getCapCptdtRptWrksCount(): Observable<number> {
        var url = `${this.capCptdtRptWrkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapCptdtRptWrk(capCptdtRptWrk : CapCptdtRptWrk): Observable<any> {
        let body = JSON.stringify(capCptdtRptWrk);
        return this.httpClient.post(this.capCptdtRptWrkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapCptdtRptWrk(capCptdtRptWrk : CapCptdtRptWrk, seqCapCptdtRptWrk : number): Observable<any> {
        let body = JSON.stringify(capCptdtRptWrk);
        return this.httpClient.put(`${this.capCptdtRptWrkUrl}/${seqCapCptdtRptWrk}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapCptdtRptWrk(capCptdtRptWrk : CapCptdtRptWrk, seqCapCptdtRptWrk : number): Observable<any> {
        let body = JSON.stringify(capCptdtRptWrk);
        return this.httpClient.patch(`${this.capCptdtRptWrkUrl}/${seqCapCptdtRptWrk}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapCptdtRptWrk(seqCapCptdtRptWrk : number): Observable<any> {
        return this.httpClient.delete(`${this.capCptdtRptWrkUrl}/${seqCapCptdtRptWrk}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}