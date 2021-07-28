/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremBillAdjWork } from '../api-models/prem-bill-adj-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremBillAdjWorkService {

    private premBillAdjWorkUrl: string = `${environment.apiUrl}/prembilladjworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremBillAdjWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremBillAdjWork[]> {
        var url = `${this.premBillAdjWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremBillAdjWork[]),
                catchError(this.sharedService.handleError))
    }

    getPremBillAdjWork(seqGpbilId : number): Observable<PremBillAdjWork> {
        return this.httpClient.get(`${this.premBillAdjWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremBillAdjWork),
                catchError(this.sharedService.handleError))
    }

    getPremBillAdjWorksCount(): Observable<number> {
        var url = `${this.premBillAdjWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPremBillAdjWork(premBillAdjWork : PremBillAdjWork): Observable<any> {
        let body = JSON.stringify(premBillAdjWork);
        return this.httpClient.post(this.premBillAdjWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremBillAdjWork(premBillAdjWork : PremBillAdjWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillAdjWork);
        return this.httpClient.put(`${this.premBillAdjWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremBillAdjWork(premBillAdjWork : PremBillAdjWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillAdjWork);
        return this.httpClient.patch(`${this.premBillAdjWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremBillAdjWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.premBillAdjWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}