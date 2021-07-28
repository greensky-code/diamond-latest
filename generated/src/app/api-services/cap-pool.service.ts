/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapPool } from '../api-models/cap-pool.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapPoolService {

    private capPoolUrl: string = `${environment.apiUrl}/cappools`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapPools(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapPool[]> {
        var url = `${this.capPoolUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapPool[]),
                catchError(this.sharedService.handleError))
    }

    getCapPool(capModelId : string): Observable<CapPool> {
        return this.httpClient.get(`${this.capPoolUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPool),
                catchError(this.sharedService.handleError))
    }

    getCapPoolsCount(): Observable<number> {
        var url = `${this.capPoolUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCompanyCodeDed(companyCodeDed : string): Observable<CapPool[]> {
        return this.httpClient.get(`${this.capPoolUrl}/find-by-companycodeded/${companyCodeDed}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPool),
                catchError(this.sharedService.handleError))
    }
    findByCompanyCodeWhld(companyCodeWhld : string): Observable<CapPool[]> {
        return this.httpClient.get(`${this.capPoolUrl}/find-by-companycodewhld/${companyCodeWhld}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPool),
                catchError(this.sharedService.handleError))
    }
    findByCompanyCodePmpm(companyCodePmpm : string): Observable<CapPool[]> {
        return this.httpClient.get(`${this.capPoolUrl}/find-by-companycodepmpm/${companyCodePmpm}`, {observe: 'response'})
            .pipe(map(response => response.body as CapPool),
                catchError(this.sharedService.handleError))
    }




    createCapPool(capPool : CapPool): Observable<any> {
        let body = JSON.stringify(capPool);
        return this.httpClient.post(this.capPoolUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapPool(capPool : CapPool, capModelId : string): Observable<any> {
        let body = JSON.stringify(capPool);
        return this.httpClient.put(`${this.capPoolUrl}/${capModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapPool(capPool : CapPool, capModelId : string): Observable<any> {
        let body = JSON.stringify(capPool);
        return this.httpClient.patch(`${this.capPoolUrl}/${capModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapPool(capModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capPoolUrl}/${capModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}