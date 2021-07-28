/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BenefitPackageDetail } from '../api-models/benefit-package-detail.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class BenefitPackageDetailService {

    private benefitPackageDetailUrl: string = `${environment.apiUrl}/benefitpackagedetails`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitPackageDetails(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<BenefitPackageDetail[]> {
        var url = `${this.benefitPackageDetailUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitPackageDetail(benefitPackageId: string): Observable<BenefitPackageDetail> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/${benefitPackageId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findPackageDetailByPackageId(packageId: string): Observable<BenefitPackageDetail[]> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-by-benefitpackageid/${packageId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBenefitPackageDetailsCount(): Observable<number> {
        var url = `${this.benefitPackageDetailUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByBenefitRule(benefitRule: string): Observable<BenefitPackageDetail[]> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-by-benefitrule/${benefitRule}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByBenefitPackageId(benefitPackageId: string): Observable<BenefitPackageDetail[]> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-by-benefitpackageid/${benefitPackageId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createBenefitPackageDetail(benefitPackageDetail: BenefitPackageDetail): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.post(this.benefitPackageDetailUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefitPackageDetail(benefitPackageDetail: BenefitPackageDetail, benefitPackageId: string): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.put(`${this.benefitPackageDetailUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefitPackageDetailV2(benefitPackageDetail: BenefitPackageDetail,seqBenPackage:any,benefitPackageId: string): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.put(`${this.benefitPackageDetailUrl}/v2/${seqBenPackage}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateBenefitPackageDetail(benefitPackageDetail: BenefitPackageDetail, benefitPackageId: string): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.patch(`${this.benefitPackageDetailUrl}/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteBenefitPackageDetail(benefitPackageId: string = "", seqBenPackage: string = ""): Observable<any> {
        return this.httpClient.delete(`${this.benefitPackageDetailUrl}/${seqBenPackage}/${benefitPackageId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBenefitPackageDetailByPackageId(benefitPackageId: string): Observable<BenefitPackageDetail[]> {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-benefit-packege-detail/${benefitPackageId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageDetail[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByBenefitPackageIdAndSeqBenPackage(benefitPackageId: any, seqBenPackage: any) {
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-by-benefitpackageid-seqbenpackage/${benefitPackageId}/${seqBenPackage}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitPackageDetail),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createBenefitPackageDetailV2(benefitPackageDetail: BenefitPackageDetail): Observable<any> {
        let body = JSON.stringify(benefitPackageDetail);
        return this.httpClient.post(this.benefitPackageDetailUrl+"/create", body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

     getBenefitPackageDetailsRules(benefitPackageId:string): Observable<any> {
        let params = new HttpParams();
        params = params.append('benefitPackageId', benefitPackageId);
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-benefitpackagedetailrule`, {
            params: params,
            headers: this.contentHeaders
        }).pipe(map(resp => resp),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    
     getBenefitPackage_babv(benefitPackageId:string): Observable<any> {
        let params = new HttpParams();
        params = params.append('benefitPackageId', benefitPackageId);
        return this.httpClient.get(`${this.benefitPackageDetailUrl}/find-benefitpackage_babv`, {
            params: params,
            headers: this.contentHeaders
        }).pipe(map(resp => resp),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
   
   
 

    copyBenfitPackageDetails(benefitPackageId: any, details: any[]) {
        let body = JSON.stringify(details);
        return this.httpClient.post(`${this.benefitPackageDetailUrl}/copybenefitpackagedetails/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

  
    deleteMultipleBenefitPackagesDetail(benefitPackageId: string, seqBenPackages: string[]): Observable<any> {
        let body = JSON.stringify(seqBenPackages);
        return this.httpClient.post(`${this.benefitPackageDetailUrl}/delete/${benefitPackageId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

}
