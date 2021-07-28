/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import {CiebStreetAddress} from "../../api-models";

@Injectable({
    providedIn: "root"
})
export class CiebStreetAddressService {

    private ciebStreetAddressUrl: string = `${environment.apiUrl}/ciebstreetaddresses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebStreetAddresses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebStreetAddress[]> {
        var url = `${this.ciebStreetAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebStreetAddress[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebStreetAddress(seqAddrId : number): Observable<CiebStreetAddress> {
        return this.httpClient.get(`${this.ciebStreetAddressUrl}/${seqAddrId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebStreetAddress),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCiebStreetAddressesCount(): Observable<number> {
        var url = `${this.ciebStreetAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createCiebStreetAddress(ciebStreetAddress : CiebStreetAddress): Observable<any> {
        let body = JSON.stringify(ciebStreetAddress);
        return this.httpClient.post(this.ciebStreetAddressUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCiebStreetAddress(ciebStreetAddress : CiebStreetAddress, seqAddrId : number): Observable<any> {
        let body = JSON.stringify(ciebStreetAddress);
        return this.httpClient.put(`${this.ciebStreetAddressUrl}/${seqAddrId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCiebStreetAddress(ciebStreetAddress : CiebStreetAddress, seqAddrId : number): Observable<any> {
        let body = JSON.stringify(ciebStreetAddress);
        return this.httpClient.patch(`${this.ciebStreetAddressUrl}/${seqAddrId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCiebStreetAddress(seqAddrId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebStreetAddressUrl}/${seqAddrId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
