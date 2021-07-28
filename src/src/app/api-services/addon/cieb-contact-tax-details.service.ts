/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import { ProcGetGroupTaxInput } from '../../api-models/addon/proc-get-group-tax.input-mode';
import { CiebContactTaxDetailsModel } from '../../api-models/addon/cieb-contacts-tax-details.model';

@Injectable({
    providedIn: "root"
})
export class CiebContactTaxDetailsService {

    private pricingAccntCodesUrl: string = `${environment.apiUrl}/procgetvatdetails`;

    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPricingAccntCodes(procGetGroupTaxInput: ProcGetGroupTaxInput, usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebContactTaxDetailsModel[]> {
        var url = `${this.pricingAccntCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.post(url, procGetGroupTaxInput, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactTaxDetailsModel[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPricingAccntCodesBySeqPricingAccntId(seqPricingAccntId: number): Observable<CiebContactTaxDetailsModel> {
        return this.httpClient.get(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactTaxDetailsModel),
                catchError(this.sharedService.handleError))
    }

    getCiebContactModelsCount(): Observable<number> {
        var url = `${this.pricingAccntCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebPricingAccntCode(CiebContactTaxDetailsModel: CiebContactTaxDetailsModel): Observable<any> {
        let body = JSON.stringify(CiebContactTaxDetailsModel);
        return this.httpClient.post(this.pricingAccntCodesUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebPricingAccntCode(CiebContactTaxDetailsModel: CiebContactTaxDetailsModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(CiebContactTaxDetailsModel);
        return this.httpClient.put(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPricingAccntCode(CiebContactTaxDetailsModel: CiebContactTaxDetailsModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(CiebContactTaxDetailsModel);
        return this.httpClient.patch(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebPricingAccntCode(seqPricingAccntId: number): Observable<any> {
        return this.httpClient.delete(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
