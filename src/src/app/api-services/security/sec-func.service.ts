/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecFunc} from "../../api-models/security/sec-func.model";

@Injectable({
    providedIn: "root"
})
export class SecFuncService {

    private secFuncUrl: string = `${environment.apiUrl}/secfuncs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecFuncs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecFunc[]> {
        var url = `${this.secFuncUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecFunc(userId : string): Observable<SecFunc> {
        return this.httpClient.get(`${this.secFuncUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecFuncsCount(): Observable<number> {
        var url = `${this.secFuncUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByUserId(userId : string): Observable<SecFunc[]> {
        return this.httpClient.get(`${this.secFuncUrl}/find-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByFuncId(funcId : string): Observable<SecFunc[]> {
        return this.httpClient.get(`${this.secFuncUrl}/find-by-funcid/${funcId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createSecFunc(secFunc : SecFunc): Observable<any> {
        let body = JSON.stringify(secFunc);
        return this.httpClient.post(this.secFuncUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecFunc(secFunc : SecFunc, userId : string): Observable<any> {
        let body = JSON.stringify(secFunc);
        return this.httpClient.put(`${this.secFuncUrl}/${userId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecFunc(secFunc : SecFunc, userId : string): Observable<any> {
        let body = JSON.stringify(secFunc);
        return this.httpClient.patch(`${this.secFuncUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecFunc(userId : string): Observable<any> {
        return this.httpClient.delete(`${this.secFuncUrl}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getFuncIdsByUserIdAndTemplateid(templateId : string,userId:string): Observable<string[]> {
        return this.httpClient.get(`${this.secFuncUrl}/getfunctions/${templateId}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findFuncByUserId(userId : string): Observable<SecFunc[]> {
        return this.httpClient.get(`${this.secFuncUrl}/findsec-func-by-userid/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecFunc),
                catchError(this.sharedService.handleError))
    }


    addUpdateSecFunsDetail(secFuncs: SecFunc[]): Observable<any> {
        let body = JSON.stringify(secFuncs);
        const url = `${this.secFuncUrl}/update`
        return this.httpClient.post(url, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))


    }

}

