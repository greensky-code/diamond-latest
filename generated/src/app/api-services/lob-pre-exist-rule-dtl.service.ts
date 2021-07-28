/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LobPreExistRuleDtl } from '../api-models/lob-pre-exist-rule-dtl.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class LobPreExistRuleDtlService {

    private lobPreExistRuleDtlUrl: string = `${environment.apiUrl}/lobpreexistruledtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getLobPreExistRuleDtls(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<LobPreExistRuleDtl[]> {
        var url = `${this.lobPreExistRuleDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as LobPreExistRuleDtl[]),
                catchError(this.sharedService.handleError))
    }

    getLobPreExistRuleDtl(seqLbpecId : number): Observable<LobPreExistRuleDtl> {
        return this.httpClient.get(`${this.lobPreExistRuleDtlUrl}/${seqLbpecId}`, {observe: 'response'})
            .pipe(map(response => response.body as LobPreExistRuleDtl),
                catchError(this.sharedService.handleError))
    }

    getLobPreExistRuleDtlsCount(): Observable<number> {
        var url = `${this.lobPreExistRuleDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqLbpecId(seqLbpecId : number): Observable<LobPreExistRuleDtl[]> {
        return this.httpClient.get(`${this.lobPreExistRuleDtlUrl}/find-by-seqlbpecid/${seqLbpecId}`, {observe: 'response'})
            .pipe(map(response => response.body as LobPreExistRuleDtl),
                catchError(this.sharedService.handleError))
    }




    createLobPreExistRuleDtl(lobPreExistRuleDtl : LobPreExistRuleDtl): Observable<any> {
        let body = JSON.stringify(lobPreExistRuleDtl);
        return this.httpClient.post(this.lobPreExistRuleDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateLobPreExistRuleDtl(lobPreExistRuleDtl : LobPreExistRuleDtl, seqLbpecId : number): Observable<any> {
        let body = JSON.stringify(lobPreExistRuleDtl);
        return this.httpClient.put(`${this.lobPreExistRuleDtlUrl}/${seqLbpecId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateLobPreExistRuleDtl(lobPreExistRuleDtl : LobPreExistRuleDtl, seqLbpecId : number): Observable<any> {
        let body = JSON.stringify(lobPreExistRuleDtl);
        return this.httpClient.patch(`${this.lobPreExistRuleDtlUrl}/${seqLbpecId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteLobPreExistRuleDtl(seqLbpecId : number): Observable<any> {
        return this.httpClient.delete(`${this.lobPreExistRuleDtlUrl}/${seqLbpecId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}