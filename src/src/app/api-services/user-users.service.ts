/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { UserUsers } from '../api-models/user-users.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})

export class UserUsersService {

    private userUsersUrl: string = `${environment.apiUrl}/useruserss`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getUserUserss(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<UserUsers[]> {
        var url = `${this.userUsersUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as UserUsers[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getUserUsers(userId : string): Observable<UserUsers> {
        return this.httpClient.get(`${this.userUsersUrl}/${userId}`, { observe: 'response' })
            .pipe(map(response => response.body as UserUsers),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getUserUserssCount(): Observable<number> {
        var url = `${this.userUsersUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createUserUsers(userUsers: UserUsers): Observable<any> {
        let body = JSON.stringify(userUsers);
        return this.httpClient.post(this.userUsersUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateUserUsers(userUsers: UserUsers, userId : number): Observable<any> {
        let body = JSON.stringify(userUsers);
        return this.httpClient.put(`${this.userUsersUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateUserUsers(userUsers: UserUsers, userId : number): Observable<any> {
        let body = JSON.stringify(userUsers);
        return this.httpClient.patch(`${this.userUsersUrl}/${userId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteUserUsers(userId : number): Observable<any> {
        return this.httpClient.delete(`${this.userUsersUrl}/${userId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    unlockSecUser(userId: string): Observable<any> {
        return this.httpClient.patch(`${this.userUsersUrl}/unlock/${userId}`, { observe: 'response' })
            .pipe(map(response => response),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
