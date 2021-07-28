/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapAgeBandHeader } from '../api-models/cap-age-band-header.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapAgeBandHeaderService {

    private capAgeBandHeaderUrl: string = `${environment.apiUrl}/capagebandheaders`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapAgeBandHeaders(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapAgeBandHeader[]> {
        var url = `${this.capAgeBandHeaderUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapAgeBandHeader[]),
                catchError(this.sharedService.handleError))
    }

    getCapAgeBandHeader(ageBandId : string): Observable<CapAgeBandHeader> {
        return this.httpClient.get(`${this.capAgeBandHeaderUrl}/${ageBandId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAgeBandHeader),
                catchError(this.sharedService.handleError))
    }

    getCapAgeBandHeadersCount(): Observable<number> {
        var url = `${this.capAgeBandHeaderUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapAgeBandHeader(capAgeBandHeader : CapAgeBandHeader): Observable<any> {
        let body = JSON.stringify(capAgeBandHeader);
        return this.httpClient.post(this.capAgeBandHeaderUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapAgeBandHeader(capAgeBandHeader : CapAgeBandHeader, ageBandId : string): Observable<any> {
        let body = JSON.stringify(capAgeBandHeader);
        return this.httpClient.put(`${this.capAgeBandHeaderUrl}/${ageBandId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapAgeBandHeader(capAgeBandHeader : CapAgeBandHeader, ageBandId : string): Observable<any> {
        let body = JSON.stringify(capAgeBandHeader);
        return this.httpClient.patch(`${this.capAgeBandHeaderUrl}/${ageBandId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapAgeBandHeader(ageBandId : string): Observable<any> {
        return this.httpClient.delete(`${this.capAgeBandHeaderUrl}/${ageBandId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}