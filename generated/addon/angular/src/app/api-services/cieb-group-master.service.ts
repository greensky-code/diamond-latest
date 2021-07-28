/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebGroupMaster } from '../api-models/cieb-group-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebGroupMasterService {

    private ciebGroupMasterUrl: string = `${environment.apiUrl}/ciebgroupmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebGroupMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebGroupMaster[]> {
        var url = `${this.ciebGroupMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebGroupMaster[]),
                catchError(this.sharedService.handleError))
    }

    getCiebGroupMaster(seqGroupId : number): Observable<CiebGroupMaster> {
        return this.httpClient.get(`${this.ciebGroupMasterUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebGroupMaster),
                catchError(this.sharedService.handleError))
    }

    getCiebGroupMastersCount(): Observable<number> {
        var url = `${this.ciebGroupMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebGroupMaster(ciebGroupMaster : CiebGroupMaster): Observable<any> {
        let body = JSON.stringify(ciebGroupMaster);
        return this.httpClient.post(this.ciebGroupMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebGroupMaster(ciebGroupMaster : CiebGroupMaster, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(ciebGroupMaster);
        return this.httpClient.put(`${this.ciebGroupMasterUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebGroupMaster(ciebGroupMaster : CiebGroupMaster, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(ciebGroupMaster);
        return this.httpClient.patch(`${this.ciebGroupMasterUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebGroupMaster(seqGroupId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebGroupMasterUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}