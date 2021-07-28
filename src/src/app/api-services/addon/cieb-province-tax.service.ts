/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CiebProvinceTaxModel} from "../../api-models/addon/cieb-province-tax.model";
import { CiebProvinceTaxSchModel } from '../../api-models/addon/cieb-province-tax-sch.model';

@Injectable({
    providedIn: "root"
})
export class CiebProvinceTaxService {

    private provinceTaxUrl: string = `${environment.apiUrl}/ciebgrptaxdtl`;

    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebProvinceTaxes(seqGroupId: number, usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebProvinceTaxModel[]> {
        var url = `${this.provinceTaxUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}&seqGroupId=${seqGroupId}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebProvinceTaxModel[]),
                catchError(this.sharedService.handleError))
    }

    getCiebProvinceTaxesByseqTaxDetailId(seqTaxDetailId: number): Observable<CiebProvinceTaxModel> {
        return this.httpClient.get(`${this.provinceTaxUrl}/${seqTaxDetailId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebProvinceTaxModel),
                catchError(this.sharedService.handleError))
    }

    getCiebProvinceTaxesModelsCount(): Observable<number> {
        var url = `${this.provinceTaxUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebProvinceTax(CiebProvinceTaxModel: CiebProvinceTaxModel): Observable<any> {
        let body = JSON.stringify(CiebProvinceTaxModel);
        return this.httpClient.post(this.provinceTaxUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebProvinceTax(CiebProvinceTaxModel: CiebProvinceTaxModel, seqTaxDetailId: number): Observable<any> {
        let body = JSON.stringify(CiebProvinceTaxModel);
        return this.httpClient.put(`${this.provinceTaxUrl}/${seqTaxDetailId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPricingAccntCode(CiebProvinceTaxModel: CiebProvinceTaxModel, seqTaxDetailId: number): Observable<any> {
        let body = JSON.stringify(CiebProvinceTaxModel);
        return this.httpClient.patch(`${this.provinceTaxUrl}/${seqTaxDetailId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPricingAccntCode(seqTaxDetailId: number): Observable<any> {
        return this.httpClient.delete(`${this.provinceTaxUrl}/${seqTaxDetailId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }

    getCiebProvinceTaxeSches(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebProvinceTaxSchModel[]> {
        var url = `${environment.apiUrl}/ciebprovincetaxsches/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebProvinceTaxSchModel[]),
                catchError(this.sharedService.handleError))
    }

}
