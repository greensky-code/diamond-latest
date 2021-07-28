/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ManualCheckSelectWork } from '../api-models/manual-check-select-work.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ManualCheckSelectWorkService {

    private manualCheckSelectWorkUrl: string = `${environment.apiUrl}/manualcheckselectworks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getManualCheckSelectWorks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ManualCheckSelectWork[]> {
        var url = `${this.manualCheckSelectWorkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ManualCheckSelectWork[]),
                catchError(this.sharedService.handleError))
    }

    getManualCheckSelectWork(seqCkprtId : number): Observable<ManualCheckSelectWork> {
        return this.httpClient.get(`${this.manualCheckSelectWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as ManualCheckSelectWork),
                catchError(this.sharedService.handleError))
    }

    getManualCheckSelectWorksCount(): Observable<number> {
        var url = `${this.manualCheckSelectWorkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProviderId(seqProviderId : number): Observable<ManualCheckSelectWork[]> {
        return this.httpClient.get(`${this.manualCheckSelectWorkUrl}/find-by-seqproviderid/${seqProviderId}`, {observe: 'response'})
            .pipe(map(response => response.body as ManualCheckSelectWork),
                catchError(this.sharedService.handleError))
    }
    findBySeqMemberId(seqMemberId : number): Observable<ManualCheckSelectWork[]> {
        return this.httpClient.get(`${this.manualCheckSelectWorkUrl}/find-by-seqmemberid/${seqMemberId}`, {observe: 'response'})
            .pipe(map(response => response.body as ManualCheckSelectWork),
                catchError(this.sharedService.handleError))
    }




    createManualCheckSelectWork(manualCheckSelectWork : ManualCheckSelectWork): Observable<any> {
        let body = JSON.stringify(manualCheckSelectWork);
        return this.httpClient.post(this.manualCheckSelectWorkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateManualCheckSelectWork(manualCheckSelectWork : ManualCheckSelectWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(manualCheckSelectWork);
        return this.httpClient.put(`${this.manualCheckSelectWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateManualCheckSelectWork(manualCheckSelectWork : ManualCheckSelectWork, seqCkprtId : number): Observable<any> {
        let body = JSON.stringify(manualCheckSelectWork);
        return this.httpClient.patch(`${this.manualCheckSelectWorkUrl}/${seqCkprtId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteManualCheckSelectWork(seqCkprtId : number): Observable<any> {
        return this.httpClient.delete(`${this.manualCheckSelectWorkUrl}/${seqCkprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}