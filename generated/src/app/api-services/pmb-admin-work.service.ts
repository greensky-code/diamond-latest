/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbAdminWork } from '../api-models/pmb-admin-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PmbAdminWorkService {

    private pmbAdminWorkUrl: string = `${environment.apiUrl}/pmbadminworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPmbAdminWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PmbAdminWork[]> {
        var url = `${this.pmbAdminWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PmbAdminWork[]),
                catchError(this.sharedService.handleError))
    }

    getPmbAdminWork(seqGpbilId : number): Observable<PmbAdminWork> {
        return this.httpClient.get(`${this.pmbAdminWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbAdminWork),
                catchError(this.sharedService.handleError))
    }

    getPmbAdminWorksCount(): Observable<number> {
        var url = `${this.pmbAdminWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGpbilId(seqGpbilId : number): Observable<PmbAdminWork[]> {
        return this.httpClient.get(`${this.pmbAdminWorkUrl}/find-by-seqgpbilid/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body as PmbAdminWork),
                catchError(this.sharedService.handleError))
    }




    createPmbAdminWork(pmbAdminWork : PmbAdminWork): Observable<any> {
        let body = JSON.stringify(pmbAdminWork);
        return this.httpClient.post(this.pmbAdminWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePmbAdminWork(pmbAdminWork : PmbAdminWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbAdminWork);
        return this.httpClient.put(`${this.pmbAdminWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePmbAdminWork(pmbAdminWork : PmbAdminWork, seqGpbilId : number): Observable<any> {
        let body = JSON.stringify(pmbAdminWork);
        return this.httpClient.patch(`${this.pmbAdminWorkUrl}/${seqGpbilId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePmbAdminWork(seqGpbilId : number): Observable<any> {
        return this.httpClient.delete(`${this.pmbAdminWorkUrl}/${seqGpbilId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}