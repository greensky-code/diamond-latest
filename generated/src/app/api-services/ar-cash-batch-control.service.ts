/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCashBatchControl } from '../api-models/ar-cash-batch-control.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ArCashBatchControlService {

    private arCashBatchControlUrl: string = `${environment.apiUrl}/arcashbatchcontrols`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getArCashBatchControls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ArCashBatchControl[]> {
        var url = `${this.arCashBatchControlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ArCashBatchControl[]),
                catchError(this.sharedService.handleError))
    }

    getArCashBatchControl(seqCashBatchId : number): Observable<ArCashBatchControl> {
        return this.httpClient.get(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, {observe: 'response'})
            .pipe(map(response => response.body as ArCashBatchControl),
                catchError(this.sharedService.handleError))
    }

    getArCashBatchControlsCount(): Observable<number> {
        var url = `${this.arCashBatchControlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createArCashBatchControl(arCashBatchControl : ArCashBatchControl): Observable<any> {
        let body = JSON.stringify(arCashBatchControl);
        return this.httpClient.post(this.arCashBatchControlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateArCashBatchControl(arCashBatchControl : ArCashBatchControl, seqCashBatchId : number): Observable<any> {
        let body = JSON.stringify(arCashBatchControl);
        return this.httpClient.put(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateArCashBatchControl(arCashBatchControl : ArCashBatchControl, seqCashBatchId : number): Observable<any> {
        let body = JSON.stringify(arCashBatchControl);
        return this.httpClient.patch(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteArCashBatchControl(seqCashBatchId : number): Observable<any> {
        return this.httpClient.delete(`${this.arCashBatchControlUrl}/${seqCashBatchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}