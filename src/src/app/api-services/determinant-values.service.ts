/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantValues } from '../api-models/determinant-values.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class DeterminantValuesService {

    private determinantValuesUrl: string = `${environment.apiUrl}/determinantvalueses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantValueses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantValues[]> {
        var url = `${this.determinantValuesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantValues[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantValues(keyword : string): Observable<DeterminantValues> {
        return this.httpClient.get(`${this.determinantValuesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantValues),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    


    getDeterminantValuesByRuleIdAndSearchSeq(ruleId: number, searchSeq: number): Observable<DeterminantValues[]> {
        return this.httpClient.get(`${this.determinantValuesUrl}/${ruleId}/${searchSeq}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantValues[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    getDeterminantValuesesCount(): Observable<number> {
        var url = `${this.determinantValuesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createDeterminantValues(determinantValues : DeterminantValues): Observable<any> {
        let body = JSON.stringify(determinantValues);
        return this.httpClient.post(this.determinantValuesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDeterminantValues(determinantValues : DeterminantValues, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantValues);
        return this.httpClient.put(`${this.determinantValuesUrl}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateDeterminantValues(determinantValues : DeterminantValues, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantValues);
        return this.httpClient.patch(`${this.determinantValuesUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDeterminantValues(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantValuesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDeterminantValuesDynamicForms(apiRecords: DeterminantValues[]) {
        let body = JSON.stringify(apiRecords);
        return this.httpClient.post(`${this.determinantValuesUrl}/updateDeterminantsValues`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error) => {
                    return this.sharedService.handleError(error)
                }))
    }


    deleteDeterminantValue(determinantSequence:any,searchSequence:any,seqRuleId:any,keyword:any): Observable<any> {
        return this.httpClient.delete(`${this.determinantValuesUrl}/${determinantSequence}/${searchSequence}/${seqRuleId}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
