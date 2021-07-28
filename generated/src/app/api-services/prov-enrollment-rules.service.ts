/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvEnrollmentRules } from '../api-models/prov-enrollment-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvEnrollmentRulesService {

    private provEnrollmentRulesUrl: string = `${environment.apiUrl}/provenrollmentruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvEnrollmentRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvEnrollmentRules[]> {
        var url = `${this.provEnrollmentRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvEnrollmentRules[]),
                catchError(this.sharedService.handleError))
    }

    getProvEnrollmentRules(seqEnrollmentRule : number): Observable<ProvEnrollmentRules> {
        return this.httpClient.get(`${this.provEnrollmentRulesUrl}/${seqEnrollmentRule}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvEnrollmentRules),
                catchError(this.sharedService.handleError))
    }

    getProvEnrollmentRulesesCount(): Observable<number> {
        var url = `${this.provEnrollmentRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvAddress(seqProvAddress : number): Observable<ProvEnrollmentRules[]> {
        return this.httpClient.get(`${this.provEnrollmentRulesUrl}/find-by-seqprovaddress/${seqProvAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvEnrollmentRules),
                catchError(this.sharedService.handleError))
    }
    findByLineOfBusiness(lineOfBusiness : string): Observable<ProvEnrollmentRules[]> {
        return this.httpClient.get(`${this.provEnrollmentRulesUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvEnrollmentRules),
                catchError(this.sharedService.handleError))
    }




    createProvEnrollmentRules(provEnrollmentRules : ProvEnrollmentRules): Observable<any> {
        let body = JSON.stringify(provEnrollmentRules);
        return this.httpClient.post(this.provEnrollmentRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvEnrollmentRules(provEnrollmentRules : ProvEnrollmentRules, seqEnrollmentRule : number): Observable<any> {
        let body = JSON.stringify(provEnrollmentRules);
        return this.httpClient.put(`${this.provEnrollmentRulesUrl}/${seqEnrollmentRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvEnrollmentRules(provEnrollmentRules : ProvEnrollmentRules, seqEnrollmentRule : number): Observable<any> {
        let body = JSON.stringify(provEnrollmentRules);
        return this.httpClient.patch(`${this.provEnrollmentRulesUrl}/${seqEnrollmentRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvEnrollmentRules(seqEnrollmentRule : number): Observable<any> {
        return this.httpClient.delete(`${this.provEnrollmentRulesUrl}/${seqEnrollmentRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}