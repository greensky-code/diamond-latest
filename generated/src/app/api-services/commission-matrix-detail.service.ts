/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CommissionMatrixDetail } from '../api-models/commission-matrix-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CommissionMatrixDetailService {

    private commissionMatrixDetailUrl: string = `${environment.apiUrl}/commissionmatrixdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCommissionMatrixDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CommissionMatrixDetail[]> {
        var url = `${this.commissionMatrixDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CommissionMatrixDetail[]),
                catchError(this.sharedService.handleError))
    }

    getCommissionMatrixDetail(matrixDef : string): Observable<CommissionMatrixDetail> {
        return this.httpClient.get(`${this.commissionMatrixDetailUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionMatrixDetail),
                catchError(this.sharedService.handleError))
    }

    getCommissionMatrixDetailsCount(): Observable<number> {
        var url = `${this.commissionMatrixDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByMatrixDef(matrixDef : string): Observable<CommissionMatrixDetail[]> {
        return this.httpClient.get(`${this.commissionMatrixDetailUrl}/find-by-matrixdef/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body as CommissionMatrixDetail),
                catchError(this.sharedService.handleError))
    }




    createCommissionMatrixDetail(commissionMatrixDetail : CommissionMatrixDetail): Observable<any> {
        let body = JSON.stringify(commissionMatrixDetail);
        return this.httpClient.post(this.commissionMatrixDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCommissionMatrixDetail(commissionMatrixDetail : CommissionMatrixDetail, matrixDef : string): Observable<any> {
        let body = JSON.stringify(commissionMatrixDetail);
        return this.httpClient.put(`${this.commissionMatrixDetailUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCommissionMatrixDetail(commissionMatrixDetail : CommissionMatrixDetail, matrixDef : string): Observable<any> {
        let body = JSON.stringify(commissionMatrixDetail);
        return this.httpClient.patch(`${this.commissionMatrixDetailUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCommissionMatrixDetail(matrixDef : string): Observable<any> {
        return this.httpClient.delete(`${this.commissionMatrixDetailUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}