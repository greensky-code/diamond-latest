/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {VendorAddress} from '../api-models/vendor-address.model'
import {CONFIG} from '../core/config';
import {environment} from '../../environments/environment'
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VendorAddressService {

    private vendorAddressUrl: string = `${environment.apiUrl}/vendoraddresses`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getVendorAddresses(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<VendorAddress[]> {
        var url = `${this.vendorAddressUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddress[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getVendorAddress(seqVendAddress: number): Observable<VendorAddress> {
        return this.httpClient.get(`${this.vendorAddressUrl}/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddress),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getVendorAddressesCount(): Observable<number> {
        var url = `${this.vendorAddressUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqVendId(seqVendId: string | number): Observable<VendorAddress[]> {
        return this.httpClient.get(`${this.vendorAddressUrl}/find-by-seqvendid/${seqVendId}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddress),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqVendAddrBillOvrd(seqVendAddrBillOvrd: number): Observable<VendorAddress[]> {
        return this.httpClient.get(`${this.vendorAddressUrl}/find-by-seqvendaddrbillovrd/${seqVendAddrBillOvrd}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddress),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createVendorAddress(vendorAddress: VendorAddress): Observable<any> {
        let body = JSON.stringify(vendorAddress);
        return this.httpClient.post(this.vendorAddressUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateVendorAddress(vendorAddress: VendorAddress, seqVendAddress: number): Observable<any> {
        let body = JSON.stringify(vendorAddress);
        return this.httpClient.put(`${this.vendorAddressUrl}/${seqVendAddress}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateVendorAddress(vendorAddress: VendorAddress, seqVendAddress: number): Observable<any> {
        let body = JSON.stringify(vendorAddress);
        return this.httpClient.patch(`${this.vendorAddressUrl}/${seqVendAddress}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAddressLine(vendorAddress: VendorAddress, seqVendAddress: number): Observable<any> {
        let body = JSON.stringify(vendorAddress);
        return this.httpClient.put(`${this.vendorAddressUrl}/partiallyUpdate/${seqVendAddress}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteVendorAddress(seqVendAddress: number): Observable<any> {
        return this.httpClient.delete(`${this.vendorAddressUrl}/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByVendorId(vendorId: any): Observable<any> {
        return this.httpClient.get(`${this.vendorAddressUrl}/find-by-vendid/${vendorId}`, {observe: 'response'})
            .pipe(map(response => response.body as VendorAddress),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
