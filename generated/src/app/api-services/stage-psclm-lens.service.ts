/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { StagePsclmLens } from '../api-models/stage-psclm-lens.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StagePsclmLensService {

    private stagePsclmLensUrl: string = `${environment.apiUrl}/stagepsclmlenss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getStagePsclmLenss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<StagePsclmLens[]> {
        var url = `${this.stagePsclmLensUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmLens[]),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmLens(batchId : string): Observable<StagePsclmLens> {
        return this.httpClient.get(`${this.stagePsclmLensUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body as StagePsclmLens),
                catchError(this.sharedService.handleError))
    }

    getStagePsclmLenssCount(): Observable<number> {
        var url = `${this.stagePsclmLensUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createStagePsclmLens(stagePsclmLens : StagePsclmLens): Observable<any> {
        let body = JSON.stringify(stagePsclmLens);
        return this.httpClient.post(this.stagePsclmLensUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateStagePsclmLens(stagePsclmLens : StagePsclmLens, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmLens);
        return this.httpClient.put(`${this.stagePsclmLensUrl}/${batchId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateStagePsclmLens(stagePsclmLens : StagePsclmLens, batchId : string): Observable<any> {
        let body = JSON.stringify(stagePsclmLens);
        return this.httpClient.patch(`${this.stagePsclmLensUrl}/${batchId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteStagePsclmLens(batchId : string): Observable<any> {
        return this.httpClient.delete(`${this.stagePsclmLensUrl}/${batchId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}