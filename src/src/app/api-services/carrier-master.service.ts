/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CarrierMaster } from '../api-models/carrier-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CarrierMasterService {

    private carrierMasterUrl = `${environment.apiUrl}/carriermasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCarrierMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CarrierMaster[]> {
        var url = `${this.carrierMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CarrierMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCarrierMaster(carrierCode : string): Observable<CarrierMaster> {
        return this.httpClient.get(`${this.carrierMasterUrl}/${carrierCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CarrierMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getCarrierMastersCount(): Observable<number> {
        var url = `${this.carrierMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByContactTitle(contactTitle : string): Observable<CarrierMaster[]> {
        return this.httpClient.get(`${this.carrierMasterUrl}/find-by-contacttitle/${contactTitle}`, {observe: 'response'})
            .pipe(map(response => response.body as CarrierMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createCarrierMaster(carrierMaster : CarrierMaster): Observable<any> {
        let body = JSON.stringify(carrierMaster);
        return this.httpClient.post(this.carrierMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateCarrierMaster(carrierMaster : CarrierMaster, carrierCode : string): Observable<any> {
        let body = JSON.stringify(carrierMaster);
        return this.httpClient.put(`${this.carrierMasterUrl}/${carrierCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateCarrierMaster(carrierMaster : CarrierMaster, carrierCode : string): Observable<any> {
        let body = JSON.stringify(carrierMaster);
        return this.httpClient.patch(`${this.carrierMasterUrl}/${carrierCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteCarrierMaster(carrierCode : string): Observable<any> {
        return this.httpClient.delete(`${this.carrierMasterUrl}/${carrierCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
