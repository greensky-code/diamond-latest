/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSubDetailWork } from '../api-models/pmb-sub-detail-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSubDetailWorkService {

    private pmbSubDetailWorkUrl: string = `${environment.apiUrl}/pmbsubdetailworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSubDetailWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSubDetailWork[]> {
        var url = `${this.pmbSubDetailWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubDetailWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSubDetailWork(seqGpbilId : number): Observable<PmbSubDetailWork> {
        return this.httpClient.get(`${this.pmbSubDetailWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubDetailWork),
                catchError(this.sharedService.handleError))
    }

    getPmbSubDetailWorksCount(): Observable<number> {
        var url = `${this.pmbSubDetailWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqMembId(seqMembId : number): Observable<PmbSubDetailWork[]> {
        return this.httpClient.get(`${this.pmbSubDetailWorkUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubDetailWork),
                catchError(this.sharedService.handleError))
    }
    findBySeqGpbilId(seqGpbilId : number): Observable<PmbSubDetailWork[]> {
        return this.httpClient.get(`${this.pmbSubDetailWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSubDetailWork),
                catchError(this.sharedService.handleError))
    }




    createPmbSubDetailWork(pmbSubDetailWork : PmbSubDetailWork): Observable<any> {
        let body = JSON.stringify(pmbSubDetailWork);
        return this.httpClient.post(this.pmbSubDetailWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSubDetailWork(pmbSubDetailWork : PmbSubDetailWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSubDetailWork);
        return this.httpClient.put(`${this.pmbSubDetailWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSubDetailWork(pmbSubDetailWork : PmbSubDetailWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSubDetailWork);
        return this.httpClient.patch(`${this.pmbSubDetailWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSubDetailWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSubDetailWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}