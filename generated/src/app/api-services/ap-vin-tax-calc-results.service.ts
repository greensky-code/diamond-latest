/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ApVinTaxCalcResults } from '../api-models/ap-vin-tax-calc-results.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApVinTaxCalcResultsService {

    private apVinTaxCalcResultsUrl: string = `${environment.apiUrl}/apvintaxcalcresultss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getApVinTaxCalcResultss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ApVinTaxCalcResults[]> {
        var url = `${this.apVinTaxCalcResultsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ApVinTaxCalcResults[]),
                catchError(this.sharedService.handleError))
    }

    getApVinTaxCalcResults(seqAptaxId : number): Observable<ApVinTaxCalcResults> {
        return this.httpClient.get(`${this.apVinTaxCalcResultsUrl}/${seqAptaxId}`, {observe: 'response'})
            .pipe(map(response => response.body as ApVinTaxCalcResults),
                catchError(this.sharedService.handleError))
    }

    getApVinTaxCalcResultssCount(): Observable<number> {
        var url = `${this.apVinTaxCalcResultsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createApVinTaxCalcResults(apVinTaxCalcResults : ApVinTaxCalcResults): Observable<any> {
        let body = JSON.stringify(apVinTaxCalcResults);
        return this.httpClient.post(this.apVinTaxCalcResultsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateApVinTaxCalcResults(apVinTaxCalcResults : ApVinTaxCalcResults, seqAptaxId : number): Observable<any> {
        let body = JSON.stringify(apVinTaxCalcResults);
        return this.httpClient.put(`${this.apVinTaxCalcResultsUrl}/${seqAptaxId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateApVinTaxCalcResults(apVinTaxCalcResults : ApVinTaxCalcResults, seqAptaxId : number): Observable<any> {
        let body = JSON.stringify(apVinTaxCalcResults);
        return this.httpClient.patch(`${this.apVinTaxCalcResultsUrl}/${seqAptaxId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteApVinTaxCalcResults(seqAptaxId : number): Observable<any> {
        return this.httpClient.delete(`${this.apVinTaxCalcResultsUrl}/${seqAptaxId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}