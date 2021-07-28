/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapTrans } from '../api-models/cap-trans.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapTransService {

    private capTransUrl: string = `${environment.apiUrl}/captranss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapTranss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapTrans[]> {
        var url = `${this.capTransUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapTrans[]),
                catchError(this.sharedService.handleError))
    }

    getCapTrans(seqCapTrans : number): Observable<CapTrans> {
        return this.httpClient.get(`${this.capTransUrl}/${seqCapTrans}`, {observe: 'response'})
            .pipe(map(response => response.body as CapTrans),
                catchError(this.sharedService.handleError))
    }

    getCapTranssCount(): Observable<number> {
        var url = `${this.capTransUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqCapVendAddress(seqCapVendAddress : number): Observable<CapTrans[]> {
        return this.httpClient.get(`${this.capTransUrl}/find-by-seqcapvendaddress/${seqCapVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CapTrans),
                catchError(this.sharedService.handleError))
    }




    createCapTrans(capTrans : CapTrans): Observable<any> {
        let body = JSON.stringify(capTrans);
        return this.httpClient.post(this.capTransUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapTrans(capTrans : CapTrans, seqCapTrans : number): Observable<any> {
        let body = JSON.stringify(capTrans);
        return this.httpClient.put(`${this.capTransUrl}/${seqCapTrans}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapTrans(capTrans : CapTrans, seqCapTrans : number): Observable<any> {
        let body = JSON.stringify(capTrans);
        return this.httpClient.patch(`${this.capTransUrl}/${seqCapTrans}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapTrans(seqCapTrans : number): Observable<any> {
        return this.httpClient.delete(`${this.capTransUrl}/${seqCapTrans}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}