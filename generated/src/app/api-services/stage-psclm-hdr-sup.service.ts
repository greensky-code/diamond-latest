/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePsclmHdrSup } from '../api-models/stage-psclm-hdr-sup.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePsclmHdrSupService {

    private stagePsclmHdrSupUrl: string = `${environment.apiUrl}/stagepsclmhdrsups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePsclmHdrSups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePsclmHdrSup[]> {
        var url = `${this.stagePsclmHdrSupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmHdrSup[]),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmHdrSup(batchId : string): Observable<StagePsclmHdrSup> {
        return this.httpClient.get(`${this.stagePsclmHdrSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmHdrSup),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmHdrSupsCount(): Observable<number> {
        var url = `${this.stagePsclmHdrSupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePsclmHdrSup(stagePsclmHdrSup : StagePsclmHdrSup): Observable<any> {
        let body = JSON.stringify(stagePsclmHdrSup);
        return this.httpClient.post(this.stagePsclmHdrSupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePsclmHdrSup(stagePsclmHdrSup : StagePsclmHdrSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmHdrSup);
        return this.httpClient.put(`${this.stagePsclmHdrSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePsclmHdrSup(stagePsclmHdrSup : StagePsclmHdrSup, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmHdrSup);
        return this.httpClient.patch(`${this.stagePsclmHdrSupUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePsclmHdrSup(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePsclmHdrSupUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}