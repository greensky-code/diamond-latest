/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ConversionFactorType } from '../api-models/conversion-factor-type.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ConversionFactorTypeService {

    private conversionFactorTypeUrl: string = `${environment.apiUrl}/conversionfactortypes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getConversionFactorTypes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ConversionFactorType[]> {
        var url = `${this.conversionFactorTypeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorType[]),
                catchError(this.sharedService.handleError))
    }

    getConversionFactorType(convFactorId : string): Observable<ConversionFactorType> {
        return this.httpClient.get(`${this.conversionFactorTypeUrl}/${convFactorId}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorType),
                catchError(this.sharedService.handleError))
    }

    getConversionFactorTypesCount(): Observable<number> {
        var url = `${this.conversionFactorTypeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createConversionFactorType(conversionFactorType : ConversionFactorType): Observable<any> {
        let body = JSON.stringify(conversionFactorType);
        return this.httpClient.post(this.conversionFactorTypeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateConversionFactorType(conversionFactorType : ConversionFactorType, convFactorId : string): Observable<any> {
        let body = JSON.stringify(conversionFactorType);
        return this.httpClient.put(`${this.conversionFactorTypeUrl}/${convFactorId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateConversionFactorType(conversionFactorType : ConversionFactorType, convFactorId : string): Observable<any> {
        let body = JSON.stringify(conversionFactorType);
        return this.httpClient.patch(`${this.conversionFactorTypeUrl}/${convFactorId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteConversionFactorType(convFactorId : string): Observable<any> {
        return this.httpClient.delete(`${this.conversionFactorTypeUrl}/${convFactorId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}