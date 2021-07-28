/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapTransDtlQltyIncent } from '../api-models/cap-trans-dtl-qlty-incent.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CapTransDtlQltyIncentService {

    private capTransDtlQltyIncentUrl: string = `${environment.apiUrl}/captransdtlqltyincents`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapTransDtlQltyIncents(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapTransDtlQltyIncent[]> {
        var url = `${this.capTransDtlQltyIncentUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapTransDtlQltyIncent[]),
                catchError(this.sharedService.handleError))
    }

    getCapTransDtlQltyIncent(seqCapTransDtlQltyIncent : number): Observable<CapTransDtlQltyIncent> {
        return this.httpClient.get(`${this.capTransDtlQltyIncentUrl}/${seqCapTransDtlQltyIncent}`, {observe: 'response'})
            .pipe(map(response => response.body as CapTransDtlQltyIncent),
                catchError(this.sharedService.handleError))
    }

    getCapTransDtlQltyIncentsCount(): Observable<number> {
        var url = `${this.capTransDtlQltyIncentUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqQualityPgm(seqQualityPgm : number): Observable<CapTransDtlQltyIncent[]> {
        return this.httpClient.get(`${this.capTransDtlQltyIncentUrl}/find-by-seqqualitypgm/${seqQualityPgm}`, {observe: 'response'})
            .pipe(map(response => response.body as CapTransDtlQltyIncent),
                catchError(this.sharedService.handleError))
    }
    findBySeqIncentiveRule(seqIncentiveRule : number): Observable<CapTransDtlQltyIncent[]> {
        return this.httpClient.get(`${this.capTransDtlQltyIncentUrl}/find-by-seqincentiverule/${seqIncentiveRule}`, {observe: 'response'})
            .pipe(map(response => response.body as CapTransDtlQltyIncent),
                catchError(this.sharedService.handleError))
    }




    createCapTransDtlQltyIncent(capTransDtlQltyIncent : CapTransDtlQltyIncent): Observable<any> {
        let body = JSON.stringify(capTransDtlQltyIncent);
        return this.httpClient.post(this.capTransDtlQltyIncentUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCapTransDtlQltyIncent(capTransDtlQltyIncent : CapTransDtlQltyIncent, seqCapTransDtlQltyIncent : number): Observable<any> {
        let body = JSON.stringify(capTransDtlQltyIncent);
        return this.httpClient.put(`${this.capTransDtlQltyIncentUrl}/${seqCapTransDtlQltyIncent}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCapTransDtlQltyIncent(capTransDtlQltyIncent : CapTransDtlQltyIncent, seqCapTransDtlQltyIncent : number): Observable<any> {
        let body = JSON.stringify(capTransDtlQltyIncent);
        return this.httpClient.patch(`${this.capTransDtlQltyIncentUrl}/${seqCapTransDtlQltyIncent}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCapTransDtlQltyIncent(seqCapTransDtlQltyIncent : number): Observable<any> {
        return this.httpClient.delete(`${this.capTransDtlQltyIncentUrl}/${seqCapTransDtlQltyIncent}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}