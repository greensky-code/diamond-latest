/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebExternalCarrier } from '../api-models/cieb-external-carrier.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebExternalCarrierService {

    private ciebExternalCarrierUrl: string = `${environment.apiUrl}/ciebexternalcarriers`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebExternalCarriers(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebExternalCarrier[]> {
        var url = `${this.ciebExternalCarrierUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebExternalCarrier[]),
                catchError(this.sharedService.handleError))
    }

    getCiebExternalCarrier(seqExtnId : number): Observable<CiebExternalCarrier> {
        return this.httpClient.get(`${this.ciebExternalCarrierUrl}/${seqExtnId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebExternalCarrier),
                catchError(this.sharedService.handleError))
    }

    getCiebExternalCarriersCount(): Observable<number> {
        var url = `${this.ciebExternalCarrierUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebExternalCarrier(ciebExternalCarrier : CiebExternalCarrier): Observable<any> {
        let body = JSON.stringify(ciebExternalCarrier);
        return this.httpClient.post(this.ciebExternalCarrierUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebExternalCarrier(ciebExternalCarrier : CiebExternalCarrier, seqExtnId : number): Observable<any> {
        let body = JSON.stringify(ciebExternalCarrier);
        return this.httpClient.put(`${this.ciebExternalCarrierUrl}/${seqExtnId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebExternalCarrier(ciebExternalCarrier : CiebExternalCarrier, seqExtnId : number): Observable<any> {
        let body = JSON.stringify(ciebExternalCarrier);
        return this.httpClient.patch(`${this.ciebExternalCarrierUrl}/${seqExtnId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebExternalCarrier(seqExtnId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebExternalCarrierUrl}/${seqExtnId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}