/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapMembUtilHist } from '../api-models/cap-memb-util-hist.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapMembUtilHistService {

    private capMembUtilHistUrl: string = `${environment.apiUrl}/capmembutilhists`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapMembUtilHists(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapMembUtilHist[]> {
        var url = `${this.capMembUtilHistUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapMembUtilHist[]),
                catchError(this.sharedService.handleError))
    }

    getCapMembUtilHist(seqCapMembUtilHist : number): Observable<CapMembUtilHist> {
        return this.httpClient.get(`${this.capMembUtilHistUrl}/${seqCapMembUtilHist}`, {observe: 'response'})
            .pipe(map(response => response.body as CapMembUtilHist),
                catchError(this.sharedService.handleError))
    }

    getCapMembUtilHistsCount(): Observable<number> {
        var url = `${this.capMembUtilHistUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapMembUtilHist(capMembUtilHist : CapMembUtilHist): Observable<any> {
        let body = JSON.stringify(capMembUtilHist);
        return this.httpClient.post(this.capMembUtilHistUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapMembUtilHist(capMembUtilHist : CapMembUtilHist, seqCapMembUtilHist : number): Observable<any> {
        let body = JSON.stringify(capMembUtilHist);
        return this.httpClient.put(`${this.capMembUtilHistUrl}/${seqCapMembUtilHist}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapMembUtilHist(capMembUtilHist : CapMembUtilHist, seqCapMembUtilHist : number): Observable<any> {
        let body = JSON.stringify(capMembUtilHist);
        return this.httpClient.patch(`${this.capMembUtilHistUrl}/${seqCapMembUtilHist}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapMembUtilHist(seqCapMembUtilHist : number): Observable<any> {
        return this.httpClient.delete(`${this.capMembUtilHistUrl}/${seqCapMembUtilHist}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}