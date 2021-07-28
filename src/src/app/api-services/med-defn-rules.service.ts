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

@Injectable({
    providedIn: "root"
})
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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getMedDefnRules(claimType : string): Observable<MedDefnRules> {
        return this.httpClient.get(`${this.medDefnRulesUrl}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body as MedDefnRules),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    

    getMedDefnRulesByPrimary(claimType: string, medDefOrder: string, medDefCode: string, searchSequence:string): Observable<MedDefnRules> {
        return this.httpClient.get(`${this.medDefnRulesUrl}/${searchSequence}/${medDefCode}/${medDefOrder}/${claimType}`, { observe: 'response' })
            .pipe(map(response => response.body as MedDefnRules),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllowMedDefStateFieldStatus(detrmTable: string, detrm: string): Observable<string> {
        return this.httpClient.get(`${this.medDefnRulesUrl}/get-allowed-med-rules/${detrmTable}/${detrm}`, { observe: 'response' })
            .pipe(map(response => response.body as string),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                }))
    }


    UpdateMedDefnRulesByPrimary(medDefnRules: MedDefnRules,claimType: string, medDefOrder: string, medDefCode: string, searchSequence: string): Observable<MedDefnRules> {
        let body = JSON.stringify(medDefnRules);
        return this.httpClient.put(`${this.medDefnRulesUrl}/${searchSequence}/${medDefCode}/${medDefOrder}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    getMedDefnRulesesCount(): Observable<number> {
        var url = `${this.medDefnRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createMedDefnRules(medDefnRules : MedDefnRules): Observable<any> {
        let body = JSON.stringify(medDefnRules);
        return this.httpClient.post(this.medDefnRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateMedDefnRules(medDefnRules : MedDefnRules, claimType : string): Observable<any> {
        let body = JSON.stringify(medDefnRules);
        return this.httpClient.put(`${this.medDefnRulesUrl}/${claimType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateMedDefnRules(medDefnRules : MedDefnRules, claimType : string): Observable<any> {
        let body = JSON.stringify(medDefnRules);
        return this.httpClient.patch(`${this.medDefnRulesUrl}/${claimType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteMedDefnRules(searchSequence: string, medDefCode: string, medDefOrder: string, claimType: string): Observable<any> {
        return this.httpClient.delete(`${this.medDefnRulesUrl}/${searchSequence}/${medDefCode}/${medDefOrder}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByMedDefOrder(value: any): Observable<any> {
        return this.httpClient.get(`${this.medDefnRulesUrl}/medDefOrder/${value}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
