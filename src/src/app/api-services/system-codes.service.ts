/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SystemCodes} from '../api-models/system-codes.model'
import {environment} from '../../environments/environment'
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class SystemCodesService {

    private systemCodesUrl: string = `${environment.apiUrl}/systemcodeses`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSystemCodeses(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<SystemCodes[]> {
        var url = `${this.systemCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCodes(systemCode: string): Observable<SystemCodes> {
        return this.httpClient.get(`${this.systemCodesUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCodesByLangAndtype(systemCode: string, languageID: string): Observable<SystemCodes[]> {
        return this.httpClient.get(`${this.systemCodesUrl}/find-by-code-language/${systemCode}/${languageID}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCodesByLang(languageID: number): Observable<SystemCodes[]> {
        return this.httpClient.get(`${this.systemCodesUrl}/find-all-sc-by-languageId/${languageID}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     *findBy-SystemCodeType-And-SystemCodeActive
     * @param systemCodeType
     * @param systemCodeActive
     */

    findBySystemCodeTypeAndSystemCodeActive(systemCodeType: string, systemCodeActive: string): Observable<SystemCodes[]> {
        return this.httpClient.get(`${this.systemCodesUrl}/findBy-SystemCodeType-And-SystemCodeActive/${systemCodeType}/${systemCodeActive}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSystemCodesesCount(): Observable<number> {
        var url = `${this.systemCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySystemCodeTypeAndSystemCodeActiveAndLanguageId(systemCodeType: string, systemCodeActive: string, languageId: number): Observable<SystemCodes> {
        return this.httpClient.get(`${this.systemCodesUrl}/find-by-systemCodeType/${systemCodeType}/systemCodeActive/${systemCodeActive}/languageId/${languageId}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes),
                catchError(this.sharedService.handleError))
    }

    findBySystemCodeTypeAndSystemCodeActiveAndLanguageIdState(systemCodeType: string, systemCodeActive: string, languageId: number) {
        return this.httpClient.get(`${this.systemCodesUrl}/find-by-systemCodeType/${systemCodeType}/systemCodeActive/${systemCodeActive}/languageId/${languageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }

    findBySystemCodeAndSystemCodeTypeAndSystemCodeActiveAndLanguageId(systemCode: number, systemCodeType: string, systemCodeActive: string, languageId: number): Observable<SystemCodes> {
        return this.httpClient.get(`${this.systemCodesUrl}/find-by-systemCode/${systemCode}/systemCodeType/${systemCodeType}/systemCodeActive/${systemCodeActive}/languageId/${languageId}`, {observe: 'response'})
            .pipe(map(response => response.body as SystemCodes),
                catchError(this.sharedService.handleError))
    }

    createSystemCodes(systemCodes : SystemCodes): Observable<any> {
        let body = JSON.stringify(systemCodes);
        return this.httpClient.post(this.systemCodesUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSystemCodes(systemCodes: SystemCodes, systemCode: string): Observable<any> {
        let body = JSON.stringify(systemCodes);
        return this.httpClient.put(`${this.systemCodesUrl}/${systemCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSystemCodes(systemCodes: SystemCodes, systemCode: string): Observable<any> {
        let body = JSON.stringify(systemCodes);
        return this.httpClient.patch(`${this.systemCodesUrl}/${systemCode}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSystemCodes(systemCode: string): Observable<any> {
        return this.httpClient.delete(`${this.systemCodesUrl}/${systemCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getTplCodes(){
        return this.httpClient.get(`${this.systemCodesUrl}/find-by-code-language/TPLCODE/0` ,  {observe: 'response'})
        .pipe(map(response => response.body  as SystemCodes[] ),
            catchError(this.sharedService.handleError))
    }

    getCertTypes(){
        return this.httpClient.get(`${this.systemCodesUrl}/find-by-code-language/AUTH_CERT_TYPE/0` ,  {observe: 'response'})
        .pipe(map(response => response.body  as SystemCodes[] ),
            catchError(this.sharedService.handleError))
    }
}
