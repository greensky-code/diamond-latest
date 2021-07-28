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
import {AllTable} from '../models/all-table.model';

@Injectable({
    providedIn: 'root'
})
export class AllTableService {

    private allTableUrl: string = `${environment.apiUrl}/alltables`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAllTables(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AllTable[]> {
        var url = `${this.allTableUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AllTable[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllTable(owners : string): Observable<AllTable> {
        return this.httpClient.get(`${this.allTableUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body as AllTable),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllTablesCount(): Observable<number> {
        var url = `${this.allTableUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createAllTable(allTable : AllTable): Observable<any> {
        let body = JSON.stringify(allTable);
        return this.httpClient.post(this.allTableUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAllTable(allTable : AllTable, owners : string): Observable<any> {
        let body = JSON.stringify(allTable);
        return this.httpClient.put(`${this.allTableUrl}/${owners}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAllTable(allTable : AllTable, owners : string): Observable<any> {
        let body = JSON.stringify(allTable);
        return this.httpClient.patch(`${this.allTableUrl}/${owners}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAllTable(owners : string): Observable<any> {
        return this.httpClient.delete(`${this.allTableUrl}/${owners}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllTableLookUp(owner : string): Observable<any> {
        return this.httpClient.get(`${this.allTableUrl}/dropdown-lookup/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }


    getMedicalDefinitionDetermTableLookUp(owner : string): Observable<any> {
        return this.httpClient.get(`${this.allTableUrl}/medical-definition-determ-table-lookup/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }

    getMedicalDefinitionDetermTableByOwnerAndClaimType(owner : string, claimType:string): Observable<any> {
        return this.httpClient.get(`${this.allTableUrl}/medical-definition-determ-table-lookup/${owner}/${claimType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
