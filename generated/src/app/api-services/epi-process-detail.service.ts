/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EpiProcessDetail } from '../api-models/epi-process-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EpiProcessDetailService {

    private epiProcessDetailUrl: string = `${environment.apiUrl}/epiprocessdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getEpiProcessDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<EpiProcessDetail[]> {
        var url = `${this.epiProcessDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessDetail[]),
                catchError(this.sharedService.handleError))
    }

    getEpiProcessDetail(seqSessionId : number): Observable<EpiProcessDetail> {
        return this.httpClient.get(`${this.epiProcessDetailUrl}/${seqSessionId}`, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessDetail),
                catchError(this.sharedService.handleError))
    }

    getEpiProcessDetailsCount(): Observable<number> {
        var url = `${this.epiProcessDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProcessId(seqProcessId : number): Observable<EpiProcessDetail[]> {
        return this.httpClient.get(`${this.epiProcessDetailUrl}/find-by-seqprocessid/${seqProcessId}`, {observe: 'response'})
            .pipe(map(response => response.body as EpiProcessDetail),
                catchError(this.sharedService.handleError))
    }




    createEpiProcessDetail(epiProcessDetail : EpiProcessDetail): Observable<any> {
        let body = JSON.stringify(epiProcessDetail);
        return this.httpClient.post(this.epiProcessDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateEpiProcessDetail(epiProcessDetail : EpiProcessDetail, seqSessionId : number): Observable<any> {
        let body = JSON.stringify(epiProcessDetail);
        return this.httpClient.put(`${this.epiProcessDetailUrl}/${seqSessionId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateEpiProcessDetail(epiProcessDetail : EpiProcessDetail, seqSessionId : number): Observable<any> {
        let body = JSON.stringify(epiProcessDetail);
        return this.httpClient.patch(`${this.epiProcessDetailUrl}/${seqSessionId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteEpiProcessDetail(seqSessionId : number): Observable<any> {
        return this.httpClient.delete(`${this.epiProcessDetailUrl}/${seqSessionId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}