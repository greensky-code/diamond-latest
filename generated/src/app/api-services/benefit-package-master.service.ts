/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitPackageMaster } from '../api-models/benefit-package-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BenefitPackageMasterService {

    private benefitPackageMasterUrl: string = `${environment.apiUrl}/benefitpackagemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitPackageMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BenefitPackageMaster[]> {
        var url = `${this.benefitPackageMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefitPackageMaster[]),
                catchError(this.sharedService.handleError))
    }

    getBenefitPackageMaster(benefitPackageId : string): Observable<BenefitPackageMaster> {
        return this.httpClient.get(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitPackageMaster),
                catchError(this.sharedService.handleError))
    }

    getBenefitPackageMastersCount(): Observable<number> {
        var url = `${this.benefitPackageMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createBenefitPackageMaster(benefitPackageMaster : BenefitPackageMaster): Observable<any> {
        let body = JSON.stringify(benefitPackageMaster);
        return this.httpClient.post(this.benefitPackageMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBenefitPackageMaster(benefitPackageMaster : BenefitPackageMaster, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitPackageMaster);
        return this.httpClient.put(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBenefitPackageMaster(benefitPackageMaster : BenefitPackageMaster, benefitPackageId : string): Observable<any> {
        let body = JSON.stringify(benefitPackageMaster);
        return this.httpClient.patch(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBenefitPackageMaster(benefitPackageId : string): Observable<any> {
        return this.httpClient.delete(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}