/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from './shared.service';
import {AllTabColumns} from '../models/all-tab-columns.model';

@Injectable({
    providedIn: 'root'
})
export class AllTabColumnsService {

    private allTabColumnsUrl: string = `${environment.apiUrl}/alltabcolumnss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAllTabColumnss(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AllTabColumns[]> {
        var url = `${this.allTabColumnsUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AllTabColumns[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllTabColumns(owners : string): Observable<AllTabColumns> {
        return this.httpClient.get(`${this.allTabColumnsUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body as AllTabColumns),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllTabColumnsByOwnerAndTableName(owner, tableName): Observable<any> {
        return this.httpClient.get(`${this.allTabColumnsUrl}/${tableName}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllTabColumnssCount(): Observable<number> {
        var url = `${this.allTabColumnsUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    //Loock up

    getAllTabColumnLookUp(user :string): Observable<any> {
        var url = `${this.allTabColumnsUrl}/dropdown-lookup/${user}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }

    createAllTabColumns(allTabColumns : AllTabColumns): Observable<any> {
        let body = JSON.stringify(allTabColumns);
        return this.httpClient.post(this.allTabColumnsUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAllTabColumns(allTabColumns : AllTabColumns, owners : string): Observable<any> {
        let body = JSON.stringify(allTabColumns);
        return this.httpClient.put(`${this.allTabColumnsUrl}/${owners}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAllTabColumns(allTabColumns : AllTabColumns, owners : string): Observable<any> {
        let body = JSON.stringify(allTabColumns);
        return this.httpClient.patch(`${this.allTabColumnsUrl}/${owners}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAllTabColumns(owners : string): Observable<any> {
        return this.httpClient.delete(`${this.allTabColumnsUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
