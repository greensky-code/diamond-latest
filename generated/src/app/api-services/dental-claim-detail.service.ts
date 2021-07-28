/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DentalClaimDetail } from '../api-models/dental-claim-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class DentalClaimDetailService {

    private dentalClaimDetailUrl: string = `${environment.apiUrl}/dentalclaimdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getDentalClaimDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<DentalClaimDetail[]> {
        var url = `${this.dentalClaimDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimDetail[]),
                catchError(this.sharedService.handleError))
    }

    getDentalClaimDetail(subLineCode : string): Observable<DentalClaimDetail> {
        return this.httpClient.get(`${this.dentalClaimDetailUrl}/${subLineCode}`, {observe: 'response'})
            .pipe(map(response => response.body as DentalClaimDetail),
                catchError(this.sharedService.handleError))
    }

    getDentalClaimDetailsCount(): Observable<number> {
        var url = `${this.dentalClaimDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createDentalClaimDetail(dentalClaimDetail : DentalClaimDetail): Observable<any> {
        let body = JSON.stringify(dentalClaimDetail);
        return this.httpClient.post(this.dentalClaimDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateDentalClaimDetail(dentalClaimDetail : DentalClaimDetail, subLineCode : string): Observable<any> {
        let body = JSON.stringify(dentalClaimDetail);
        return this.httpClient.put(`${this.dentalClaimDetailUrl}/${subLineCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateDentalClaimDetail(dentalClaimDetail : DentalClaimDetail, subLineCode : string): Observable<any> {
        let body = JSON.stringify(dentalClaimDetail);
        return this.httpClient.patch(`${this.dentalClaimDetailUrl}/${subLineCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteDentalClaimDetail(subLineCode : string): Observable<any> {
        return this.httpClient.delete(`${this.dentalClaimDetailUrl}/${subLineCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}