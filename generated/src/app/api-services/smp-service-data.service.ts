/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpServiceData } from '../api-models/smp-service-data.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpServiceDataService {

    private smpServiceDataUrl: string = `${environment.apiUrl}/smpservicedatas`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpServiceDatas(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpServiceData[]> {
        var url = `${this.smpServiceDataUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceData[]),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceData(owner : string): Observable<SmpServiceData> {
        return this.httpClient.get(`${this.smpServiceDataUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpServiceData),
                catchError(this.sharedService.handleError))
    }

    getSmpServiceDatasCount(): Observable<number> {
        var url = `${this.smpServiceDataUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpServiceData(smpServiceData : SmpServiceData): Observable<any> {
        let body = JSON.stringify(smpServiceData);
        return this.httpClient.post(this.smpServiceDataUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpServiceData(smpServiceData : SmpServiceData, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceData);
        return this.httpClient.put(`${this.smpServiceDataUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpServiceData(smpServiceData : SmpServiceData, owner : string): Observable<any> {
        let body = JSON.stringify(smpServiceData);
        return this.httpClient.patch(`${this.smpServiceDataUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpServiceData(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpServiceDataUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}