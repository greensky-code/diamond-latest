/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { DddwDtl } from '../api-models/dddw-dtl.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {CONFIG} from '../core/config';

@Injectable({
    providedIn: 'root'
})
export class DddwDtlService {

    private dddwDtlUrl = `${environment.apiUrl}/dddwdtls`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDddwDtls(usePagination = false, page = 0, size = 0): Observable<DddwDtl[]> {
        let url = `${this.dddwDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDddwDtl(dwName: string): Observable<DddwDtl> {
        return this.httpClient.get(`${this.dddwDtlUrl}/${dwName}`, { observe: 'response' })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDddwDtlsCount(): Observable<number> {
        let url = `${this.dddwDtlUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createDddwDtl(dddwDtl: DddwDtl): Observable<any> {
        let body = JSON.stringify(dddwDtl);
        return this.httpClient.post(this.dddwDtlUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateDddwDtl(dddwDtl: DddwDtl, dwName: string): Observable<any> {
        let body = JSON.stringify(dddwDtl);
        return this.httpClient.put(`${this.dddwDtlUrl}/${dwName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateDddwDtl(dddwDtl: DddwDtl, dwName: string): Observable<any> {
        let body = JSON.stringify(dddwDtl);
        return this.httpClient.patch(`${this.dddwDtlUrl}/${dwName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteDddwDtl(dwName: string): Observable<any> {
        return this.httpClient.delete(`${this.dddwDtlUrl}/${dwName}`, { observe: 'response' })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitPackageFilterType(): Observable<any> {
        return this.httpClient.get(`${this.dddwDtlUrl}/benefitValueFilterType`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitPackageOperator(): Observable<any> {
        return this.httpClient.get(`${this.dddwDtlUrl}/benefitValueOperator`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getDeterminantRuleActions(): Observable<any> {
        return this.httpClient.get(`${this.dddwDtlUrl}/determinantRuleActions`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }


    findByColumnNameAndDwname(columnName: string, dwName: string): Observable<any> {
        return this.httpClient.get(`${this.dddwDtlUrl}/${columnName}/${dwName}`, { observe: 'response' })
            .pipe(map(response => response.body as DddwDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findPcpJobSetupStatus(columnName: string, dwName: string): Observable<any> {
        return this.httpClient.get(`${this.dddwDtlUrl}/${columnName}/${dwName}/0`, { observe: 'response' })
            .pipe(map(response => response.body as DddwDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByColumnNameAndDwnameAndLanguageId(columnName: string, dwName: string, languageId: number): Observable<any> {
        return this.httpClient.get(`${this.dddwDtlUrl}/${columnName}/${dwName}/${languageId}`, { observe: 'response' })
            .pipe(map(response => response.body as DddwDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findActionStatusTypes(columnName: string, dwName: string, languageId: number): Observable<any> {
        return this.httpClient.get(`${this.dddwDtlUrl}/findActionStatusTypes/${columnName}/${dwName}/${languageId}`, { observe: 'response' })
            .pipe(map(response => response.body as DddwDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
