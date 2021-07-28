/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremBillSnapWork } from '../api-models/prem-bill-snap-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremBillSnapWorkService {

    private premBillSnapWorkUrl: string = `${environment.apiUrl}/prembillsnapworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremBillSnapWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremBillSnapWork[]> {
        var url = `${this.premBillSnapWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremBillSnapWork[]),
                catchError(this.sharedService.handleError))
    }

    getPremBillSnapWork(seqGpbilId : number): Observable<PremBillSnapWork> {
        return this.httpClient.get(`${this.premBillSnapWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremBillSnapWork),
                catchError(this.sharedService.handleError))
    }

    getPremBillSnapWorksCount(): Observable<number> {
        var url = `${this.premBillSnapWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPremBillSnapWork(premBillSnapWork : PremBillSnapWork): Observable<any> {
        let body = JSON.stringify(premBillSnapWork);
        return this.httpClient.post(this.premBillSnapWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremBillSnapWork(premBillSnapWork : PremBillSnapWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillSnapWork);
        return this.httpClient.put(`${this.premBillSnapWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremBillSnapWork(premBillSnapWork : PremBillSnapWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillSnapWork);
        return this.httpClient.patch(`${this.premBillSnapWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremBillSnapWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.premBillSnapWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}