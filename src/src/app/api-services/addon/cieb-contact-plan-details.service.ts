/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import { CiebContactPlanDetailsModel } from '../../api-models/addon/cieb-contacts-plan-details.model';
import { ProcGetGroupPlanInput } from '../../api-models/addon/proc-get-group-plan.input-model';

@Injectable({
    providedIn: "root"
})
export class CiebContactPlanDetailsService {

    private pricingAccntCodesUrl: string = `${environment.apiUrl}/procgetgroupplandetails`;

    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebPricingAccntCodes(procGetGroupPlanInput: ProcGetGroupPlanInput, usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebContactPlanDetailsModel[]> {
        var url = `${this.pricingAccntCodesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.post(url, procGetGroupPlanInput, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactPlanDetailsModel[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPricingAccntCodesBySeqPricingAccntId(seqPricingAccntId: number): Observable<CiebContactPlanDetailsModel> {
        return this.httpClient.get(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebContactPlanDetailsModel),
                catchError(this.sharedService.handleError))
    }

    getCiebContactModelsCount(): Observable<number> {
        var url = `${this.pricingAccntCodesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }


    createCiebPricingAccntCode(CiebContactPlanDetailsModel: CiebContactPlanDetailsModel): Observable<any> {
        let body = JSON.stringify(CiebContactPlanDetailsModel);
        return this.httpClient.post(this.pricingAccntCodesUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebPricingAccntCode(CiebContactPlanDetailsModel: CiebContactPlanDetailsModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(CiebContactPlanDetailsModel);
        return this.httpClient.put(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebPricingAccntCode(CiebContactPlanDetailsModel: CiebContactPlanDetailsModel, seqPricingAccntId: number): Observable<any> {
        let body = JSON.stringify(CiebContactPlanDetailsModel);
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
