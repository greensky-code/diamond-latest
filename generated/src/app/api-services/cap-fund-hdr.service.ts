/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFundHdr } from '../api-models/cap-fund-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapFundHdrService {

    private capFundHdrUrl: string = `${environment.apiUrl}/capfundhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapFundHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapFundHdr[]> {
        var url = `${this.capFundHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapFundHdr[]),
                catchError(this.sharedService.handleError))
    }

    getCapFundHdr(capFundModelId : string): Observable<CapFundHdr> {
        return this.httpClient.get(`${this.capFundHdrUrl}/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundHdr),
                catchError(this.sharedService.handleError))
    }

    getCapFundHdrsCount(): Observable<number> {
        var url = `${this.capFundHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapFundHdr(capFundHdr : CapFundHdr): Observable<any> {
        let body = JSON.stringify(capFundHdr);
        return this.httpClient.post(this.capFundHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapFundHdr(capFundHdr : CapFundHdr, capFundModelId : string): Observable<any> {
        let body = JSON.stringify(capFundHdr);
        return this.httpClient.put(`${this.capFundHdrUrl}/${capFundModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapFundHdr(capFundHdr : CapFundHdr, capFundModelId : string): Observable<any> {
        let body = JSON.stringify(capFundHdr);
        return this.httpClient.patch(`${this.capFundHdrUrl}/${capFundModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapFundHdr(capFundModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capFundHdrUrl}/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}