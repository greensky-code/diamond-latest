/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebChangeReasonCode } from '../../api-models/';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebChangeReasonCodeService {

    private ciebChangeReasonCodeUrl: string = `${environment.apiUrl}/ciebchangereasoncodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebChangeReasonCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebChangeReasonCode[]> {
        var url = `${this.ciebChangeReasonCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebChangeReasonCode[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebChangeReasonCode(changeReasonCode : string): Observable<CiebChangeReasonCode> {
        return this.httpClient.get(`${this.ciebChangeReasonCodeUrl}/${changeReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebChangeReasonCode),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebChangeReasonCodesCount(): Observable<number> {
        var url = `${this.ciebChangeReasonCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCiebChangeReasonCode(ciebChangeReasonCode : CiebChangeReasonCode): Observable<any> {
        let body = JSON.stringify(ciebChangeReasonCode);
        return this.httpClient.post(this.ciebChangeReasonCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebChangeReasonCode(ciebChangeReasonCode : CiebChangeReasonCode, changeReasonCode : string): Observable<any> {
        let body = JSON.stringify(ciebChangeReasonCode);
        return this.httpClient.put(`${this.ciebChangeReasonCodeUrl}/${changeReasonCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebChangeReasonCode(ciebChangeReasonCode : CiebChangeReasonCode, changeReasonCode : string): Observable<any> {
        let body = JSON.stringify(ciebChangeReasonCode);
        return this.httpClient.patch(`${this.ciebChangeReasonCodeUrl}/${changeReasonCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebChangeReasonCode(changeReasonCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebChangeReasonCodeUrl}/${changeReasonCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
