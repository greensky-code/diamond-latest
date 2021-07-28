/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CustservCode } from '../api-models/custserv-code.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CustservCodeService {

    private custservCodeUrl: string = `${environment.apiUrl}/custservcodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCustservCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CustservCode[]> {
        var url = `${this.custservCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CustservCode[]),
                catchError(this.sharedService.handleError))
    }

    getCustservCode(csCode : string): Observable<CustservCode> {
        return this.httpClient.get(`${this.custservCodeUrl}/${csCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CustservCode),
                catchError(this.sharedService.handleError))
    }

    getCustservCodesCount(): Observable<number> {
        var url = `${this.custservCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCustservCode(custservCode : CustservCode): Observable<any> {
        let body = JSON.stringify(custservCode);
        return this.httpClient.post(this.custservCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCustservCode(custservCode : CustservCode, csCode : string): Observable<any> {
        let body = JSON.stringify(custservCode);
        return this.httpClient.put(`${this.custservCodeUrl}/${csCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCustservCode(custservCode : CustservCode, csCode : string): Observable<any> {
        let body = JSON.stringify(custservCode);
        return this.httpClient.patch(`${this.custservCodeUrl}/${csCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCustservCode(csCode : string): Observable<any> {
        return this.httpClient.delete(`${this.custservCodeUrl}/${csCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}