/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangePasswordResult } from '../api-models/change-password-result'
import { environment } from '../../environments/environment'
import { SharedService } from '../shared/services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ChangePasswordService {

    private changePasswordUrl: string = `${environment.apiUrl}/changePassword`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    changePassword(username: string, oldPassword: string, newPassword: string): Observable<ChangePasswordResult> {
        let headers = new HttpHeaders({ 'userName': `${username}`, 'oldPassword': `${oldPassword}`, 'newPassword': `${newPassword}` });
        let options = {
            headers: headers
        }

        return this.httpClient.post(`${this.changePasswordUrl}/?`, {}, options)
            .pipe(map(response => response as ChangePasswordResult),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))

    }

    updatePassword(username: string, password: string): Observable<ChangePasswordResult> {
        let headers = new HttpHeaders({ 'userName': `${username}`, 'password': `${password}`});
        let options = {
            headers: headers
        }

        return this.httpClient.post(`${this.changePasswordUrl}/update`, {}, options)
            .pipe(map(response => response as ChangePasswordResult),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))

    }

    logout() {
        sessionStorage.setItem('isLogin', "false");
    }

    setAuthenticated() {
        sessionStorage.setItem('isLogin', "true");
    }

    isAuthenticated() {
        const isLogin = sessionStorage.getItem('isLogin');
        if (isLogin === "true") {
            return true;
        } else {
            return false;
        }
    }
}
