/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebBankName } from '../../api-models/addon/cieb-bank-name.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebBankNameService {

    private ciebBankNameUrl: string = `${environment.apiUrl}/ciebbanknames`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebBankNames(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebBankName[]> {
        var url = `${this.ciebBankNameUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebBankName[]),
                catchError(this.sharedService.handleError))
    }

    getCiebBankName(seqBankNameId : number): Observable<CiebBankName> {
        return this.httpClient.get(`${this.ciebBankNameUrl}/${seqBankNameId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebBankName),
                catchError(this.sharedService.handleError))
    }

    getCiebBankNamesCount(): Observable<number> {
        var url = `${this.ciebBankNameUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebBankName(ciebBankName : CiebBankName): Observable<any> {
        let body = JSON.stringify(ciebBankName);
        return this.httpClient.post(this.ciebBankNameUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebBankName(ciebBankName : CiebBankName, seqBankNameId : number): Observable<any> {
        let body = JSON.stringify(ciebBankName);
        return this.httpClient.put(`${this.ciebBankNameUrl}/${seqBankNameId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebBankName(ciebBankName : CiebBankName, seqBankNameId : number): Observable<any> {
        let body = JSON.stringify(ciebBankName);
        return this.httpClient.patch(`${this.ciebBankNameUrl}/${seqBankNameId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebBankName(seqBankNameId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebBankNameUrl}/${seqBankNameId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}