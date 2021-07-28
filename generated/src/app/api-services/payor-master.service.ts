/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PayorMaster } from '../api-models/payor-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PayorMasterService {

    private payorMasterUrl: string = `${environment.apiUrl}/payormasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPayorMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PayorMaster[]> {
        var url = `${this.payorMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PayorMaster[]),
                catchError(this.sharedService.handleError))
    }

    getPayorMaster(payorCode : string): Observable<PayorMaster> {
        return this.httpClient.get(`${this.payorMasterUrl}/${payorCode}`, {observe: 'response'})
            .pipe(map(response => response.body as PayorMaster),
                catchError(this.sharedService.handleError))
    }

    getPayorMastersCount(): Observable<number> {
        var url = `${this.payorMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPayorMaster(payorMaster : PayorMaster): Observable<any> {
        let body = JSON.stringify(payorMaster);
        return this.httpClient.post(this.payorMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePayorMaster(payorMaster : PayorMaster, payorCode : string): Observable<any> {
        let body = JSON.stringify(payorMaster);
        return this.httpClient.put(`${this.payorMasterUrl}/${payorCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePayorMaster(payorMaster : PayorMaster, payorCode : string): Observable<any> {
        let body = JSON.stringify(payorMaster);
        return this.httpClient.patch(`${this.payorMasterUrl}/${payorCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePayorMaster(payorCode : string): Observable<any> {
        return this.httpClient.delete(`${this.payorMasterUrl}/${payorCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}