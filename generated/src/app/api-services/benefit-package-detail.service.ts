/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitPackageDetail } from '../api-models/benefit-package-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BenefitPackageDetailService {

    private benefitPackageDetailUrl: string = `${environment.apiUrl}/benefitpackagedetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitPackageDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BenefitPackageDetail[]> {
        var url = `${this.benefitPackageDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefitPackageDetail[]),
                catchError(this.sharedService.handleError))
    }

    getBenefitPackageDetail(benefitPackageId : string): Observable<BenefitPackageDetail> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitPackageDetail),
                catchError(this.sharedService.handleError))
    }

    getBenefitPackageDetailsCount(): Observable<number> {
        var url = `${this.benefitPackageDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBenefitPackageId(benefitPackageId : string): Observable<BenefitPackageDetail[]> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-by-benefitpackageid/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitPackageDetail),
                catchError(this.sharedService.handleError))
    }
    findByBenefitRule(benefitRule : string): Observable<BenefitPackageDetail[]> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-by-benefitrule/${benefitRule}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitPackageDetail),
                catchError(this.sharedService.handleError))
    }




    createBenefitPackageDetail(benefitPackageDetail : BenefitPackageDetail): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.post(this.benefitPackageDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBenefitPackageDetail(benefitPackageDetail : BenefitPackageDetail, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.put(`${this.benefitPackageDetailUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBenefitPackageDetail(benefitPackageDetail : BenefitPackageDetail, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.patch(`${this.benefitPackageDetailUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBenefitPackageDetail(benefitPackageId : string): Observable<any> {
        return this.httpClient.delete(`${this.benefitPackageDetailUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}