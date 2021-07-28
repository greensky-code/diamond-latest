/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecFuncDescr} from "../../api-models/security/sec-func-descr.model";

@Injectable({
    providedIn: "root"
})
export class SecFuncDescrService {

    private secFuncDescrUrl: string = `${environment.apiUrl}/secfuncdescrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecFuncDescrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecFuncDescr[]> {
        var url = `${this.secFuncDescrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecFuncDescr[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecFuncDescr(funcId : string): Observable<SecFuncDescr> {
        return this.httpClient.get(`${this.secFuncDescrUrl}/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFuncDescr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecFuncDescrsCount(): Observable<number> {
        var url = `${this.secFuncDescrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByFuncId(funcId : string): Observable<SecFuncDescr[]> {
        return this.httpClient.get(`${this.secFuncDescrUrl}/find-by-funcid/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFuncDescr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createSecFuncDescr(secFuncDescr : SecFuncDescr): Observable<any> {
        let body = JSON.stringify(secFuncDescr);
        return this.httpClient.post(this.secFuncDescrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecFuncDescr(secFuncDescr : SecFuncDescr, funcId : string): Observable<any> {
        let body = JSON.stringify(secFuncDescr);
        return this.httpClient.put(`${this.secFuncDescrUrl}/${funcId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecFuncDescr(secFuncDescr : SecFuncDescr, funcId : string): Observable<any> {
        let body = JSON.stringify(secFuncDescr);
        return this.httpClient.patch(`${this.secFuncDescrUrl}/${funcId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecFuncDescr(funcId : string): Observable<any> {
        return this.httpClient.delete(`${this.secFuncDescrUrl}/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
