/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CmAdjustment } from '../api-models/cm-adjustment.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CmAdjustmentService {

    private cmAdjustmentUrl: string = `${environment.apiUrl}/cmadjustments`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCmAdjustments(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CmAdjustment[]> {
        var url = `${this.cmAdjustmentUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CmAdjustment[]),
                catchError(this.sharedService.handleError))
    }

    getCmAdjustment(seqCmadjId : number): Observable<CmAdjustment> {
        return this.httpClient.get(`${this.cmAdjustmentUrl}/${seqCmadjId}`, {observe: 'response'})
            .pipe(map(response => response.body as CmAdjustment),
                catchError(this.sharedService.handleError))
    }

    getCmAdjustmentsCount(): Observable<number> {
        var url = `${this.cmAdjustmentUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCmAdjustment(cmAdjustment : CmAdjustment): Observable<any> {
        let body = JSON.stringify(cmAdjustment);
        return this.httpClient.post(this.cmAdjustmentUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCmAdjustment(cmAdjustment : CmAdjustment, seqCmadjId : number): Observable<any> {
        let body = JSON.stringify(cmAdjustment);
        return this.httpClient.put(`${this.cmAdjustmentUrl}/${seqCmadjId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCmAdjustment(cmAdjustment : CmAdjustment, seqCmadjId : number): Observable<any> {
        let body = JSON.stringify(cmAdjustment);
        return this.httpClient.patch(`${this.cmAdjustmentUrl}/${seqCmadjId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCmAdjustment(seqCmadjId : number): Observable<any> {
        return this.httpClient.delete(`${this.cmAdjustmentUrl}/${seqCmadjId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}