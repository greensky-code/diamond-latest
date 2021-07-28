/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {PriceScheduleMaster} from '../api-models/price-schedule-master.model'
import {environment} from '../../environments/environment'
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class PriceScheduleMasterService {

    private priceScheduleMasterUrl: string = `${environment.apiUrl}/priceschedulemasters`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPriceScheduleMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<PriceScheduleMaster[]> {
        var url = `${this.priceScheduleMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
        .pipe(map(response => response.body as PriceScheduleMaster[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPriceScheduleMaster(priceSchedule: string): Observable<PriceScheduleMaster> {
        return this.httpClient.get(`${this.priceScheduleMasterUrl}/${priceSchedule}`, {observe: 'response'})
        .pipe(map(response => response.body as PriceScheduleMaster),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPriceScheduleMastersCount(): Observable<number> {
        var url = `${this.priceScheduleMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
        .pipe(map(response => response.body as number),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createPriceScheduleMaster(priceScheduleMaster: PriceScheduleMaster): Observable<any> {
        let body = JSON.stringify(priceScheduleMaster);
        return this.httpClient.post(this.priceScheduleMasterUrl, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePriceScheduleMaster(priceScheduleMaster: PriceScheduleMaster, priceSchedule: string): Observable<any> {
        let body = JSON.stringify(priceScheduleMaster);
        return this.httpClient.put(`${this.priceScheduleMasterUrl}/${priceSchedule}`, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePriceScheduleMaster(priceScheduleMaster: PriceScheduleMaster, priceSchedule: string): Observable<any> {
        let body = JSON.stringify(priceScheduleMaster);
        return this.httpClient.patch(`${this.priceScheduleMasterUrl}/${priceSchedule}`, body, {headers: this.contentHeaders})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePriceScheduleMaster(priceSchedule: string): Observable<any> {
        return this.httpClient.delete(`${this.priceScheduleMasterUrl}/${priceSchedule}`, {observe: 'response'})
        .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
