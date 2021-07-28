/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvPrivilege } from '../api-models/prov-privilege.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProvPrivilegeService {

    private provPrivilegeUrl: string = `${environment.apiUrl}/provprivileges`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvPrivileges(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvPrivilege[]> {
        var url = `${this.provPrivilegeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ProvPrivilege[]),
                catchError(this.sharedService.handleError))
    }

    getProvPrivilege(seqProvPrivilege : number): Observable<ProvPrivilege> {
        return this.httpClient.get(`${this.provPrivilegeUrl}/${seqProvPrivilege}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvPrivilege),
                catchError(this.sharedService.handleError))
    }

    getProvPrivilegesCount(): Observable<number> {
        var url = `${this.provPrivilegeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqProvId(seqProvId : number): Observable<ProvPrivilege[]> {
        return this.httpClient.get(`${this.provPrivilegeUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvPrivilege),
                catchError(this.sharedService.handleError))
    }
    findBySeqHospId(seqHospId : number): Observable<ProvPrivilege[]> {
        return this.httpClient.get(`${this.provPrivilegeUrl}/find-by-seqhospid/${seqHospId}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvPrivilege),
                catchError(this.sharedService.handleError))
    }




    createProvPrivilege(provPrivilege : ProvPrivilege): Observable<any> {
        let body = JSON.stringify(provPrivilege);
        return this.httpClient.post(this.provPrivilegeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateProvPrivilege(provPrivilege : ProvPrivilege, seqProvPrivilege : number): Observable<any> {
        let body = JSON.stringify(provPrivilege);
        return this.httpClient.put(`${this.provPrivilegeUrl}/${seqProvPrivilege}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateProvPrivilege(provPrivilege : ProvPrivilege, seqProvPrivilege : number): Observable<any> {
        let body = JSON.stringify(provPrivilege);
        return this.httpClient.patch(`${this.provPrivilegeUrl}/${seqProvPrivilege}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteProvPrivilege(seqProvPrivilege : number): Observable<any> {
        return this.httpClient.delete(`${this.provPrivilegeUrl}/${seqProvPrivilege}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}