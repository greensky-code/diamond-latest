/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BillTypeMaster } from '../api-models/bill-type-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BillTypeMasterService {

    private billTypeMasterUrl: string = `${environment.apiUrl}/billtypemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBillTypeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BillTypeMaster[]> {
        var url = `${this.billTypeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BillTypeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getBillTypeMaster(billType : string): Observable<BillTypeMaster> {
        return this.httpClient.get(`${this.billTypeMasterUrl}/${billType}`, {observe: 'response'})
            .pipe(map(response => response.body as BillTypeMaster),
                catchError(this.sharedService.handleError))
    }

    getBillTypeMastersCount(): Observable<number> {
        var url = `${this.billTypeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByPlaceOfService(placeOfService : string): Observable<BillTypeMaster[]> {
        return this.httpClient.get(`${this.billTypeMasterUrl}/find-by-placeofservice/${placeOfService}`, {observe: 'response'})
            .pipe(map(response => response.body as BillTypeMaster),
                catchError(this.sharedService.handleError))
    }




    createBillTypeMaster(billTypeMaster : BillTypeMaster): Observable<any> {
        let body = JSON.stringify(billTypeMaster);
        return this.httpClient.post(this.billTypeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBillTypeMaster(billTypeMaster : BillTypeMaster, billType : string): Observable<any> {
        let body = JSON.stringify(billTypeMaster);
        return this.httpClient.put(`${this.billTypeMasterUrl}/${billType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBillTypeMaster(billTypeMaster : BillTypeMaster, billType : string): Observable<any> {
        let body = JSON.stringify(billTypeMaster);
        return this.httpClient.patch(`${this.billTypeMasterUrl}/${billType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBillTypeMaster(billType : string): Observable<any> {
        return this.httpClient.delete(`${this.billTypeMasterUrl}/${billType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}