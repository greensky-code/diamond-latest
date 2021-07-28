/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReasonCodeMaster } from '../api-models/reason-code-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ReasonCodeMasterService {

    private reasonCodeMasterUrl: string = `${environment.apiUrl}/reasoncodemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getReasonCodeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ReasonCodeMaster[]> {
        var url = `${this.reasonCodeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ReasonCodeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getReasonCodeMaster(reasonCode : string): Observable<ReasonCodeMaster> {
        return this.httpClient.get(`${this.reasonCodeMasterUrl}/${reasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ReasonCodeMaster),
                catchError(this.sharedService.handleError))
    }

    getReasonCodeMastersCount(): Observable<number> {
        var url = `${this.reasonCodeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createReasonCodeMaster(reasonCodeMaster : ReasonCodeMaster): Observable<any> {
        let body = JSON.stringify(reasonCodeMaster);
        return this.httpClient.post(this.reasonCodeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateReasonCodeMaster(reasonCodeMaster : ReasonCodeMaster, reasonCode : string): Observable<any> {
        let body = JSON.stringify(reasonCodeMaster);
        return this.httpClient.put(`${this.reasonCodeMasterUrl}/${reasonCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateReasonCodeMaster(reasonCodeMaster : ReasonCodeMaster, reasonCode : string): Observable<any> {
        let body = JSON.stringify(reasonCodeMaster);
        return this.httpClient.patch(`${this.reasonCodeMasterUrl}/${reasonCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteReasonCodeMaster(reasonCode : string): Observable<any> {
        return this.httpClient.delete(`${this.reasonCodeMasterUrl}/${reasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}