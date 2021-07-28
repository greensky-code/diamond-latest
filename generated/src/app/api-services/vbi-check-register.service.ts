/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VbiCheckRegister } from '../api-models/vbi-check-register.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class VbiCheckRegisterService {

    private vbiCheckRegisterUrl: string = `${environment.apiUrl}/vbicheckregisters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVbiCheckRegisters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<VbiCheckRegister[]> {
        var url = `${this.vbiCheckRegisterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VbiCheckRegister[]),
                catchError(this.sharedService.handleError))
    }

    getVbiCheckRegister(bankAccountCode : string): Observable<VbiCheckRegister> {
        return this.httpClient.get(`${this.vbiCheckRegisterUrl}/${bankAccountCode}`, {observe: 'response'})
            .pipe(map(response => response.body as VbiCheckRegister),
                catchError(this.sharedService.handleError))
    }

    getVbiCheckRegistersCount(): Observable<number> {
        var url = `${this.vbiCheckRegisterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBankAccountCode(bankAccountCode : string): Observable<VbiCheckRegister[]> {
        return this.httpClient.get(`${this.vbiCheckRegisterUrl}/find-by-bankaccountcode/${bankAccountCode}`, {observe: 'response'})
            .pipe(map(response => response.body as VbiCheckRegister),
                catchError(this.sharedService.handleError))
    }
    findByCompanyCode(companyCode : string): Observable<VbiCheckRegister[]> {
        return this.httpClient.get(`${this.vbiCheckRegisterUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as VbiCheckRegister),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendId(seqVendId : number): Observable<VbiCheckRegister[]> {
        return this.httpClient.get(`${this.vbiCheckRegisterUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as VbiCheckRegister),
                catchError(this.sharedService.handleError))
    }
    findBySeqVendAddress(seqVendAddress : number): Observable<VbiCheckRegister[]> {
        return this.httpClient.get(`${this.vbiCheckRegisterUrl}/find-by-seqvendaddress/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as VbiCheckRegister),
                catchError(this.sharedService.handleError))
    }




    createVbiCheckRegister(vbiCheckRegister : VbiCheckRegister): Observable<any> {
        let body = JSON.stringify(vbiCheckRegister);
        return this.httpClient.post(this.vbiCheckRegisterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateVbiCheckRegister(vbiCheckRegister : VbiCheckRegister, bankAccountCode : string): Observable<any> {
        let body = JSON.stringify(vbiCheckRegister);
        return this.httpClient.put(`${this.vbiCheckRegisterUrl}/${bankAccountCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateVbiCheckRegister(vbiCheckRegister : VbiCheckRegister, bankAccountCode : string): Observable<any> {
        let body = JSON.stringify(vbiCheckRegister);
        return this.httpClient.patch(`${this.vbiCheckRegisterUrl}/${bankAccountCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteVbiCheckRegister(bankAccountCode : string): Observable<any> {
        return this.httpClient.delete(`${this.vbiCheckRegisterUrl}/${bankAccountCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}