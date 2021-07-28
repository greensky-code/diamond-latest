/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import {ConversionFactorType} from '../api-models/conversion-factor-type.model';

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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getConversionFactorType(convFactorId : string): Observable<ConversionFactorType> {
        return this.httpClient.get(`${this.conversionFactorTypeUrl}/${convFactorId}`, {observe: 'response'})
            .pipe(map(response => response.body as ConversionFactorType),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getConversionFactorTypesCount(): Observable<number> {
        var url = `${this.conversionFactorTypeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createConversionFactorType(conversionFactorType : ConversionFactorType): Observable<any> {
        let body = JSON.stringify(conversionFactorType);
        return this.httpClient.post(this.conversionFactorTypeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateConversionFactorType(conversionFactorType: any, convFactorId: string): Observable<any> {
        let body = JSON.stringify(conversionFactorType);
        return this.httpClient.put(`${this.conversionFactorTypeUrl}/${convFactorId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateConversionFactorType(conversionFactorType : ConversionFactorType, convFactorId : string): Observable<any> {
        let body = JSON.stringify(conversionFactorType);
        return this.httpClient.patch(`${this.conversionFactorTypeUrl}/${convFactorId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteConversionFactorType(convFactorId: string): Observable<any> {
        return this.httpClient.delete(`${this.conversionFactorTypeUrl}/${convFactorId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
