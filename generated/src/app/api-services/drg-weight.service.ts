/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DrgWeight } from '../api-models/drg-weight.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DrgWeightService {

    private drgWeightUrl: string = `${environment.apiUrl}/drgweights`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDrgWeights(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DrgWeight[]> {
        var url = `${this.drgWeightUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DrgWeight[]),
                catchError(this.sharedService.handleError))
    }

    getDrgWeight(drgPricerId : string): Observable<DrgWeight> {
        return this.httpClient.get(`${this.drgWeightUrl}/${drgPricerId}`, {observe: 'response'})
            .pipe(map(response => response.body as DrgWeight),
                catchError(this.sharedService.handleError))
    }

    getDrgWeightsCount(): Observable<number> {
        var url = `${this.drgWeightUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByDrgCode(drgCode : string): Observable<DrgWeight[]> {
        return this.httpClient.get(`${this.drgWeightUrl}/find-by-drgcode/${drgCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DrgWeight),
                catchError(this.sharedService.handleError))
    }




    createDrgWeight(drgWeight : DrgWeight): Observable<any> {
        let body = JSON.stringify(drgWeight);
        return this.httpClient.post(this.drgWeightUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDrgWeight(drgWeight : DrgWeight, drgPricerId : string): Observable<any> {
        let body = JSON.stringify(drgWeight);
        return this.httpClient.put(`${this.drgWeightUrl}/${drgPricerId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDrgWeight(drgWeight : DrgWeight, drgPricerId : string): Observable<any> {
        let body = JSON.stringify(drgWeight);
        return this.httpClient.patch(`${this.drgWeightUrl}/${drgPricerId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDrgWeight(drgPricerId : string): Observable<any> {
        return this.httpClient.delete(`${this.drgWeightUrl}/${drgPricerId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}