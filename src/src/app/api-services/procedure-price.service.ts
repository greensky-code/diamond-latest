/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcedurePrice } from '../api-models/procedure-price.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProcedurePriceService {

    private procedurePriceUrl: string = `${environment.apiUrl}/procedureprices`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProcedurePrices(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProcedurePrice[]> {
        var url = `${this.procedurePriceUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProcedurePrice[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProcedurePrice(procedureCode : string): Observable<ProcedurePrice> {
        return this.httpClient.get(`${this.procedurePriceUrl}/find-by-procedurecode/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedurePrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProcedurePricesCount(): Observable<number> {
        var url = `${this.procedurePriceUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByProcedureCode(procedureCode : string): Observable<ProcedurePrice[]> {
        return this.httpClient.get(`${this.procedurePriceUrl}/find-by-procedurecode/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedurePrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByPriceSchedule(priceSchedule : string): Observable<ProcedurePrice[]> {
        return this.httpClient.get(`${this.procedurePriceUrl}/find-by-priceschedule/${priceSchedule}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedurePrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByModifierCode(modifierCode : string): Observable<ProcedurePrice[]> {
        return this.httpClient.get(`${this.procedurePriceUrl}/find-by-modifiercode/${modifierCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProcedurePrice),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createProcedurePrice(procedurePrice : any): Observable<any> {
        let body = JSON.stringify(procedurePrice);
        return this.httpClient.post(this.procedurePriceUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProcedurePrice(procedurePrice : ProcedurePrice, procedureCode : string, seqProcPrice:number): Observable<any> {
        let body = JSON.stringify(procedurePrice);
        return this.httpClient.put(`${this.procedurePriceUrl}/${seqProcPrice}/${procedureCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProcedurePrice(procedurePrice : ProcedurePrice, procedureCode : string): Observable<any> {
        let body = JSON.stringify(procedurePrice);
        return this.httpClient.patch(`${this.procedurePriceUrl}/${procedureCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProcedurePrice(procedureCode : string): Observable<any> {
        return this.httpClient.delete(`${this.procedurePriceUrl}/${procedureCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
