/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CiebEntityAddressXref} from "../../api-models/addon/cieb-entity-address-xref.model";
import {CiebStreetAddress} from "../../api-models";

@Injectable({
    providedIn: "root"
})
export class CiebEntityAddressXrefService {

    private ciebEntityAddressXrefUrl: string = `${environment.apiUrl}/ciebentityaddressxrefs`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebEntityAddressXrefs(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebEntityAddressXref[]> {
        var url = `${this.ciebEntityAddressXrefUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebEntityAddressXref[]),
                catchError(this.sharedService.handleError))
    }

    getCiebEntityAddressXref(addressCode: string): Observable<CiebEntityAddressXref> {
        return this.httpClient.get(`${this.ciebEntityAddressXrefUrl}/${addressCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebEntityAddressXref),
                catchError(this.sharedService.handleError))
    }

    getVendorAddressData(seqVendAddress : number): Observable<CiebStreetAddress> {
        return this.httpClient.get(`${this.ciebEntityAddressXrefUrl}/get-vend-addr-data/${seqVendAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebStreetAddress),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    procInsUpdStreetAddrTab(ciebStreetAddress : CiebStreetAddress): Observable<CiebStreetAddress> {
        const body = JSON.stringify(ciebStreetAddress);
        return this.httpClient.post(`${this.ciebEntityAddressXrefUrl}/ins_upd_street_addr_tab`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    getProvAddressData(seqProvAddress : number): Observable<CiebStreetAddress> {
        return this.httpClient.get(`${this.ciebEntityAddressXrefUrl}/get-prov-addr-data/${seqProvAddress}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebStreetAddress),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getCiebEntityAddressXrefsCount(): Observable<number> {
        var url = `${this.ciebEntityAddressXrefUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebEntityAddressXref(ciebEntityAddressXref: CiebEntityAddressXref): Observable<any> {
        let body = JSON.stringify(ciebEntityAddressXref);
        return this.httpClient.post(this.ciebEntityAddressXrefUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebEntityAddressXref(ciebEntityAddressXref: CiebEntityAddressXref, addressCode: string): Observable<any> {
        let body = JSON.stringify(ciebEntityAddressXref);
        return this.httpClient.put(`${this.ciebEntityAddressXrefUrl}/${addressCode}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebEntityAddressXref(ciebEntityAddressXref: CiebEntityAddressXref, addressCode: string): Observable<any> {
        let body = JSON.stringify(ciebEntityAddressXref);
        return this.httpClient.patch(`${this.ciebEntityAddressXrefUrl}/${addressCode}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebEntityAddressXref(addressCode: string): Observable<any> {
        return this.httpClient.delete(`${this.ciebEntityAddressXrefUrl}/${addressCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
