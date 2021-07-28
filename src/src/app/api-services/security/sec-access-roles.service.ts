/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecAccessRoles} from "../../api-models/security/sec-access-roles.model";

@Injectable({
    providedIn: "root"
})
export class SecAccessRolesService {

    private secAccessRolesUrl: string = `${environment.apiUrl}/secaccessroleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecAccessRoleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecAccessRoles[]> {
        var url = `${this.secAccessRolesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecAccessRoles[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecAccessRoles(roleName : string): Observable<SecAccessRoles> {
        return this.httpClient.get(`${this.secAccessRolesUrl}/${roleName}`, {observe: 'response'})
            .pipe(map(response => response.body as SecAccessRoles),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecAccessRolesesCount(): Observable<number> {
        var url = `${this.secAccessRolesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createSecAccessRoles(secAccessRoles : SecAccessRoles): Observable<any> {
        let body = JSON.stringify(secAccessRoles);
        return this.httpClient.post(this.secAccessRolesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecAccessRoles(secAccessRoles : SecAccessRoles, roleName : string): Observable<any> {
        let body = JSON.stringify(secAccessRoles);
        return this.httpClient.put(`${this.secAccessRolesUrl}/${roleName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecAccessRoles(secAccessRoles : SecAccessRoles, roleName : string): Observable<any> {
        let body = JSON.stringify(secAccessRoles);
        return this.httpClient.patch(`${this.secAccessRolesUrl}/${roleName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecAccessRoles(roleName : string): Observable<any> {
        return this.httpClient.delete(`${this.secAccessRolesUrl}/${roleName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
