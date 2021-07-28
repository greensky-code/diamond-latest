/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremBillSubDetailWork } from '../api-models/prem-bill-sub-detail-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremBillSubDetailWorkService {

    private premBillSubDetailWorkUrl: string = `${environment.apiUrl}/prembillsubdetailworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremBillSubDetailWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremBillSubDetailWork[]> {
        var url = `${this.premBillSubDetailWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremBillSubDetailWork[]),
                catchError(this.sharedService.handleError))
    }

    getPremBillSubDetailWork(seqGpbilId : number): Observable<PremBillSubDetailWork> {
        return this.httpClient.get(`${this.premBillSubDetailWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremBillSubDetailWork),
                catchError(this.sharedService.handleError))
    }

    getPremBillSubDetailWorksCount(): Observable<number> {
        var url = `${this.premBillSubDetailWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPremBillSubDetailWork(premBillSubDetailWork : PremBillSubDetailWork): Observable<any> {
        let body = JSON.stringify(premBillSubDetailWork);
        return this.httpClient.post(this.premBillSubDetailWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremBillSubDetailWork(premBillSubDetailWork : PremBillSubDetailWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillSubDetailWork);
        return this.httpClient.put(`${this.premBillSubDetailWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremBillSubDetailWork(premBillSubDetailWork : PremBillSubDetailWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillSubDetailWork);
        return this.httpClient.patch(`${this.premBillSubDetailWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremBillSubDetailWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.premBillSubDetailWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}