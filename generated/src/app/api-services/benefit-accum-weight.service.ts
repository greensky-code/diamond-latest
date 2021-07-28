/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitAccumWeight } from '../api-models/benefit-accum-weight.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BenefitAccumWeightService {

    private benefitAccumWeightUrl: string = `${environment.apiUrl}/benefitaccumweights`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitAccumWeights(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BenefitAccumWeight[]> {
        var url = `${this.benefitAccumWeightUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefitAccumWeight[]),
                catchError(this.sharedService.handleError))
    }

    getBenefitAccumWeight(accumulatorId : string): Observable<BenefitAccumWeight> {
        return this.httpClient.get(`${this.benefitAccumWeightUrl}/${accumulatorId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitAccumWeight),
                catchError(this.sharedService.handleError))
    }

    getBenefitAccumWeightsCount(): Observable<number> {
        var url = `${this.benefitAccumWeightUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createBenefitAccumWeight(benefitAccumWeight : BenefitAccumWeight): Observable<any> {
        let body = JSON.stringify(benefitAccumWeight);
        return this.httpClient.post(this.benefitAccumWeightUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBenefitAccumWeight(benefitAccumWeight : BenefitAccumWeight, accumulatorId : string): Observable<any> {
        let body = JSON.stringify(benefitAccumWeight);
        return this.httpClient.put(`${this.benefitAccumWeightUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBenefitAccumWeight(benefitAccumWeight : BenefitAccumWeight, accumulatorId : string): Observable<any> {
        let body = JSON.stringify(benefitAccumWeight);
        return this.httpClient.patch(`${this.benefitAccumWeightUrl}/${accumulatorId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBenefitAccumWeight(accumulatorId : string): Observable<any> {
        return this.httpClient.delete(`${this.benefitAccumWeightUrl}/${accumulatorId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}