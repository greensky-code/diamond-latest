/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapControlDtl } from '../api-models/cap-control-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapControlDtlService {

    private capControlDtlUrl: string = `${environment.apiUrl}/capcontroldtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapControlDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapControlDtl[]> {
        var url = `${this.capControlDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapControlDtl[]),
                catchError(this.sharedService.handleError))
    }

    getCapControlDtl(capModel : string): Observable<CapControlDtl> {
        return this.httpClient.get(`${this.capControlDtlUrl}/${capModel}`, {observe: 'response'})
            .pipe(map(response => response.body as CapControlDtl),
                catchError(this.sharedService.handleError))
    }

    getCapControlDtlsCount(): Observable<number> {
        var url = `${this.capControlDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCapModel(capModel : string): Observable<CapControlDtl[]> {
        return this.httpClient.get(`${this.capControlDtlUrl}/find-by-capmodel/${capModel}`, {observe: 'response'})
            .pipe(map(response => response.body as CapControlDtl),
                catchError(this.sharedService.handleError))
    }




    createCapControlDtl(capControlDtl : CapControlDtl): Observable<any> {
        let body = JSON.stringify(capControlDtl);
        return this.httpClient.post(this.capControlDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapControlDtl(capControlDtl : CapControlDtl, capModel : string): Observable<any> {
        let body = JSON.stringify(capControlDtl);
        return this.httpClient.put(`${this.capControlDtlUrl}/${capModel}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapControlDtl(capControlDtl : CapControlDtl, capModel : string): Observable<any> {
        let body = JSON.stringify(capControlDtl);
        return this.httpClient.patch(`${this.capControlDtlUrl}/${capModel}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapControlDtl(capModel : string): Observable<any> {
        return this.httpClient.delete(`${this.capControlDtlUrl}/${capModel}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}