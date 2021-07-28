/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AddressTypeMaster} from '../api-models/address-type-master.model'
import {environment} from '../../environments/environment'
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class AddressTypeMasterService {

    private addressTypeMasterUrl: string = `${environment.apiUrl}/addresstypemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAddressTypeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AddressTypeMaster[]> {
        var url = `${this.addressTypeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AddressTypeMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAddressTypeMaster(addressType : string): Observable<AddressTypeMaster> {
        return this.httpClient.get(`${this.addressTypeMasterUrl}/${addressType}`, {observe: 'response'})
            .pipe(map(response => response.body as AddressTypeMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAddressTypeMastersCount(): Observable<number> {
        var url = `${this.addressTypeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createAddressTypeMaster(addressTypeMaster : AddressTypeMaster): Observable<any> {
        let body = JSON.stringify(addressTypeMaster);
        return this.httpClient.post(this.addressTypeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAddressTypeMaster(addressTypeMaster : AddressTypeMaster, addressType : string): Observable<any> {
        let body = JSON.stringify(addressTypeMaster);
        return this.httpClient.put(`${this.addressTypeMasterUrl}/${addressType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAddressTypeMaster(addressTypeMaster : AddressTypeMaster, addressType : string): Observable<any> {
        let body = JSON.stringify(addressTypeMaster);
        return this.httpClient.patch(`${this.addressTypeMasterUrl}/${addressType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAddressTypeMaster(addressType : string): Observable<any> {
        return this.httpClient.delete(`${this.addressTypeMasterUrl}/${addressType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
