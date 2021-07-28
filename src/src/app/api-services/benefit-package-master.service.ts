/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BenefitPackageMaster } from '../api-models/benefit-package-master.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';
import { userValidCodeModel } from '../api-models';

@Injectable({
    providedIn: "root"
})
export class BenefitPackageMasterService {

    private benefitPackageMasterUrl: string = `${environment.apiUrl}/benefitpackagemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }


    getBenefitPackageMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<BenefitPackageMaster[]> {
        var url = `${this.benefitPackageMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitPackageMaster(benefitPackageId: string): Observable<BenefitPackageMaster> {
        return this.httpClient.get(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitPackageMastersCount(): Observable<number> {
        var url = `${this.benefitPackageMasterUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createBenefitPackageMaster(benefitPackageMaster: BenefitPackageMaster): Observable<any> {
        let body = JSON.stringify(benefitPackageMaster);
        return this.httpClient.post(this.benefitPackageMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefitPackageMaster(benefitPackageMaster: BenefitPackageMaster, benefitPackageId: string): Observable<any> {
        let body = JSON.stringify(benefitPackageMaster);
        return this.httpClient.put(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateBenefitPackageMaster(benefitPackageMaster: BenefitPackageMaster, benefitPackageId: string): Observable<any> {
        let body = JSON.stringify(benefitPackageMaster);
        return this.httpClient.patch(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteBenefitPackageMaster(benefitPackageId: string): Observable<any> {
        return this.httpClient.delete(`${this.benefitPackageMasterUrl}/${benefitPackageId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getUserDefinedDataTypes(): Observable<userValidCodeModel[]> {
        return this.httpClient.get(`${environment.apiUrl}/userdefinedvaldtcodes/user-defined-type/user_defined_1/0`, {observe: 'response'})
            .pipe(map(response => response.body as userValidCodeModel[]),
                catchError(this.sharedService.handleError))
    }

    getUserDefined(): Observable<object[]> {
        return this.httpClient.get(`${environment.apiUrl}/userdefinedvaldtcodes/user-defined-type-rsn-kkk`, {observe: 'response'})
            .pipe(map(response => response.body as object[]),
                catchError(this.sharedService.handleError))
    }
}
