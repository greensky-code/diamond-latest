/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnRules } from '../api-models/med-defn-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MedDefnRulesService {

    private medDefnRulesUrl: string = `${environment.apiUrl}/meddefnruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getMedDefnRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<MedDefnRules[]> {
        var url = `${this.medDefnRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnRules[]),
                catchError(this.sharedService.handleError))
    }

    getMedDefnRules(claimType : string): Observable<MedDefnRules> {
        return this.httpClient.get(`${this.medDefnRulesUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnRules),
                catchError(this.sharedService.handleError))
    }

    getMedDefnRulesesCount(): Observable<number> {
        var url = `${this.medDefnRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createMedDefnRules(medDefnRules : MedDefnRules): Observable<any> {
        let body = JSON.stringify(medDefnRules);
        return this.httpClient.post(this.medDefnRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateMedDefnRules(medDefnRules : MedDefnRules, claimType : string): Observable<any> {
        let body = JSON.stringify(medDefnRules);
        return this.httpClient.put(`${this.medDefnRulesUrl}/${claimType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateMedDefnRules(medDefnRules : MedDefnRules, claimType : string): Observable<any> {
        let body = JSON.stringify(medDefnRules);
        return this.httpClient.patch(`${this.medDefnRulesUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteMedDefnRules(claimType : string): Observable<any> {
        return this.httpClient.delete(`${this.medDefnRulesUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}