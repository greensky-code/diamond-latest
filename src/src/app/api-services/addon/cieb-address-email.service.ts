/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebAddressEmail } from '../../api-models/addon/cieb-address-email.model';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { CiebEmailCode } from '../../api-models/addon/cieb-email-code.model';

@Injectable({
    providedIn: "root"
})
export class CiebAddressEmailCodeService {

    private ciebAddressEmailCodeUrl: string = `${environment.apiUrl}/ciebemailaddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebAddressEmailCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebAddressEmail[]> {
        var url = `${this.ciebAddressEmailCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddressEmail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebAddressEmailCode(seqEmailAdd : number): Observable<CiebAddressEmail> {
        return this.httpClient.get(`${this.ciebAddressEmailCodeUrl}/${seqEmailAdd}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddressEmail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebEmailCodes(): Observable<CiebEmailCode[]> {
        return this.httpClient.get(`${this.ciebAddressEmailCodeUrl}/emailcodes`, {observe: 'response'})
            .pipe(map(response => response.body as CiebEmailCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebAddressEmailCodesCount(): Observable<number> {
        var url = `${this.ciebAddressEmailCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createCiebAddressEmailCode(ciebAddressEmailCode : CiebAddressEmail): Observable<any> {
        console.log("service call ")
        let body = JSON.stringify(ciebAddressEmailCode);
        console.log("service call making")
        return this.httpClient.post(this.ciebAddressEmailCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebAddressEmailCode(ciebAddressEmailCode : CiebAddressEmail, seqEmailAdd : number): Observable<any> {
        let body = JSON.stringify(ciebAddressEmailCode);
        return this.httpClient.put(`${this.ciebAddressEmailCodeUrl}/${seqEmailAdd}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebAddressEmailCode(ciebAddressEmailCode : CiebAddressEmail, addressCode : string): Observable<any> {
        let body = JSON.stringify(ciebAddressEmailCode);
        return this.httpClient.patch(`${this.ciebAddressEmailCodeUrl}/${addressCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebAddressEmailCode(seqEmailAdd : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebAddressEmailCodeUrl}/${seqEmailAdd}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
