/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapCalcSetup } from '../api-models/cap-calc-setup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapCalcSetupService {

    private capCalcSetupUrl: string = `${environment.apiUrl}/capcalcsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapCalcSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapCalcSetup[]> {
        var url = `${this.capCalcSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapCalcSetup[]),
                catchError(this.sharedService.handleError))
    }

    getCapCalcSetup(seqCcalcId : number): Observable<CapCalcSetup> {
        return this.httpClient.get(`${this.capCalcSetupUrl}/${seqCcalcId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapCalcSetup),
                catchError(this.sharedService.handleError))
    }

    getCapCalcSetupsCount(): Observable<number> {
        var url = `${this.capCalcSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapCalcSetup(capCalcSetup : CapCalcSetup): Observable<any> {
        let body = JSON.stringify(capCalcSetup);
        return this.httpClient.post(this.capCalcSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapCalcSetup(capCalcSetup : CapCalcSetup, seqCcalcId : number): Observable<any> {
        let body = JSON.stringify(capCalcSetup);
        return this.httpClient.put(`${this.capCalcSetupUrl}/${seqCcalcId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapCalcSetup(capCalcSetup : CapCalcSetup, seqCcalcId : number): Observable<any> {
        let body = JSON.stringify(capCalcSetup);
        return this.httpClient.patch(`${this.capCalcSetupUrl}/${seqCcalcId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapCalcSetup(seqCcalcId : number): Observable<any> {
        return this.httpClient.delete(`${this.capCalcSetupUrl}/${seqCcalcId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}