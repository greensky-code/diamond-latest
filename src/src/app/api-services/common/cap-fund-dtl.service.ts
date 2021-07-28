/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CapFundDtl} from "../../api-models/common/cap-fund-dtl.model";

@Injectable({
    providedIn: "root"
})
export class CapFundDtlService {

    private capFundDtlUrl: string = `${environment.apiUrl}/capfunddtls`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapFundDtls(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CapFundDtl[]> {
        var url = `${this.capFundDtlUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapFundDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCapFundDtl(capFundModelId: string): Observable<CapFundDtl[]> {
        return this.httpClient.get(`${this.capFundDtlUrl}/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundDtl[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCapFundDtlsCount(): Observable<number> {
        var url = `${this.capFundDtlUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByCapFundModelId(capFundModelId: string): Observable<CapFundDtl[]> {
        return this.httpClient.get(`${this.capFundDtlUrl}/find-by-capfundmodelid/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundDtl),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createCapFundDtl(capFundDtl: CapFundDtl): Observable<any> {
        let body = JSON.stringify(capFundDtl);
        return this.httpClient.post(this.capFundDtlUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCapFundDtl(capFundDtl: CapFundDtl, capFundSubModelId: string, capFundModelId: string): Observable<any> {
        let body = JSON.stringify(capFundDtl);
        return this.httpClient.put(`${this.capFundDtlUrl}/${capFundSubModelId}/${capFundModelId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCapFundDtl(capFundDtl: CapFundDtl, capFundModelId: string): Observable<any> {
        let body = JSON.stringify(capFundDtl);
        return this.httpClient.patch(`${this.capFundDtlUrl}/${capFundModelId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCapFundDtl(capFundModelId: string): Observable<any> {
        return this.httpClient.delete(`${this.capFundDtlUrl}/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
