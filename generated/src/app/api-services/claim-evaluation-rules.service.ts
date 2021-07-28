/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimEvaluationRules } from '../api-models/claim-evaluation-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimEvaluationRulesService {

    private claimEvaluationRulesUrl: string = `${environment.apiUrl}/claimevaluationruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimEvaluationRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimEvaluationRules[]> {
        var url = `${this.claimEvaluationRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimEvaluationRules[]),
                catchError(this.sharedService.handleError))
    }

    getClaimEvaluationRules(seqCerulId : number): Observable<ClaimEvaluationRules> {
        return this.httpClient.get(`${this.claimEvaluationRulesUrl}/${seqCerulId}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimEvaluationRules),
                catchError(this.sharedService.handleError))
    }

    getClaimEvaluationRulesesCount(): Observable<number> {
        var url = `${this.claimEvaluationRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createClaimEvaluationRules(claimEvaluationRules : ClaimEvaluationRules): Observable<any> {
        let body = JSON.stringify(claimEvaluationRules);
        return this.httpClient.post(this.claimEvaluationRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimEvaluationRules(claimEvaluationRules : ClaimEvaluationRules, seqCerulId : number): Observable<any> {
        let body = JSON.stringify(claimEvaluationRules);
        return this.httpClient.put(`${this.claimEvaluationRulesUrl}/${seqCerulId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimEvaluationRules(claimEvaluationRules : ClaimEvaluationRules, seqCerulId : number): Observable<any> {
        let body = JSON.stringify(claimEvaluationRules);
        return this.httpClient.patch(`${this.claimEvaluationRulesUrl}/${seqCerulId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimEvaluationRules(seqCerulId : number): Observable<any> {
        return this.httpClient.delete(`${this.claimEvaluationRulesUrl}/${seqCerulId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}