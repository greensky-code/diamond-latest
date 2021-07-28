/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapRateHeader } from '../api-models/cap-rate-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapRateHeaderService {

    private capRateHeaderUrl: string = `${environment.apiUrl}/caprateheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapRateHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapRateHeader[]> {
        var url = `${this.capRateHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapRateHeader[]),
                catchError(this.sharedService.handleError))
    }

    getCapRateHeader(seqCapRateHdr : number): Observable<CapRateHeader> {
        return this.httpClient.get(`${this.capRateHeaderUrl}/${seqCapRateHdr}`, {observe: 'response'})
            .pipe(map(response => response.body as CapRateHeader),
                catchError(this.sharedService.handleError))
    }

    getCapRateHeadersCount(): Observable<number> {
        var url = `${this.capRateHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapRateHeader(capRateHeader : CapRateHeader): Observable<any> {
        let body = JSON.stringify(capRateHeader);
        return this.httpClient.post(this.capRateHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapRateHeader(capRateHeader : CapRateHeader, seqCapRateHdr : number): Observable<any> {
        let body = JSON.stringify(capRateHeader);
        return this.httpClient.put(`${this.capRateHeaderUrl}/${seqCapRateHdr}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapRateHeader(capRateHeader : CapRateHeader, seqCapRateHdr : number): Observable<any> {
        let body = JSON.stringify(capRateHeader);
        return this.httpClient.patch(`${this.capRateHeaderUrl}/${seqCapRateHdr}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapRateHeader(seqCapRateHdr : number): Observable<any> {
        return this.httpClient.delete(`${this.capRateHeaderUrl}/${seqCapRateHdr}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}