/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantTables } from '../api-models/determinant-tables.model'
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class DeterminantTablesService {

    private determinantTablesUrl: string = `${environment.apiUrl}/determinanttableses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDeterminantTableses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DeterminantTables[]> {
        var url = `${this.determinantTablesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantTables[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantTables(keyword : string): Observable<DeterminantTables> {
        return this.httpClient.get(`${this.determinantTablesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantTables),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantTablesBySeqRuleId(seqRuleId: number){
        return this.httpClient.get(`${this.determinantTablesUrl}/${seqRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body as DeterminantTables[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantTablesesCount(): Observable<number> {
        var url = `${this.determinantTablesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createDeterminantTables(determinantTables : DeterminantTables): Observable<any> {
        let body = JSON.stringify(determinantTables);
        return this.httpClient.post(this.determinantTablesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDeterminantTables(determinantTables : DeterminantTables, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantTables);
        return this.httpClient.put(`${this.determinantTablesUrl}/${determinantTables.determinantTablesPrimaryKey.searchSequence}/${determinantTables.determinantTablesPrimaryKey.seqRuleId}/${keyword}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDeterminantTablesByPk(determinantTables : DeterminantTables, ss: any, ruleId: any, keyword: string): Observable<any> {
        let body = JSON.stringify(determinantTables);
        return this.httpClient.put(`${this.determinantTablesUrl}/${ss}/${ruleId}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    partiallyUpdateDeterminantTables(determinantTables : DeterminantTables, keyword : string): Observable<any> {
        let body = JSON.stringify(determinantTables);
        return this.httpClient.patch(`${this.determinantTablesUrl}/${keyword}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDeterminantTables(keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantTablesUrl}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDeterminantTable(searchSequence:any,seqRuleId:any,keyword : string): Observable<any> {
        return this.httpClient.delete(`${this.determinantTablesUrl}/${searchSequence}/${seqRuleId}/${keyword}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
