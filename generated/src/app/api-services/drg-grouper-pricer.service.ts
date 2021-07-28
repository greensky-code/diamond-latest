/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DrgGrouperPricer } from '../api-models/drg-grouper-pricer.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DrgGrouperPricerService {

    private drgGrouperPricerUrl: string = `${environment.apiUrl}/drggrouperpricers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDrgGrouperPricers(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DrgGrouperPricer[]> {
        var url = `${this.drgGrouperPricerUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DrgGrouperPricer[]),
                catchError(this.sharedService.handleError))
    }

    getDrgGrouperPricer(drgGrouperPricerId : string): Observable<DrgGrouperPricer> {
        return this.httpClient.get(`${this.drgGrouperPricerUrl}/${drgGrouperPricerId}`, {observe: 'response'})
            .pipe(map(response => response.body as DrgGrouperPricer),
                catchError(this.sharedService.handleError))
    }

    getDrgGrouperPricersCount(): Observable<number> {
        var url = `${this.drgGrouperPricerUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDrgGrouperPricer(drgGrouperPricer : DrgGrouperPricer): Observable<any> {
        let body = JSON.stringify(drgGrouperPricer);
        return this.httpClient.post(this.drgGrouperPricerUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDrgGrouperPricer(drgGrouperPricer : DrgGrouperPricer, drgGrouperPricerId : string): Observable<any> {
        let body = JSON.stringify(drgGrouperPricer);
        return this.httpClient.put(`${this.drgGrouperPricerUrl}/${drgGrouperPricerId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDrgGrouperPricer(drgGrouperPricer : DrgGrouperPricer, drgGrouperPricerId : string): Observable<any> {
        let body = JSON.stringify(drgGrouperPricer);
        return this.httpClient.patch(`${this.drgGrouperPricerUrl}/${drgGrouperPricerId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDrgGrouperPricer(drgGrouperPricerId : string): Observable<any> {
        return this.httpClient.delete(`${this.drgGrouperPricerUrl}/${drgGrouperPricerId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }


    getDrgGrouperPricerIDDropdown() {
      return this.httpClient.get(`${this.drgGrouperPricerUrl}/getPrice`);
    }

}
