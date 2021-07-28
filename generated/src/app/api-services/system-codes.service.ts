/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SystemCodes } from '../api-models/system-codes.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SystemCodesService {

    private systemCodesUrl: string = `${environment.apiUrl}/systemcodeses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSystemCodeses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SystemCodes[]> {
        var url = `${this.systemCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes[]),
                catchError(this.sharedService.handleError))
    }

    getSystemCodes(systemCode : string): Observable<SystemCodes> {
        return this.httpClient.get(`${this.systemCodesUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes),
                catchError(this.sharedService.handleError))
    }

    getSystemCodesesCount(): Observable<number> {
        var url = `${this.systemCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSystemCodes(systemCodes : SystemCodes): Observable<any> {
        let body = JSON.stringify(systemCodes);
        return this.httpClient.post(this.systemCodesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSystemCodes(systemCodes : SystemCodes, systemCode : string): Observable<any> {
        let body = JSON.stringify(systemCodes);
        return this.httpClient.put(`${this.systemCodesUrl}/${systemCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSystemCodes(systemCodes : SystemCodes, systemCode : string): Observable<any> {
        let body = JSON.stringify(systemCodes);
        return this.httpClient.patch(`${this.systemCodesUrl}/${systemCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSystemCodes(systemCode : string): Observable<any> {
        return this.httpClient.delete(`${this.systemCodesUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}