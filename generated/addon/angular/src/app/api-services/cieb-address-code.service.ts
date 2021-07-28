/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebAddressCode } from '../api-models/cieb-address-code.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebAddressCodeService {

    private ciebAddressCodeUrl: string = `${environment.apiUrl}/ciebaddresscodes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebAddressCodes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebAddressCode[]> {
        var url = `${this.ciebAddressCodeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddressCode[]),
                catchError(this.sharedService.handleError))
    }

    getCiebAddressCode(addressCode : string): Observable<CiebAddressCode> {
        return this.httpClient.get(`${this.ciebAddressCodeUrl}/${addressCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddressCode),
                catchError(this.sharedService.handleError))
    }

    getCiebAddressCodesCount(): Observable<number> {
        var url = `${this.ciebAddressCodeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebAddressCode(ciebAddressCode : CiebAddressCode): Observable<any> {
        let body = JSON.stringify(ciebAddressCode);
        return this.httpClient.post(this.ciebAddressCodeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebAddressCode(ciebAddressCode : CiebAddressCode, addressCode : string): Observable<any> {
        let body = JSON.stringify(ciebAddressCode);
        return this.httpClient.put(`${this.ciebAddressCodeUrl}/${addressCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebAddressCode(ciebAddressCode : CiebAddressCode, addressCode : string): Observable<any> {
        let body = JSON.stringify(ciebAddressCode);
        return this.httpClient.patch(`${this.ciebAddressCodeUrl}/${addressCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebAddressCode(addressCode : string): Observable<any> {
        return this.httpClient.delete(`${this.ciebAddressCodeUrl}/${addressCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}