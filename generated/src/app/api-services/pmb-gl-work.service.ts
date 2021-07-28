/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbGlWork } from '../api-models/pmb-gl-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbGlWorkService {

    private pmbGlWorkUrl: string = `${environment.apiUrl}/pmbglworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbGlWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbGlWork[]> {
        var url = `${this.pmbGlWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbGlWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbGlWork(seqGpbilId : number): Observable<PmbGlWork> {
        return this.httpClient.get(`${this.pmbGlWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbGlWork),
                catchError(this.sharedService.handleError))
    }

    getPmbGlWorksCount(): Observable<number> {
        var url = `${this.pmbGlWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGpbilId(seqGpbilId : number): Observable<PmbGlWork[]> {
        return this.httpClient.get(`${this.pmbGlWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbGlWork),
                catchError(this.sharedService.handleError))
    }




    createPmbGlWork(pmbGlWork : PmbGlWork): Observable<any> {
        let body = JSON.stringify(pmbGlWork);
        return this.httpClient.post(this.pmbGlWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbGlWork(pmbGlWork : PmbGlWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbGlWork);
        return this.httpClient.put(`${this.pmbGlWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbGlWork(pmbGlWork : PmbGlWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbGlWork);
        return this.httpClient.patch(`${this.pmbGlWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbGlWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbGlWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}