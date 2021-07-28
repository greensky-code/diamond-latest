/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSnapWork } from '../api-models/pmb-snap-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSnapWorkService {

    private pmbSnapWorkUrl: string = `${environment.apiUrl}/pmbsnapworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSnapWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSnapWork[]> {
        var url = `${this.pmbSnapWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSnapWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSnapWork(seqGpbilId : number): Observable<PmbSnapWork> {
        return this.httpClient.get(`${this.pmbSnapWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSnapWork),
                catchError(this.sharedService.handleError))
    }

    getPmbSnapWorksCount(): Observable<number> {
        var url = `${this.pmbSnapWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGpbilId(seqGpbilId : number): Observable<PmbSnapWork[]> {
        return this.httpClient.get(`${this.pmbSnapWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSnapWork),
                catchError(this.sharedService.handleError))
    }
    findBySeqGpbilId(seqGpbilId : number): Observable<PmbSnapWork[]> {
        return this.httpClient.get(`${this.pmbSnapWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSnapWork),
                catchError(this.sharedService.handleError))
    }




    createPmbSnapWork(pmbSnapWork : PmbSnapWork): Observable<any> {
        let body = JSON.stringify(pmbSnapWork);
        return this.httpClient.post(this.pmbSnapWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSnapWork(pmbSnapWork : PmbSnapWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSnapWork);
        return this.httpClient.put(`${this.pmbSnapWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSnapWork(pmbSnapWork : PmbSnapWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSnapWork);
        return this.httpClient.patch(`${this.pmbSnapWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSnapWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSnapWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}