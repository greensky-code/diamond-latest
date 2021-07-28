/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CommissionMatrixHeader } from '../api-models/commission-matrix-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CommissionMatrixHeaderService {

    private commissionMatrixHeaderUrl: string = `${environment.apiUrl}/commissionmatrixheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCommissionMatrixHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CommissionMatrixHeader[]> {
        var url = `${this.commissionMatrixHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CommissionMatrixHeader[]),
                catchError(this.sharedService.handleError))
    }

    getCommissionMatrixHeader(matrixDef : string): Observable<CommissionMatrixHeader> {
        return this.httpClient.get(`${this.commissionMatrixHeaderUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionMatrixHeader),
                catchError(this.sharedService.handleError))
    }

    getCommissionMatrixHeadersCount(): Observable<number> {
        var url = `${this.commissionMatrixHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCommissionMatrixHeader(commissionMatrixHeader : CommissionMatrixHeader): Observable<any> {
        let body = JSON.stringify(commissionMatrixHeader);
        return this.httpClient.post(this.commissionMatrixHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCommissionMatrixHeader(commissionMatrixHeader : CommissionMatrixHeader, matrixDef : string): Observable<any> {
        let body = JSON.stringify(commissionMatrixHeader);
        return this.httpClient.put(`${this.commissionMatrixHeaderUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCommissionMatrixHeader(commissionMatrixHeader : CommissionMatrixHeader, matrixDef : string): Observable<any> {
        let body = JSON.stringify(commissionMatrixHeader);
        return this.httpClient.patch(`${this.commissionMatrixHeaderUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCommissionMatrixHeader(matrixDef : string): Observable<any> {
        return this.httpClient.delete(`${this.commissionMatrixHeaderUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}