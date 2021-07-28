/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DeterminantRules } from '../api-models/determinant-rules'
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { DeterminantRulesModel } from '../api-models';

@Injectable({
    providedIn: "root"
})
export class DeterminantRulesService {

    private determinantRulesUrl: string = `${environment.apiUrl}/determinantruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantRules[]> {
        var url = `${this.determinantRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantRules[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantRulesListByRuleIdAndKeyword(ruleId : string,keyword : string): Observable<DeterminantRules[]> {
        return this.httpClient.get(`${this.determinantRulesUrl}/list/find-by-rule-id/${ruleId}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantRules[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantRules(keyword: string): Observable<DeterminantRules[]> {
        return this.httpClient.get(`${this.determinantRulesUrl}/${keyword}?use-pagination=false&page=0&size=0`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantRules[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantRulesByRuleId(ruleId : string,keyword : string): Observable<DeterminantRules> {
        return this.httpClient.get(`${this.determinantRulesUrl}/find-by-rule-id/${ruleId}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantRules),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantRulesBySeqIdKeyword(seqRuleId: number, keyword : string): Observable<DeterminantRules> {
        return this.httpClient.get(`${this.determinantRulesUrl}/${seqRuleId}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantRules),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantRulesesCount(): Observable<number> {
        var url = `${this.determinantRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createDeterminantRules(determinantRules : DeterminantRules): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.post(this.determinantRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     *
     * @param determinantRulesModal
     */
    createDeterminantRulesForADRUL(determinantRules : DeterminantRulesModel): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.post(this.determinantRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDeterminantRules(determinantRules : DeterminantRules, seqRuleId: number, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.put(`${this.determinantRulesUrl}/${seqRuleId}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     *
     * @param determinantRulesModel
     * @param seqRuleId
     * @param keyword
     */
    updateDeterminantRulesForADRUL(determinantRules : DeterminantRulesModel, seqRuleId: number, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.put(`${this.determinantRulesUrl}/${seqRuleId}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateDeterminantRules(determinantRules : DeterminantRules, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantRules);
        return this.httpClient.patch(`${this.determinantRulesUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDeterminantRules(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantRulesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDeterminantRulesBySeqRuleIdAndKeyword(seqRuleId:any,keyword : any): Observable<any> {
        return this.httpClient.delete(`${this.determinantRulesUrl}/${seqRuleId}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    };

}
