/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GeneralLedgerAssign } from '../api-models/general-ledger-assign.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GeneralLedgerAssignService {

    private generalLedgerAssignUrl: string = `${environment.apiUrl}/generalledgerassigns`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGeneralLedgerAssigns(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GeneralLedgerAssign[]> {
        var url = `${this.generalLedgerAssignUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GeneralLedgerAssign[]),
                catchError(this.sharedService.handleError))
    }

    getGeneralLedgerAssign(seqGlAssign : number): Observable<GeneralLedgerAssign> {
        return this.httpClient.get(`${this.generalLedgerAssignUrl}/${seqGlAssign}`, {observe: 'response'})
            .pipe(map(response => response.body as GeneralLedgerAssign),
                catchError(this.sharedService.handleError))
    }

    getGeneralLedgerAssignsCount(): Observable<number> {
        var url = `${this.generalLedgerAssignUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCompanyCode(companyCode : string): Observable<GeneralLedgerAssign[]> {
        return this.httpClient.get(`${this.generalLedgerAssignUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as GeneralLedgerAssign),
                catchError(this.sharedService.handleError))
    }




    createGeneralLedgerAssign(generalLedgerAssign : GeneralLedgerAssign): Observable<any> {
        let body = JSON.stringify(generalLedgerAssign);
        return this.httpClient.post(this.generalLedgerAssignUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGeneralLedgerAssign(generalLedgerAssign : GeneralLedgerAssign, seqGlAssign : number): Observable<any> {
        let body = JSON.stringify(generalLedgerAssign);
        return this.httpClient.put(`${this.generalLedgerAssignUrl}/${seqGlAssign}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGeneralLedgerAssign(generalLedgerAssign : GeneralLedgerAssign, seqGlAssign : number): Observable<any> {
        let body = JSON.stringify(generalLedgerAssign);
        return this.httpClient.patch(`${this.generalLedgerAssignUrl}/${seqGlAssign}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGeneralLedgerAssign(seqGlAssign : number): Observable<any> {
        return this.httpClient.delete(`${this.generalLedgerAssignUrl}/${seqGlAssign}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}