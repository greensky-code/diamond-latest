/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ConversionFactorDtl } from '../api-models/conversion-factor-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ConversionFactorDtlService {

    private conversionFactorDtlUrl: string = `${environment.apiUrl}/conversionfactordtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getConversionFactorDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ConversionFactorDtl[]> {
        var url = `${this.conversionFactorDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorDtl[]),
                catchError(this.sharedService.handleError))
    }

    getConversionFactorDtl(seqConvFactor : number): Observable<ConversionFactorDtl> {
        return this.httpClient.get(`${this.conversionFactorDtlUrl}/${seqConvFactor}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorDtl),
                catchError(this.sharedService.handleError))
    }

    getConversionFactorDtlsCount(): Observable<number> {
        var url = `${this.conversionFactorDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqConvFactor(seqConvFactor : number): Observable<ConversionFactorDtl[]> {
        return this.httpClient.get(`${this.conversionFactorDtlUrl}/find-by-seqconvfactor/${seqConvFactor}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorDtl),
                catchError(this.sharedService.handleError))
    }
    findByConvFactorId(convFactorId : string): Observable<ConversionFactorDtl[]> {
        return this.httpClient.get(`${this.conversionFactorDtlUrl}/find-by-convfactorid/${convFactorId}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorDtl),
                catchError(this.sharedService.handleError))
    }




    createConversionFactorDtl(conversionFactorDtl : ConversionFactorDtl): Observable<any> {
        let body = JSON.stringify(conversionFactorDtl);
        return this.httpClient.post(this.conversionFactorDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateConversionFactorDtl(conversionFactorDtl : ConversionFactorDtl, seqConvFactor : number): Observable<any> {
        let body = JSON.stringify(conversionFactorDtl);
        return this.httpClient.put(`${this.conversionFactorDtlUrl}/${seqConvFactor}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateConversionFactorDtl(conversionFactorDtl : ConversionFactorDtl, seqConvFactor : number): Observable<any> {
        let body = JSON.stringify(conversionFactorDtl);
        return this.httpClient.patch(`${this.conversionFactorDtlUrl}/${seqConvFactor}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteConversionFactorDtl(seqConvFactor : number): Observable<any> {
        return this.httpClient.delete(`${this.conversionFactorDtlUrl}/${seqConvFactor}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}