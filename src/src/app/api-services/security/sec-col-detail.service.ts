/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {SecColDetail} from "../../api-models/security/sec-col-detail.model";

@Injectable({
    providedIn: "root"
})
export class SecColDetailService {

    private secColDetailUrl: string = `${environment.apiUrl}/seccoldetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSecColDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SecColDetail[]> {
        var url = `${this.secColDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SecColDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecColDetail(sfldlId : string): Observable<SecColDetail> {
        return this.httpClient.get(`${this.secColDetailUrl}/${sfldlId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecColDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getSecColDetailsCount(): Observable<number> {
        var url = `${this.secColDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySfldlId(sfldlId : string): Observable<SecColDetail[]> {
        return this.httpClient.get(`${this.secColDetailUrl}/find-by-sfldlid/${sfldlId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecColDetail),
            catchError(this.sharedService.handleError))
    }

    /**
     *
     * @param tableName
     */
    findByTableNameAndUserId(tableName : string, userId: string): Observable<SecColDetail[]> {
        return this.httpClient.get(`${this.secColDetailUrl}/find-by-winId/${tableName}/${userId}`, {observe: 'response'})
            .pipe(map(response => response.body as SecColDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createSecColDetail(secColDetail : SecColDetail): Observable<any> {
        let body = JSON.stringify(secColDetail);
        return this.httpClient.post(this.secColDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecColDetail(secColDetail : SecColDetail, sfldlId : string): Observable<any> {
        let body = JSON.stringify(secColDetail);
        return this.httpClient.put(`${this.secColDetailUrl}/${sfldlId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateSecColDetailFull(secColDetail : SecColDetail, columnName : string, tableName : string, sfldlId : string): Observable<any> {
        let body = JSON.stringify(secColDetail);
        return this.httpClient.put(`${this.secColDetailUrl}/${columnName}/${tableName}/${sfldlId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    partiallyUpdateSecColDetail(secColDetail : SecColDetail, sfldlId : string): Observable<any> {
        let body = JSON.stringify(secColDetail);
        return this.httpClient.patch(`${this.secColDetailUrl}/${sfldlId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteSecColDetail(sfldlId : string): Observable<any> {
        return this.httpClient.delete(`${this.secColDetailUrl}/${sfldlId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    addUpdateSecColDetail(SecColDetails: SecColDetail[]): Observable<any> {
        let body = JSON.stringify(SecColDetails);
        const url = `${this.secColDetailUrl}/update`
        return this.httpClient.post(url, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }
}

