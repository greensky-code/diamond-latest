/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CapFundHdr} from "../../api-models/common/cap-fund-hdr.model";

@Injectable({
    providedIn: "root"
})
export class CapFundHdrService {

    private capFundHdrUrl: string = `${environment.apiUrl}/capfundhdrs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCapFundHdrs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CapFundHdr[]> {
        var url = `${this.capFundHdrUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CapFundHdr[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCapFundHdr(capFundModelId : string): Observable<CapFundHdr> {
        return this.httpClient.get(`${this.capFundHdrUrl}/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body as CapFundHdr),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCapFundHdrsCount(): Observable<number> {
        var url = `${this.capFundHdrUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCapFundHdr(capFundHdr : CapFundHdr): Observable<any> {
        let body = JSON.stringify(capFundHdr);
        return this.httpClient.post(this.capFundHdrUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCapFundHdr(capFundHdr : CapFundHdr, capFundModelId : string): Observable<any> {
        let body = JSON.stringify(capFundHdr);
        return this.httpClient.put(`${this.capFundHdrUrl}/${capFundModelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCapFundHdr(capFundHdr : CapFundHdr, capFundModelId : string): Observable<any> {
        let body = JSON.stringify(capFundHdr);
        return this.httpClient.patch(`${this.capFundHdrUrl}/${capFundModelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCapFundHdr(capFundModelId : string): Observable<any> {
        return this.httpClient.delete(`${this.capFundHdrUrl}/${capFundModelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
