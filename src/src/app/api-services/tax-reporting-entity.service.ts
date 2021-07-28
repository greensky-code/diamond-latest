/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { TaxReportingEntity } from '../api-models/tax-reporting-entity.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class TaxReportingEntityService {

    private taxReportingEntityUrl: string = `${environment.apiUrl}/taxreportingentitys`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getTaxReportingEntitys(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<TaxReportingEntity[]> {
        var url = `${this.taxReportingEntityUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as TaxReportingEntity[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getTaxReportingEntity(taxRepEntity: string): Observable<TaxReportingEntity> {
        return this.httpClient.get(`${this.taxReportingEntityUrl}/${taxRepEntity}`, { observe: 'response' })
            .pipe(map(response => response.body as TaxReportingEntity),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getTaxReportingEntitysCount(): Observable<number> {
        var url = `${this.taxReportingEntityUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createTaxReportingEntity(taxReportingEntity: TaxReportingEntity): Observable<any> {
        let body = JSON.stringify(taxReportingEntity);
        return this.httpClient.post(this.taxReportingEntityUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateTaxReportingEntity(taxReportingEntity: TaxReportingEntity, taxRepEntity: string): Observable<any> {
        let body = JSON.stringify(taxReportingEntity);
        return this.httpClient.put(`${this.taxReportingEntityUrl}/${taxRepEntity}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateTaxReportingEntity(taxReportingEntity: TaxReportingEntity, taxRepEntity: string): Observable<any> {
        let body = JSON.stringify(taxReportingEntity);
        return this.httpClient.patch(`${this.taxReportingEntityUrl}/${taxRepEntity}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteTaxReportingEntity(taxRepEntity: string): Observable<any> {
        return this.httpClient.delete(`${this.taxReportingEntityUrl}/${taxRepEntity}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getTaxReportingEntityDropdowns(): Observable<any[]> {
        var url = `${this.taxReportingEntityUrl}/dropdown`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as TaxReportingEntity[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
