/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CompanyMaster } from '../api-models/company-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CompanyMasterService {

    private companyMasterUrl: string = `${environment.apiUrl}/companymasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCompanyMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CompanyMaster[]> {
        var url = `${this.companyMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CompanyMaster[]),
                catchError(this.sharedService.handleError))
    }

    getCompanyMaster(companyCode : string): Observable<CompanyMaster> {
        return this.httpClient.get(`${this.companyMasterUrl}/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as CompanyMaster),
                catchError(this.sharedService.handleError))
    }

    getCompanyMastersCount(): Observable<number> {
        var url = `${this.companyMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByIrsTaxId(irsTaxId : string): Observable<CompanyMaster[]> {
        return this.httpClient.get(`${this.companyMasterUrl}/find-by-irstaxid/${irsTaxId}`, {observe: 'response'})
            .pipe(map(response => response.body as CompanyMaster),
                catchError(this.sharedService.handleError))
    }




    createCompanyMaster(companyMaster : CompanyMaster): Observable<any> {
        let body = JSON.stringify(companyMaster);
        return this.httpClient.post(this.companyMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCompanyMaster(companyMaster : CompanyMaster, companyCode : string): Observable<any> {
        let body = JSON.stringify(companyMaster);
        return this.httpClient.put(`${this.companyMasterUrl}/${companyCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCompanyMaster(companyMaster : CompanyMaster, companyCode : string): Observable<any> {
        let body = JSON.stringify(companyMaster);
        return this.httpClient.patch(`${this.companyMasterUrl}/${companyCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCompanyMaster(companyCode : string): Observable<any> {
        return this.httpClient.delete(`${this.companyMasterUrl}/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}