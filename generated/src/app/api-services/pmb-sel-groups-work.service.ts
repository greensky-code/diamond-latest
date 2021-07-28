/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSelGroupsWork } from '../api-models/pmb-sel-groups-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbSelGroupsWorkService {

    private pmbSelGroupsWorkUrl: string = `${environment.apiUrl}/pmbselgroupsworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbSelGroupsWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbSelGroupsWork[]> {
        var url = `${this.pmbSelGroupsWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbSelGroupsWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbSelGroupsWork(seqGpbilId : number): Observable<PmbSelGroupsWork> {
        return this.httpClient.get(`${this.pmbSelGroupsWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSelGroupsWork),
                catchError(this.sharedService.handleError))
    }

    getPmbSelGroupsWorksCount(): Observable<number> {
        var url = `${this.pmbSelGroupsWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGpbilId(seqGpbilId : number): Observable<PmbSelGroupsWork[]> {
        return this.httpClient.get(`${this.pmbSelGroupsWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSelGroupsWork),
                catchError(this.sharedService.handleError))
    }
    findBySeqGpbilId(seqGpbilId : number): Observable<PmbSelGroupsWork[]> {
        return this.httpClient.get(`${this.pmbSelGroupsWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbSelGroupsWork),
                catchError(this.sharedService.handleError))
    }




    createPmbSelGroupsWork(pmbSelGroupsWork : PmbSelGroupsWork): Observable<any> {
        let body = JSON.stringify(pmbSelGroupsWork);
        return this.httpClient.post(this.pmbSelGroupsWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbSelGroupsWork(pmbSelGroupsWork : PmbSelGroupsWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSelGroupsWork);
        return this.httpClient.put(`${this.pmbSelGroupsWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbSelGroupsWork(pmbSelGroupsWork : PmbSelGroupsWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbSelGroupsWork);
        return this.httpClient.patch(`${this.pmbSelGroupsWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbSelGroupsWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbSelGroupsWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}