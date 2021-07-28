/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StageInstHdr } from '../api-models/stage-inst-hdr.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StageInstHdrService {

    private stageInstHdrUrl: string = `${environment.apiUrl}/stageinsthdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStageInstHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StageInstHdr[]> {
        var url = `${this.stageInstHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StageInstHdr[]),
                catchError(this.sharedService.handleError))
    }

    getStageInstHdr(batchId : string): Observable<StageInstHdr> {
        return this.httpClient.get(`${this.stageInstHdrUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StageInstHdr),
                catchError(this.sharedService.handleError))
    }

    getStageInstHdrsCount(): Observable<number> {
        var url = `${this.stageInstHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStageInstHdr(stageInstHdr : StageInstHdr): Observable<any> {
        let body = JSON.stringify(stageInstHdr);
        return this.httpClient.post(this.stageInstHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStageInstHdr(stageInstHdr : StageInstHdr, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstHdr);
        return this.httpClient.put(`${this.stageInstHdrUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStageInstHdr(stageInstHdr : StageInstHdr, batchId : string): Observable<any> {
        let body = JSON.stringify(stageInstHdr);
        return this.httpClient.patch(`${this.stageInstHdrUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStageInstHdr(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stageInstHdrUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}