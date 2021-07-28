/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArTaxAdjustment } from '../api-models/ar-tax-adjustment.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArTaxAdjustmentService {

    private arTaxAdjustmentUrl: string = `${environment.apiUrl}/artaxadjustments`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArTaxAdjustments(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ArTaxAdjustment[]> {
        var url = `${this.arTaxAdjustmentUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArTaxAdjustment[]),
                catchError(this.sharedService.handleError))
    }

    getArTaxAdjustment(seqAradjId : number): Observable<ArTaxAdjustment> {
        return this.httpClient.get(`${this.arTaxAdjustmentUrl}/${seqAradjId}`, {observe: 'response'})
            .pipe(map(response => response.body as ArTaxAdjustment),
                catchError(this.sharedService.handleError))
    }

    getArTaxAdjustmentsCount(): Observable<number> {
        var url = `${this.arTaxAdjustmentUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createArTaxAdjustment(arTaxAdjustment : ArTaxAdjustment): Observable<any> {
        let body = JSON.stringify(arTaxAdjustment);
        return this.httpClient.post(this.arTaxAdjustmentUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateArTaxAdjustment(arTaxAdjustment : ArTaxAdjustment, seqAradjId : number): Observable<any> {
        let body = JSON.stringify(arTaxAdjustment);
        return this.httpClient.put(`${this.arTaxAdjustmentUrl}/${seqAradjId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateArTaxAdjustment(arTaxAdjustment : ArTaxAdjustment, seqAradjId : number): Observable<any> {
        let body = JSON.stringify(arTaxAdjustment);
        return this.httpClient.patch(`${this.arTaxAdjustmentUrl}/${seqAradjId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteArTaxAdjustment(seqAradjId : number): Observable<any> {
        return this.httpClient.delete(`${this.arTaxAdjustmentUrl}/${seqAradjId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}