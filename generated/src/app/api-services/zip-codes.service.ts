/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ZipCodes } from '../api-models/zip-codes.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ZipCodesService {

    private zipCodesUrl: string = `${environment.apiUrl}/zipcodeses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getZipCodeses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ZipCodes[]> {
        var url = `${this.zipCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ZipCodes[]),
                catchError(this.sharedService.handleError))
    }

    getZipCodes(zip : string): Observable<ZipCodes> {
        return this.httpClient.get(`${this.zipCodesUrl}/${zip}`, {observe: 'response'})
            .pipe(map(response => response.body as ZipCodes),
                catchError(this.sharedService.handleError))
    }

    getZipCodesesCount(): Observable<number> {
        var url = `${this.zipCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createZipCodes(zipCodes : ZipCodes): Observable<any> {
        let body = JSON.stringify(zipCodes);
        return this.httpClient.post(this.zipCodesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateZipCodes(zipCodes : ZipCodes, zip : string): Observable<any> {
        let body = JSON.stringify(zipCodes);
        return this.httpClient.put(`${this.zipCodesUrl}/${zip}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateZipCodes(zipCodes : ZipCodes, zip : string): Observable<any> {
        let body = JSON.stringify(zipCodes);
        return this.httpClient.patch(`${this.zipCodesUrl}/${zip}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteZipCodes(zip : string): Observable<any> {
        return this.httpClient.delete(`${this.zipCodesUrl}/${zip}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}