/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremiumMatrixHeader } from '../api-models/premium-matrix-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremiumMatrixHeaderService {

    private premiumMatrixHeaderUrl: string = `${environment.apiUrl}/premiummatrixheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremiumMatrixHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremiumMatrixHeader[]> {
        var url = `${this.premiumMatrixHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMatrixHeader[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPremiumMatrixHeader(matrixDef : string): Observable<PremiumMatrixHeader> {
        return this.httpClient.get(`${this.premiumMatrixHeaderUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMatrixHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPremiumMatrixHeadersCount(): Observable<number> {
        var url = `${this.premiumMatrixHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByMatrixDeterminant(matrixDeterminant : string): Observable<PremiumMatrixHeader[]> {
        return this.httpClient.get(`${this.premiumMatrixHeaderUrl}/find-by-matrixdeterminant/${matrixDeterminant}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMatrixHeader),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createPremiumMatrixHeader(premiumMatrixHeader : PremiumMatrixHeader): Observable<any> {
        let body = JSON.stringify(premiumMatrixHeader);
        return this.httpClient.post(this.premiumMatrixHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePremiumMatrixHeader(premiumMatrixHeader : PremiumMatrixHeader, matrixDef : string): Observable<any> {
        let body = JSON.stringify(premiumMatrixHeader);
        return this.httpClient.put(`${this.premiumMatrixHeaderUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePremiumMatrixHeader(premiumMatrixHeader : PremiumMatrixHeader, matrixDef : string): Observable<any> {
        let body = JSON.stringify(premiumMatrixHeader);
        return this.httpClient.patch(`${this.premiumMatrixHeaderUrl}/${matrixDef}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePremiumMatrixHeader(matrixDef : string): Observable<any> {
        return this.httpClient.delete(`${this.premiumMatrixHeaderUrl}/${matrixDef}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
