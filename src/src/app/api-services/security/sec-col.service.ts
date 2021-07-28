/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecCol} from "../../api-models/security/sec-col.model";

@Injectable({
    providedIn: "root"
})
export class SecColService {

    private secColUrl: string = `${environment.apiUrl}/seccols`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecCols(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecCol[]> {
        var url = `${this.secColUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecCol[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecCol(userId : string): Observable<SecCol> {
        return this.httpClient.get(`${this.secColUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecCol),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecColsCount(): Observable<number> {
        var url = `${this.secColUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByUserId(userId : string): Observable<SecCol[]> {
        return this.httpClient.get(`${this.secColUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecCol),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createSecCol(secCol : SecCol): Observable<any> {
        let body = JSON.stringify(secCol);
        return this.httpClient.post(this.secColUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecCol(secCol : SecCol, userId : string): Observable<any> {
        let body = JSON.stringify(secCol);
        return this.httpClient.put(`${this.secColUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecCol(secCol : SecCol, userId : string): Observable<any> {
        let body = JSON.stringify(secCol);
        return this.httpClient.patch(`${this.secColUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecCol(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secColUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
