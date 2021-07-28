/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ConversionFactorHdr } from '../api-models/conversion-factor-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ConversionFactorHdrService {

    private conversionFactorHdrUrl: string = `${environment.apiUrl}/conversionfactorhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getConversionFactorHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ConversionFactorHdr[]> {
        var url = `${this.conversionFactorHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorHdr[]),
                catchError(this.sharedService.handleError))
    }

    getConversionFactorHdr(seqConvFactor : number): Observable<ConversionFactorHdr> {
        return this.httpClient.get(`${this.conversionFactorHdrUrl}/${seqConvFactor}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorHdr),
                catchError(this.sharedService.handleError))
    }

    getConversionFactorHdrsCount(): Observable<number> {
        var url = `${this.conversionFactorHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByScaleType(scaleType : string): Observable<ConversionFactorHdr[]> {
        return this.httpClient.get(`${this.conversionFactorHdrUrl}/find-by-scaletype/${scaleType}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorHdr),
                catchError(this.sharedService.handleError))
    }
    findByPriceSchedule(priceSchedule : string): Observable<ConversionFactorHdr[]> {
        return this.httpClient.get(`${this.conversionFactorHdrUrl}/find-by-priceschedule/${priceSchedule}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorHdr),
                catchError(this.sharedService.handleError))
    }




    createConversionFactorHdr(conversionFactorHdr : ConversionFactorHdr): Observable<any> {
        let body = JSON.stringify(conversionFactorHdr);
        return this.httpClient.post(this.conversionFactorHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateConversionFactorHdr(conversionFactorHdr : ConversionFactorHdr, seqConvFactor : number): Observable<any> {
        let body = JSON.stringify(conversionFactorHdr);
        return this.httpClient.put(`${this.conversionFactorHdrUrl}/${seqConvFactor}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateConversionFactorHdr(conversionFactorHdr : ConversionFactorHdr, seqConvFactor : number): Observable<any> {
        let body = JSON.stringify(conversionFactorHdr);
        return this.httpClient.patch(`${this.conversionFactorHdrUrl}/${seqConvFactor}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteConversionFactorHdr(seqConvFactor : number): Observable<any> {
        return this.httpClient.delete(`${this.conversionFactorHdrUrl}/${seqConvFactor}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}