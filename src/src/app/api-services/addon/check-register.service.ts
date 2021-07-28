/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {SharedService} from '../../shared/services/shared.service';
import {CheckRegister, CheckRegisterSearchModel} from '../../api-models/addon/check-register.model';

@Injectable({
    providedIn: 'root'
})
export class CheckRegisterService {

    private checkRegisterUrl = `${environment.apiUrl}/checkregisters`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckRegisters(usePagination = false, page = 0, size = 0): Observable<CheckRegister[]> {
        let url = `${this.checkRegisterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckRegister[]))
    }

    searchCheckRegisters(checkRegisterSearchModel: CheckRegisterSearchModel): Observable<CheckRegister[]> {
        let url = `${this.checkRegisterUrl}/search`;
        return this.httpClient.post(url, checkRegisterSearchModel, {observe: 'response'})
            .pipe(map(response => response.body as CheckRegister[]))
    }

    getCheckRegister(eftTransNumber: string): Observable<CheckRegister> {
        return this.httpClient.get(`${this.checkRegisterUrl}/${eftTransNumber}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckRegister))
    }

    getCheckRegistersCount(): Observable<number> {
        let url = `${this.checkRegisterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number))
    }

    createCheckRegister(checkRegister: CheckRegister): Observable<any> {
        let body = JSON.stringify(checkRegister);
        return this.httpClient.post(this.checkRegisterUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response))
    }

    updateCheckRegister(checkRegister: CheckRegister, eftTransNumber: string): Observable<any> {
        let body = JSON.stringify(checkRegister);
        return this.httpClient.put(`${this.checkRegisterUrl}/${eftTransNumber}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response))
    }

    partiallyUpdateCheckRegister(checkRegister: CheckRegister, eftTransNumber: string): Observable<any> {
        let body = JSON.stringify(checkRegister);
        return this.httpClient.patch(`${this.checkRegisterUrl}/${eftTransNumber}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response))
    }

    deleteCheckRegister(eftTransNumber: string): Observable<any> {
        return this.httpClient.delete(`${this.checkRegisterUrl}/${eftTransNumber}`, {observe: 'response'})
            .pipe(map(response => response.body))
    }
}
