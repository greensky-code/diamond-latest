/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AptaxCalcResults } from '../api-models/aptax-calc-results.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AptaxCalcResultsService {

    private aptaxCalcResultsUrl: string = `${environment.apiUrl}/aptaxcalcresultss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAptaxCalcResultss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AptaxCalcResults[]> {
        var url = `${this.aptaxCalcResultsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AptaxCalcResults[]),
                catchError(this.sharedService.handleError))
    }

    getAptaxCalcResults(seqAptaxId : number): Observable<AptaxCalcResults> {
        return this.httpClient.get(`${this.aptaxCalcResultsUrl}/${seqAptaxId}`, {observe: 'response'})
            .pipe(map(response => response.body as AptaxCalcResults),
                catchError(this.sharedService.handleError))
    }

    getAptaxCalcResultssCount(): Observable<number> {
        var url = `${this.aptaxCalcResultsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAptaxCalcResults(aptaxCalcResults : AptaxCalcResults): Observable<any> {
        let body = JSON.stringify(aptaxCalcResults);
        return this.httpClient.post(this.aptaxCalcResultsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAptaxCalcResults(aptaxCalcResults : AptaxCalcResults, seqAptaxId : number): Observable<any> {
        let body = JSON.stringify(aptaxCalcResults);
        return this.httpClient.put(`${this.aptaxCalcResultsUrl}/${seqAptaxId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAptaxCalcResults(aptaxCalcResults : AptaxCalcResults, seqAptaxId : number): Observable<any> {
        let body = JSON.stringify(aptaxCalcResults);
        return this.httpClient.patch(`${this.aptaxCalcResultsUrl}/${seqAptaxId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAptaxCalcResults(seqAptaxId : number): Observable<any> {
        return this.httpClient.delete(`${this.aptaxCalcResultsUrl}/${seqAptaxId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}