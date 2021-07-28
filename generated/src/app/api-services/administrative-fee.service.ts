/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AdministrativeFee } from '../api-models/administrative-fee.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class AdministrativeFeeService {

    private administrativeFeeUrl: string = `${environment.apiUrl}/administrativefees`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAdministrativeFees(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AdministrativeFee[]> {
        var url = `${this.administrativeFeeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AdministrativeFee[]),
                catchError(this.sharedService.handleError))
    }

    getAdministrativeFee(seqAdminFee : number): Observable<AdministrativeFee> {
        return this.httpClient.get(`${this.administrativeFeeUrl}/${seqAdminFee}`, {observe: 'response'})
            .pipe(map(response => response.body as AdministrativeFee),
                catchError(this.sharedService.handleError))
    }

    getAdministrativeFeesCount(): Observable<number> {
        var url = `${this.administrativeFeeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createAdministrativeFee(administrativeFee : AdministrativeFee): Observable<any> {
        let body = JSON.stringify(administrativeFee);
        return this.httpClient.post(this.administrativeFeeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAdministrativeFee(administrativeFee : AdministrativeFee, seqAdminFee : number): Observable<any> {
        let body = JSON.stringify(administrativeFee);
        return this.httpClient.put(`${this.administrativeFeeUrl}/${seqAdminFee}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAdministrativeFee(administrativeFee : AdministrativeFee, seqAdminFee : number): Observable<any> {
        let body = JSON.stringify(administrativeFee);
        return this.httpClient.patch(`${this.administrativeFeeUrl}/${seqAdminFee}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAdministrativeFee(seqAdminFee : number): Observable<any> {
        return this.httpClient.delete(`${this.administrativeFeeUrl}/${seqAdminFee}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}