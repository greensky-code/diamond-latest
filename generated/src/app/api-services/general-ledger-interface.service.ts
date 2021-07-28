/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GeneralLedgerInterface } from '../api-models/general-ledger-interface.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GeneralLedgerInterfaceService {

    private generalLedgerInterfaceUrl: string = `${environment.apiUrl}/generalledgerinterfaces`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGeneralLedgerInterfaces(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GeneralLedgerInterface[]> {
        var url = `${this.generalLedgerInterfaceUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GeneralLedgerInterface[]),
                catchError(this.sharedService.handleError))
    }

    getGeneralLedgerInterface(companyCode : string): Observable<GeneralLedgerInterface> {
        return this.httpClient.get(`${this.generalLedgerInterfaceUrl}/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as GeneralLedgerInterface),
                catchError(this.sharedService.handleError))
    }

    getGeneralLedgerInterfacesCount(): Observable<number> {
        var url = `${this.generalLedgerInterfaceUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByCompanyCode(companyCode : string): Observable<GeneralLedgerInterface[]> {
        return this.httpClient.get(`${this.generalLedgerInterfaceUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as GeneralLedgerInterface),
                catchError(this.sharedService.handleError))
    }




    createGeneralLedgerInterface(generalLedgerInterface : GeneralLedgerInterface): Observable<any> {
        let body = JSON.stringify(generalLedgerInterface);
        return this.httpClient.post(this.generalLedgerInterfaceUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGeneralLedgerInterface(generalLedgerInterface : GeneralLedgerInterface, companyCode : string): Observable<any> {
        let body = JSON.stringify(generalLedgerInterface);
        return this.httpClient.put(`${this.generalLedgerInterfaceUrl}/${companyCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGeneralLedgerInterface(generalLedgerInterface : GeneralLedgerInterface, companyCode : string): Observable<any> {
        let body = JSON.stringify(generalLedgerInterface);
        return this.httpClient.patch(`${this.generalLedgerInterfaceUrl}/${companyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGeneralLedgerInterface(companyCode : string): Observable<any> {
        return this.httpClient.delete(`${this.generalLedgerInterfaceUrl}/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}