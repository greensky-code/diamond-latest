/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremBillSelGroupsWork } from '../api-models/prem-bill-sel-groups-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremBillSelGroupsWorkService {

    private premBillSelGroupsWorkUrl: string = `${environment.apiUrl}/prembillselgroupsworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremBillSelGroupsWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremBillSelGroupsWork[]> {
        var url = `${this.premBillSelGroupsWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremBillSelGroupsWork[]),
                catchError(this.sharedService.handleError))
    }

    getPremBillSelGroupsWork(seqGpbilId : number): Observable<PremBillSelGroupsWork> {
        return this.httpClient.get(`${this.premBillSelGroupsWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremBillSelGroupsWork),
                catchError(this.sharedService.handleError))
    }

    getPremBillSelGroupsWorksCount(): Observable<number> {
        var url = `${this.premBillSelGroupsWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPremBillSelGroupsWork(premBillSelGroupsWork : PremBillSelGroupsWork): Observable<any> {
        let body = JSON.stringify(premBillSelGroupsWork);
        return this.httpClient.post(this.premBillSelGroupsWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremBillSelGroupsWork(premBillSelGroupsWork : PremBillSelGroupsWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillSelGroupsWork);
        return this.httpClient.put(`${this.premBillSelGroupsWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremBillSelGroupsWork(premBillSelGroupsWork : PremBillSelGroupsWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(premBillSelGroupsWork);
        return this.httpClient.patch(`${this.premBillSelGroupsWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremBillSelGroupsWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.premBillSelGroupsWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}