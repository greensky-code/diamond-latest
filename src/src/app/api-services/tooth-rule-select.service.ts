/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ToothRuleSelect } from '../api-models/tooth-rule-select.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ToothRuleSelectService {

    private toothRuleSelectUrl: string = `${environment.apiUrl}/toothruleselects`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getToothRuleSelects(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ToothRuleSelect[]> {
        var url = `${this.toothRuleSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ToothRuleSelect[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getToothRuleSelect(seqToothRuleId : number): Observable<ToothRuleSelect> {
        return this.httpClient.get(`${this.toothRuleSelectUrl}/${seqToothRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body as ToothRuleSelect),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getToothRuleSelectsCount(): Observable<number> {
        var url = `${this.toothRuleSelectUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createToothRuleSelect(toothRuleSelect : ToothRuleSelect): Observable<any> {
        let body = JSON.stringify(toothRuleSelect);
        return this.httpClient.post(this.toothRuleSelectUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateToothRuleSelect(toothRuleSelect : ToothRuleSelect, seqToothRuleId : number): Observable<any> {
        let body = JSON.stringify(toothRuleSelect);
        return this.httpClient.put(`${this.toothRuleSelectUrl}/${seqToothRuleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateToothRuleSelect(toothRuleSelect : ToothRuleSelect, seqToothRuleId : number): Observable<any> {
        let body = JSON.stringify(toothRuleSelect);
        return this.httpClient.patch(`${this.toothRuleSelectUrl}/${seqToothRuleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteToothRuleSelect(seqToothRuleId : number): Observable<any> {
        return this.httpClient.delete(`${this.toothRuleSelectUrl}/${seqToothRuleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
