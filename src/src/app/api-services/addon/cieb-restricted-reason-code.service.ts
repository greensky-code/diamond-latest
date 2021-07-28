/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebRestrictedReasonCode } from '../../api-models'
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebRestrictedReasonCodeService {

    private ciebRestrictedReasonCodeUrl: string = `${environment.apiUrl}/ciebrestrictedreasoncodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebRestrictedReasonCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebRestrictedReasonCode[]> {
        var url = `${this.ciebRestrictedReasonCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebRestrictedReasonCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebRestrictedReasonCode(restrictedCode : string): Observable<CiebRestrictedReasonCode> {
        return this.httpClient.get(`${this.ciebRestrictedReasonCodeUrl}/${restrictedCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebRestrictedReasonCode),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebRestrictedReasonCodesCount(): Observable<number> {
        var url = `${this.ciebRestrictedReasonCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCiebRestrictedReasonCode(ciebRestrictedReasonCode : CiebRestrictedReasonCode): Observable<any> {
        let body = JSON.stringify(ciebRestrictedReasonCode);
        return this.httpClient.post(this.ciebRestrictedReasonCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebRestrictedReasonCode(ciebRestrictedReasonCode : CiebRestrictedReasonCode, restrictedCode : string): Observable<any> {
        let body = JSON.stringify(ciebRestrictedReasonCode);
        return this.httpClient.put(`${this.ciebRestrictedReasonCodeUrl}/${restrictedCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebRestrictedReasonCode(ciebRestrictedReasonCode : CiebRestrictedReasonCode, restrictedCode : string): Observable<any> {
        let body = JSON.stringify(ciebRestrictedReasonCode);
        return this.httpClient.patch(`${this.ciebRestrictedReasonCodeUrl}/${restrictedCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebRestrictedReasonCode(restrictedCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebRestrictedReasonCodeUrl}/${restrictedCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
