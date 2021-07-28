/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapAdjustments } from '../api-models/cap-adjustments.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapAdjustmentsService {

    private capAdjustmentsUrl: string = `${environment.apiUrl}/capadjustmentss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapAdjustmentss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapAdjustments[]> {
        var url = `${this.capAdjustmentsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapAdjustments[]),
                catchError(this.sharedService.handleError))
    }

    getCapAdjustments(seqCapAdjustment : number): Observable<CapAdjustments> {
        return this.httpClient.get(`${this.capAdjustmentsUrl}/${seqCapAdjustment}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAdjustments),
                catchError(this.sharedService.handleError))
    }

    getCapAdjustmentssCount(): Observable<number> {
        var url = `${this.capAdjustmentsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqVendId(seqVendId : number): Observable<CapAdjustments[]> {
        return this.httpClient.get(`${this.capAdjustmentsUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAdjustments),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<CapAdjustments[]> {
        return this.httpClient.get(`${this.capAdjustmentsUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAdjustments),
                catchError(this.sharedService.handleError))
    }
    findByAdjustReason(adjustReason : string): Observable<CapAdjustments[]> {
        return this.httpClient.get(`${this.capAdjustmentsUrl}/find-by-adjustreason/${adjustReason}`, {observe: 'response'})
            .pipe(map(response => response.body as CapAdjustments),
                catchError(this.sharedService.handleError))
    }




    createCapAdjustments(capAdjustments : CapAdjustments): Observable<any> {
        let body = JSON.stringify(capAdjustments);
        return this.httpClient.post(this.capAdjustmentsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapAdjustments(capAdjustments : CapAdjustments, seqCapAdjustment : number): Observable<any> {
        let body = JSON.stringify(capAdjustments);
        return this.httpClient.put(`${this.capAdjustmentsUrl}/${seqCapAdjustment}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapAdjustments(capAdjustments : CapAdjustments, seqCapAdjustment : number): Observable<any> {
        let body = JSON.stringify(capAdjustments);
        return this.httpClient.patch(`${this.capAdjustmentsUrl}/${seqCapAdjustment}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapAdjustments(seqCapAdjustment : number): Observable<any> {
        return this.httpClient.delete(`${this.capAdjustmentsUrl}/${seqCapAdjustment}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}