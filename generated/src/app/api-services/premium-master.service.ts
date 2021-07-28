/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremiumMaster } from '../api-models/premium-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PremiumMasterService {

    private premiumMasterUrl: string = `${environment.apiUrl}/premiummasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPremiumMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PremiumMaster[]> {
        var url = `${this.premiumMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster[]),
                catchError(this.sharedService.handleError))
    }

    getPremiumMaster(seqPremId : number): Observable<PremiumMaster> {
        return this.httpClient.get(`${this.premiumMasterUrl}/${seqPremId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }

    getPremiumMastersCount(): Observable<number> {
        var url = `${this.premiumMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByBenefitPackageId(benefitPackageId : string): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-benefitpackageid/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }
    findByLineOfBusiness(lineOfBusiness : string): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }
    findByPriceRule2(priceRule2 : string): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-pricerule2/${priceRule2}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }
    findBySeqGroupId(seqGroupId : number): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }
    findByPriceRule1(priceRule1 : string): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-pricerule1/${priceRule1}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }
    findByCompanyCode(companyCode : string): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-companycode/${companyCode}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }
    findByAdFeeCompCode(adFeeCompCode : string): Observable<PremiumMaster[]> {
        return this.httpClient.get(`${this.premiumMasterUrl}/find-by-adfeecompcode/${adFeeCompCode}`, {observe: 'response'})
            .pipe(map(response => response.body as PremiumMaster),
                catchError(this.sharedService.handleError))
    }




    createPremiumMaster(premiumMaster : PremiumMaster): Observable<any> {
        let body = JSON.stringify(premiumMaster);
        return this.httpClient.post(this.premiumMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updatePremiumMaster(premiumMaster : PremiumMaster, seqPremId : number): Observable<any> {
        let body = JSON.stringify(premiumMaster);
        return this.httpClient.put(`${this.premiumMasterUrl}/${seqPremId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdatePremiumMaster(premiumMaster : PremiumMaster, seqPremId : number): Observable<any> {
        let body = JSON.stringify(premiumMaster);
        return this.httpClient.patch(`${this.premiumMasterUrl}/${seqPremId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deletePremiumMaster(seqPremId : number): Observable<any> {
        return this.httpClient.delete(`${this.premiumMasterUrl}/${seqPremId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}