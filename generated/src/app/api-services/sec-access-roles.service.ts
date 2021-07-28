/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecAccessRoles } from '../api-models/sec-access-roles.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
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
                catchError(this.sharedService.handleError))
    }

    getSecAccessRoles(roleName : string): Observable<SecAccessRoles> {
        return this.httpClient.get(`${this.secAccessRolesUrl}/${roleName}`, {observe: 'response'})
            .pipe(map(response => response.body as SecAccessRoles),
                catchError(this.sharedService.handleError))
    }

    getSecAccessRolesesCount(): Observable<number> {
        var url = `${this.secAccessRolesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSecAccessRoles(secAccessRoles : SecAccessRoles): Observable<any> {
        let body = JSON.stringify(secAccessRoles);
        return this.httpClient.post(this.secAccessRolesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSecAccessRoles(secAccessRoles : SecAccessRoles, roleName : string): Observable<any> {
        let body = JSON.stringify(secAccessRoles);
        return this.httpClient.put(`${this.secAccessRolesUrl}/${roleName}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSecAccessRoles(secAccessRoles : SecAccessRoles, roleName : string): Observable<any> {
        let body = JSON.stringify(secAccessRoles);
        return this.httpClient.patch(`${this.secAccessRolesUrl}/${roleName}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSecAccessRoles(roleName : string): Observable<any> {
        return this.httpClient.delete(`${this.secAccessRolesUrl}/${roleName}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}