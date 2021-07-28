/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvTypeMaster } from '../api-models/prov-type-master.model'

import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ProvTypeMasterService {

    private provTypeMasterUrl: string = `${environment.apiUrl}/provtypemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
        private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getProvTypeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ProvTypeMaster[]> {
        var url = `${this.provTypeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})

            .pipe(map(response => response.body as ProvTypeMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvTypeMaster(typeOrSpecCode : string): Observable<ProvTypeMaster> {
        return this.httpClient.get(`${this.provTypeMasterUrl}/${typeOrSpecCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ProvTypeMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvTypeMasterByTypeOrSpecialty(typeOrSpecialty: string): Observable<ProvTypeMaster[]> {
        return this.httpClient.get(`${this.provTypeMasterUrl}/find-by-specialty/${typeOrSpecialty}`, { observe: 'response' })
            .pipe(map(response => response.body as ProvTypeMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getProvTypeMastersCount(): Observable<number> {
        var url = `${this.provTypeMasterUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createProvTypeMaster(provTypeMaster: ProvTypeMaster): Observable<any> {
        let body = JSON.stringify(provTypeMaster);
        return this.httpClient.post(this.provTypeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateProvTypeMaster(provTypeMaster: ProvTypeMaster, typeOrSpecCode: string): Observable<any> {
        let body = JSON.stringify(provTypeMaster);
        return this.httpClient.put(`${this.provTypeMasterUrl}/${typeOrSpecCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateProvTypeMaster(provTypeMaster: ProvTypeMaster, typeOrSpecCode: string): Observable<any> {
        let body = JSON.stringify(provTypeMaster);
        return this.httpClient.patch(`${this.provTypeMasterUrl}/${typeOrSpecCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteProvTypeMaster(typeOrSpecCode: string): Observable<any> {
        return this.httpClient.delete(`${this.provTypeMasterUrl}/${typeOrSpecCode}`, { observe: 'response' })

            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
