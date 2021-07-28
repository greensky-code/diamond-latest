/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebBankTermReasonCode } from '../../api-models/addon/cieb-bank-term-reason-code.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebBankTermReasonCodeService {

    private ciebBankTermReasonCodeUrl: string = `${environment.apiUrl}/ciebbanktermreasoncodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebBankTermReasonCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebBankTermReasonCode[]> {
        var url = `${this.ciebBankTermReasonCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebBankTermReasonCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebBankTermReasonCode(bankTermReasonCode : string): Observable<CiebBankTermReasonCode> {
        return this.httpClient.get(`${this.ciebBankTermReasonCodeUrl}/${bankTermReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebBankTermReasonCode),
                catchError(this.sharedService.handleError))
    }

    getCiebBankTermReasonCodesCount(): Observable<number> {
        var url = `${this.ciebBankTermReasonCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebBankTermReasonCode(ciebBankTermReasonCode : CiebBankTermReasonCode): Observable<any> {
        let body = JSON.stringify(ciebBankTermReasonCode);
        return this.httpClient.post(this.ciebBankTermReasonCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebBankTermReasonCode(ciebBankTermReasonCode : CiebBankTermReasonCode, bankTermReasonCode : string): Observable<any> {
        let body = JSON.stringify(ciebBankTermReasonCode);
        return this.httpClient.put(`${this.ciebBankTermReasonCodeUrl}/${bankTermReasonCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebBankTermReasonCode(ciebBankTermReasonCode : CiebBankTermReasonCode, bankTermReasonCode : string): Observable<any> {
        let body = JSON.stringify(ciebBankTermReasonCode);
        return this.httpClient.patch(`${this.ciebBankTermReasonCodeUrl}/${bankTermReasonCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebBankTermReasonCode(bankTermReasonCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebBankTermReasonCodeUrl}/${bankTermReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}