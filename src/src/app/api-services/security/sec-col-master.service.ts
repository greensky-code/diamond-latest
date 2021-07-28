/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {SharedService} from "../../shared/services/shared.service";
import {environment} from "../../../environments/environment";
import {SecColMaster} from "../../api-models/security/sec-col-master.model";

@Injectable({
    providedIn: "root"
})
export class SecColMasterService {

    private secColMasterUrl: string = `${environment.apiUrl}/seccolmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecColMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecColMaster[]> {
        var url = `${this.secColMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecColMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecColMaster(sfldlId : string): Observable<SecColMaster> {
        return this.httpClient.get(`${this.secColMasterUrl}/${sfldlId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecColMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecColMastersCount(): Observable<number> {
        var url = `${this.secColMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createSecColMaster(secColMaster : SecColMaster): Observable<any> {
        let body = JSON.stringify(secColMaster);
        return this.httpClient.post(this.secColMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecColMaster(secColMaster : SecColMaster, sfldlId : string): Observable<any> {
        let body = JSON.stringify(secColMaster);
        return this.httpClient.put(`${this.secColMasterUrl}/${sfldlId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateSecColMaster(secColMaster : SecColMaster, sfldlId : string): Observable<any> {
        let body = JSON.stringify(secColMaster);
        return this.httpClient.patch(`${this.secColMasterUrl}/${sfldlId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecColMaster(sfldlId : string): Observable<any> {
        return this.httpClient.delete(`${this.secColMasterUrl}/${sfldlId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
