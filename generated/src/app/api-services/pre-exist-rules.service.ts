/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PreExistRules } from '../api-models/pre-exist-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PreExistRulesService {

    private preExistRulesUrl: string = `${environment.apiUrl}/preexistruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPreExistRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PreExistRules[]> {
        var url = `${this.preExistRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PreExistRules[]),
                catchError(this.sharedService.handleError))
    }

    getPreExistRules(seqPecId : number): Observable<PreExistRules> {
        return this.httpClient.get(`${this.preExistRulesUrl}/${seqPecId}`, {observe: 'response'})
            .pipe(map(response => response.body as PreExistRules),
                catchError(this.sharedService.handleError))
    }

    getPreExistRulesesCount(): Observable<number> {
        var url = `${this.preExistRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createPreExistRules(preExistRules : PreExistRules): Observable<any> {
        let body = JSON.stringify(preExistRules);
        return this.httpClient.post(this.preExistRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePreExistRules(preExistRules : PreExistRules, seqPecId : number): Observable<any> {
        let body = JSON.stringify(preExistRules);
        return this.httpClient.put(`${this.preExistRulesUrl}/${seqPecId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePreExistRules(preExistRules : PreExistRules, seqPecId : number): Observable<any> {
        let body = JSON.stringify(preExistRules);
        return this.httpClient.patch(`${this.preExistRulesUrl}/${seqPecId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePreExistRules(seqPecId : number): Observable<any> {
        return this.httpClient.delete(`${this.preExistRulesUrl}/${seqPecId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}