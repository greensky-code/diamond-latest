/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebAccount } from '../../api-models'
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebAccountService {

    private ciebAccountUrl: string = `${environment.apiUrl}/ciebaccounts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebAccounts(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebAccount[]> {
        var url = `${this.ciebAccountUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebAccount[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebAccount(seqAccountId : number): Observable<CiebAccount> {
        return this.httpClient.get(`${this.ciebAccountUrl}/${seqAccountId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebAccount),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebAccountsCount(): Observable<number> {
        var url = `${this.ciebAccountUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCiebAccount(ciebAccount : CiebAccount): Observable<any> {
        let body = JSON.stringify(ciebAccount);
        return this.httpClient.post(this.ciebAccountUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebAccount(ciebAccount : CiebAccount, seqAccountId : number): Observable<any> {
        let body = JSON.stringify(ciebAccount);
        return this.httpClient.put(`${this.ciebAccountUrl}/${seqAccountId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebAccount(ciebAccount : CiebAccount, seqAccountId : number): Observable<any> {
        let body = JSON.stringify(ciebAccount);
        return this.httpClient.patch(`${this.ciebAccountUrl}/${seqAccountId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebAccount(seqAccountId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebAccountUrl}/${seqAccountId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
