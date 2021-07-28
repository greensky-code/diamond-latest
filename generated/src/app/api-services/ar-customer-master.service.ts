/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCustomerMaster } from '../api-models/ar-customer-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArCustomerMasterService {

    private arCustomerMasterUrl: string = `${environment.apiUrl}/arcustomermasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArCustomerMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ArCustomerMaster[]> {
        var url = `${this.arCustomerMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArCustomerMaster[]),
                catchError(this.sharedService.handleError))
    }

    getArCustomerMaster(customerType : string): Observable<ArCustomerMaster> {
        return this.httpClient.get(`${this.arCustomerMasterUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as ArCustomerMaster),
                catchError(this.sharedService.handleError))
    }

    getArCustomerMastersCount(): Observable<number> {
        var url = `${this.arCustomerMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createArCustomerMaster(arCustomerMaster : ArCustomerMaster): Observable<any> {
        let body = JSON.stringify(arCustomerMaster);
        return this.httpClient.post(this.arCustomerMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateArCustomerMaster(arCustomerMaster : ArCustomerMaster, customerType : string): Observable<any> {
        let body = JSON.stringify(arCustomerMaster);
        return this.httpClient.put(`${this.arCustomerMasterUrl}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateArCustomerMaster(arCustomerMaster : ArCustomerMaster, customerType : string): Observable<any> {
        let body = JSON.stringify(arCustomerMaster);
        return this.httpClient.patch(`${this.arCustomerMasterUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteArCustomerMaster(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.arCustomerMasterUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}