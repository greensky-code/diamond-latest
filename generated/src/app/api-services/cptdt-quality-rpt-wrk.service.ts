/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CptdtQualityRptWrk } from '../api-models/cptdt-quality-rpt-wrk.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CptdtQualityRptWrkService {

    private cptdtQualityRptWrkUrl: string = `${environment.apiUrl}/cptdtqualityrptwrks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCptdtQualityRptWrks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CptdtQualityRptWrk[]> {
        var url = `${this.cptdtQualityRptWrkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CptdtQualityRptWrk[]),
                catchError(this.sharedService.handleError))
    }

    getCptdtQualityRptWrk(seqCapCptdtQltyWrk : number): Observable<CptdtQualityRptWrk> {
        return this.httpClient.get(`${this.cptdtQualityRptWrkUrl}/${seqCapCptdtQltyWrk}`, {observe: 'response'})
            .pipe(map(response => response.body as CptdtQualityRptWrk),
                catchError(this.sharedService.handleError))
    }

    getCptdtQualityRptWrksCount(): Observable<number> {
        var url = `${this.cptdtQualityRptWrkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCptdtQualityRptWrk(cptdtQualityRptWrk : CptdtQualityRptWrk): Observable<any> {
        let body = JSON.stringify(cptdtQualityRptWrk);
        return this.httpClient.post(this.cptdtQualityRptWrkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCptdtQualityRptWrk(cptdtQualityRptWrk : CptdtQualityRptWrk, seqCapCptdtQltyWrk : number): Observable<any> {
        let body = JSON.stringify(cptdtQualityRptWrk);
        return this.httpClient.put(`${this.cptdtQualityRptWrkUrl}/${seqCapCptdtQltyWrk}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCptdtQualityRptWrk(cptdtQualityRptWrk : CptdtQualityRptWrk, seqCapCptdtQltyWrk : number): Observable<any> {
        let body = JSON.stringify(cptdtQualityRptWrk);
        return this.httpClient.patch(`${this.cptdtQualityRptWrkUrl}/${seqCapCptdtQltyWrk}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCptdtQualityRptWrk(seqCapCptdtQltyWrk : number): Observable<any> {
        return this.httpClient.delete(`${this.cptdtQualityRptWrkUrl}/${seqCapCptdtQltyWrk}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}