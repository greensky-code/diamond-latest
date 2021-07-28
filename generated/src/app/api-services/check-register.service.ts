/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckRegister } from '../api-models/check-register.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CheckRegisterService {

    private checkRegisterUrl: string = `${environment.apiUrl}/checkregisters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckRegisters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckRegister[]> {
        var url = `${this.checkRegisterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckRegister[]),
                catchError(this.sharedService.handleError))
    }

    getCheckRegister(eftTransNumber : string): Observable<CheckRegister> {
        return this.httpClient.get(`${this.checkRegisterUrl}/${eftTransNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckRegister),
                catchError(this.sharedService.handleError))
    }

    getCheckRegistersCount(): Observable<number> {
        var url = `${this.checkRegisterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCheckRegister(checkRegister : CheckRegister): Observable<any> {
        let body = JSON.stringify(checkRegister);
        return this.httpClient.post(this.checkRegisterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckRegister(checkRegister : CheckRegister, eftTransNumber : string): Observable<any> {
        let body = JSON.stringify(checkRegister);
        return this.httpClient.put(`${this.checkRegisterUrl}/${eftTransNumber}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckRegister(checkRegister : CheckRegister, eftTransNumber : string): Observable<any> {
        let body = JSON.stringify(checkRegister);
        return this.httpClient.patch(`${this.checkRegisterUrl}/${eftTransNumber}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckRegister(eftTransNumber : string): Observable<any> {
        return this.httpClient.delete(`${this.checkRegisterUrl}/${eftTransNumber}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}