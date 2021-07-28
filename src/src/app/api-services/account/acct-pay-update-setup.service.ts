/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CONFIG } from '../../core/config';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { AcctPayUpdateSetup } from '../../api-models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcctPayUpdateSetupService {

    private acctPayUpdateSetupUrl: string = `${environment.apiUrl}/acctpayupdatesetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAcctPayUpdateSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AcctPayUpdateSetup[]> {
        var url = `${this.acctPayUpdateSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AcctPayUpdateSetup[]),
                catchError(this.sharedService.handleError))
    }

    getActiveAcctPayUpdateSetups(): Observable<AcctPayUpdateSetup[]> {
        var url = `${this.acctPayUpdateSetupUrl}/find-active`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AcctPayUpdateSetup[]),
                catchError(this.sharedService.handleError))
    }
    
    getAcctPayUpdateSetup(seqApupdId : number): Observable<AcctPayUpdateSetup> {
        return this.httpClient.get(`${this.acctPayUpdateSetupUrl}/${seqApupdId}`, {observe: 'response'})
            .pipe(map(response => response.body as AcctPayUpdateSetup),
                catchError(this.sharedService.handleError))
    }

    getAcctPayUpdateSetupsCount(): Observable<number> {
        var url = `${this.acctPayUpdateSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAcctPayUpdateSetup(acctPayUpdateSetup : AcctPayUpdateSetup): Observable<any> {
        let body = JSON.stringify(acctPayUpdateSetup);
        return this.httpClient.post(this.acctPayUpdateSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAcctPayUpdateSetup(acctPayUpdateSetup : AcctPayUpdateSetup, seqApupdId : number): Observable<any> {
        let body = JSON.stringify(acctPayUpdateSetup);
        return this.httpClient.put(`${this.acctPayUpdateSetupUrl}/${seqApupdId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAcctPayUpdateSetup(acctPayUpdateSetup : AcctPayUpdateSetup, seqApupdId : number): Observable<any> {
        let body = JSON.stringify(acctPayUpdateSetup);
        return this.httpClient.patch(`${this.acctPayUpdateSetupUrl}/${seqApupdId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAcctPayUpdateSetup(seqApupdId : number): Observable<any> {
        return this.httpClient.delete(`${this.acctPayUpdateSetupUrl}/${seqApupdId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}