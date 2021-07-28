/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GeneralLedgerReference } from '../api-models/general-ledger-reference.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class GeneralLedgerReferenceService {

    private generalLedgerReferenceUrl: string = `${environment.apiUrl}/generalledgerreferences`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
        private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGeneralLedgerReferences(usePagination: boolean = false, page: number = 0, size: number = 0, sort = 'generalLedgerReferencePrimaryKey.glRefCode'): Observable<GeneralLedgerReference[]> {
        var url = `${this.generalLedgerReferenceUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}&sort=${sort}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as GeneralLedgerReference[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getGeneralLedgerReference(companyCode: string): Observable<Array<GeneralLedgerReference>> {
        return this.httpClient.get(`${this.generalLedgerReferenceUrl}/${companyCode}`, { observe: 'response' })
            .pipe(map(response => response.body as GeneralLedgerReference),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getGeneralLedgerReferencesCount(): Observable<number> {
        var url = `${this.generalLedgerReferenceUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByCompanyCode(companyCode: string): Observable<GeneralLedgerReference[]> {
        return this.httpClient.get(`${this.generalLedgerReferenceUrl}/find-by-companycode/${companyCode}`, { observe: 'response' })
            .pipe(map(response => response.body as GeneralLedgerReference),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }




    createGeneralLedgerReference(generalLedgerReference: GeneralLedgerReference): Observable<any> {
        let body = JSON.stringify(generalLedgerReference);
        return this.httpClient.post(this.generalLedgerReferenceUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    updateGeneralLedgerReference(generalLedgerReference: GeneralLedgerReference, companyCode: string): Observable<any> {
        let body = JSON.stringify(generalLedgerReference);
        return this.httpClient.put(`${this.generalLedgerReferenceUrl}/${companyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    partiallyUpdateGeneralLedgerReference(generalLedgerReference: GeneralLedgerReference, companyCode: string): Observable<any> {
        let body = JSON.stringify(generalLedgerReference);
        return this.httpClient.patch(`${this.generalLedgerReferenceUrl}/${companyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    deleteGeneralLedgerReference(companyCode: string): Observable<any> {
        return this.httpClient.delete(`${this.generalLedgerReferenceUrl}/${companyCode}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }


    findByGlRefCodeAndCompanyCode(glRefCode: any, companyCode: string): Observable<GeneralLedgerReference> {
        return this.httpClient.get(`${this.generalLedgerReferenceUrl}/${glRefCode}/${companyCode}`, { observe: 'response' })
            .pipe(map(response => response.body as GeneralLedgerReference),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }


    updateGLReference(generalLedgerReference: GeneralLedgerReference, companyCode: string): Observable<any> {
        let body = JSON.stringify(generalLedgerReference);
        return this.httpClient.put(`${this.generalLedgerReferenceUrl}/${generalLedgerReference.glRefCode}/${companyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

}
