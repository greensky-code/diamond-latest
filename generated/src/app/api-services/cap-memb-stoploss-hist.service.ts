/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapMembStoplossHist } from '../api-models/cap-memb-stoploss-hist.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapMembStoplossHistService {

    private capMembStoplossHistUrl: string = `${environment.apiUrl}/capmembstoplosshists`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapMembStoplossHists(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapMembStoplossHist[]> {
        var url = `${this.capMembStoplossHistUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapMembStoplossHist[]),
                catchError(this.sharedService.handleError))
    }

    getCapMembStoplossHist(seqCapMemSlHist : number): Observable<CapMembStoplossHist> {
        return this.httpClient.get(`${this.capMembStoplossHistUrl}/${seqCapMemSlHist}`, {observe: 'response'})
            .pipe(map(response => response.body as CapMembStoplossHist),
                catchError(this.sharedService.handleError))
    }

    getCapMembStoplossHistsCount(): Observable<number> {
        var url = `${this.capMembStoplossHistUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCapMembStoplossHist(capMembStoplossHist : CapMembStoplossHist): Observable<any> {
        let body = JSON.stringify(capMembStoplossHist);
        return this.httpClient.post(this.capMembStoplossHistUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapMembStoplossHist(capMembStoplossHist : CapMembStoplossHist, seqCapMemSlHist : number): Observable<any> {
        let body = JSON.stringify(capMembStoplossHist);
        return this.httpClient.put(`${this.capMembStoplossHistUrl}/${seqCapMemSlHist}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapMembStoplossHist(capMembStoplossHist : CapMembStoplossHist, seqCapMemSlHist : number): Observable<any> {
        let body = JSON.stringify(capMembStoplossHist);
        return this.httpClient.patch(`${this.capMembStoplossHistUrl}/${seqCapMemSlHist}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapMembStoplossHist(seqCapMemSlHist : number): Observable<any> {
        return this.httpClient.delete(`${this.capMembStoplossHistUrl}/${seqCapMemSlHist}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}