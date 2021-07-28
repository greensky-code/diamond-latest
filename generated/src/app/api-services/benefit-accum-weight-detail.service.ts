/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitAccumWeightDetail } from '../api-models/benefit-accum-weight-detail.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BenefitAccumWeightDetailService {

    private benefitAccumWeightDetailUrl: string = `${environment.apiUrl}/benefitaccumweightdetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitAccumWeightDetails(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BenefitAccumWeightDetail[]> {
        var url = `${this.benefitAccumWeightDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefitAccumWeightDetail[]),
                catchError(this.sharedService.handleError))
    }

    getBenefitAccumWeightDetail(accumulatorId : string): Observable<BenefitAccumWeightDetail> {
        return this.httpClient.get(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitAccumWeightDetail),
                catchError(this.sharedService.handleError))
    }

    getBenefitAccumWeightDetailsCount(): Observable<number> {
        var url = `${this.benefitAccumWeightDetailUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByAccumulatorId(accumulatorId : string): Observable<BenefitAccumWeightDetail[]> {
        return this.httpClient.get(`${this.benefitAccumWeightDetailUrl}/find-by-accumulatorid/${accumulatorId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitAccumWeightDetail),
                catchError(this.sharedService.handleError))
    }
    findByThruValue(thruValue : string): Observable<BenefitAccumWeightDetail[]> {
        return this.httpClient.get(`${this.benefitAccumWeightDetailUrl}/find-by-thruvalue/${thruValue}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitAccumWeightDetail),
                catchError(this.sharedService.handleError))
    }
    findByFromValue(fromValue : string): Observable<BenefitAccumWeightDetail[]> {
        return this.httpClient.get(`${this.benefitAccumWeightDetailUrl}/find-by-fromvalue/${fromValue}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitAccumWeightDetail),
                catchError(this.sharedService.handleError))
    }




    createBenefitAccumWeightDetail(benefitAccumWeightDetail : BenefitAccumWeightDetail): Observable<any> {
        let body = JSON.stringify(benefitAccumWeightDetail);
        return this.httpClient.post(this.benefitAccumWeightDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBenefitAccumWeightDetail(benefitAccumWeightDetail : BenefitAccumWeightDetail, accumulatorId : string): Observable<any> {
        let body = JSON.stringify(benefitAccumWeightDetail);
        return this.httpClient.put(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBenefitAccumWeightDetail(benefitAccumWeightDetail : BenefitAccumWeightDetail, accumulatorId : string): Observable<any> {
        let body = JSON.stringify(benefitAccumWeightDetail);
        return this.httpClient.patch(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBenefitAccumWeightDetail(accumulatorId : string): Observable<any> {
        return this.httpClient.delete(`${this.benefitAccumWeightDetailUrl}/${accumulatorId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}