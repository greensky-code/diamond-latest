/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremiumMatrixDetail } from '../api-models/premium-matrix-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremiumMatrixDetailService {

    private premiumMatrixDetailUrl: string = `${environment.apiUrl}/premiummatrixdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremiumMatrixDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremiumMatrixDetail[]> {
        var url = `${this.premiumMatrixDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMatrixDetail[]),
                catchError(this.sharedService.handleError))
    }

    getPremiumMatrixDetail(matrixDef : string): Observable<PremiumMatrixDetail> {
        return this.httpClient.get(`${this.premiumMatrixDetailUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMatrixDetail),
                catchError(this.sharedService.handleError))
    }

    getPremiumMatrixDetailsCount(): Observable<number> {
        var url = `${this.premiumMatrixDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByMatrixDef(matrixDef : string): Observable<PremiumMatrixDetail[]> {
        return this.httpClient.get(`${this.premiumMatrixDetailUrl}/find-by-matrixdef/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMatrixDetail),
                catchError(this.sharedService.handleError))
    }




    createPremiumMatrixDetail(premiumMatrixDetail : PremiumMatrixDetail): Observable<any> {
        let body = JSON.stringify(premiumMatrixDetail);
        return this.httpClient.post(this.premiumMatrixDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremiumMatrixDetail(premiumMatrixDetail : PremiumMatrixDetail, matrixDef : string): Observable<any> {
        let body = JSON.stringify(premiumMatrixDetail);
        return this.httpClient.put(`${this.premiumMatrixDetailUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremiumMatrixDetail(premiumMatrixDetail : PremiumMatrixDetail, matrixDef : string): Observable<any> {
        let body = JSON.stringify(premiumMatrixDetail);
        return this.httpClient.patch(`${this.premiumMatrixDetailUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremiumMatrixDetail(matrixDef : string): Observable<any> {
        return this.httpClient.delete(`${this.premiumMatrixDetailUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}