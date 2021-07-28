/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbArCustomerMaster } from '../api-models/pmb-ar-customer-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbArCustomerMasterService {

    private pmbArCustomerMasterUrl: string = `${environment.apiUrl}/pmbarcustomermasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbArCustomerMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbArCustomerMaster[]> {
        var url = `${this.pmbArCustomerMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustomerMaster[]),
                catchError(
                     this.sharedService.handleError
                 ))
    }

    getBillTypeMasters(): Observable<PmbArCustomerMaster[]> {
        var url = `${this.pmbArCustomerMasterUrl}/billtypes`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustomerMaster[]),
                catchError(
                     this.sharedService.handleError
                 ))
    }

    getBillTypeMastersByCustomer(): Observable<PmbArCustomerMaster[]> {
        var url = `${this.pmbArCustomerMasterUrl}/billtypesByCustomer`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustomerMaster[]),
                catchError(
                     this.sharedService.handleError
                 ))
    }

    getPmbArCustomerMaster(customerId : string, customerType : string): Observable<PmbArCustomerMaster> {
        return this.httpClient.get(`${this.pmbArCustomerMasterUrl}/${customerId}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbArCustomerMaster),
                catchError( 
                     this.sharedService.handleError
                 ))
    }

    getPmbArCustomerMastersCount(): Observable<number> {
        var url = `${this.pmbArCustomerMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(
                     this.sharedService.handleError
                 ))
    }


    createPmbArCustomerMaster(pmbArCustomerMaster : PmbArCustomerMaster): Observable<any> {
        let body = JSON.stringify(pmbArCustomerMaster);
        return this.httpClient.post(this.pmbArCustomerMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(
                     this.sharedService.handleError
                 ))
    }

    updatePmbArCustomerMaster(pmbArCustomerMaster : PmbArCustomerMaster, customerType : string,customerId : string): Observable<any> {
        let body = JSON.stringify(pmbArCustomerMaster);
        return this.httpClient.put(`${this.pmbArCustomerMasterUrl}/${customerId}/${customerType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(
                      this.sharedService.handleError
                 ))
    }

    partiallyUpdatePmbArCustomerMaster(pmbArCustomerMaster : PmbArCustomerMaster, customerType : string): Observable<any> {
        let body = JSON.stringify(pmbArCustomerMaster);
        return this.httpClient.patch(`${this.pmbArCustomerMasterUrl}/${customerType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePmbArCustomerMaster(customerType : string): Observable<any> {
        return this.httpClient.delete(`${this.pmbArCustomerMasterUrl}/${customerType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
