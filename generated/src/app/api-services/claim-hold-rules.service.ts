/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimHoldRules } from '../api-models/claim-hold-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimHoldRulesService {

    private claimHoldRulesUrl: string = `${environment.apiUrl}/claimholdruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimHoldRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimHoldRules[]> {
        var url = `${this.claimHoldRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimHoldRules[]),
                catchError(this.sharedService.handleError))
    }

    getClaimHoldRules(seqClhldRule : number): Observable<ClaimHoldRules> {
        return this.httpClient.get(`${this.claimHoldRulesUrl}/${seqClhldRule}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimHoldRules),
                catchError(this.sharedService.handleError))
    }

    getClaimHoldRulesesCount(): Observable<number> {
        var url = `${this.claimHoldRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByReasonCode(reasonCode : string): Observable<ClaimHoldRules[]> {
        return this.httpClient.get(`${this.claimHoldRulesUrl}/find-by-reasoncode/${reasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimHoldRules),
                catchError(this.sharedService.handleError))
    }




    createClaimHoldRules(claimHoldRules : ClaimHoldRules): Observable<any> {
        let body = JSON.stringify(claimHoldRules);
        return this.httpClient.post(this.claimHoldRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimHoldRules(claimHoldRules : ClaimHoldRules, seqClhldRule : number): Observable<any> {
        let body = JSON.stringify(claimHoldRules);
        return this.httpClient.put(`${this.claimHoldRulesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimHoldRules(claimHoldRules : ClaimHoldRules, seqClhldRule : number): Observable<any> {
        let body = JSON.stringify(claimHoldRules);
        return this.httpClient.patch(`${this.claimHoldRulesUrl}/${seqClhldRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimHoldRules(seqClhldRule : number): Observable<any> {
        return this.httpClient.delete(`${this.claimHoldRulesUrl}/${seqClhldRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}