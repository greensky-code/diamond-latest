/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";

import {CiebFieldValidationsModel} from '../../api-models/addon/cieb-field-validations.model';

@Injectable({
    providedIn: "root"
})
export class AddonsValidationsService {

    private pricingAccntCodesUrl: string = `${environment.apiUrl}/ciebcontacts`;
    private addonValidationUrl: string = `${environment.apiUrl}/ciebfieldvalidations/cieb-field-validations`;

    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAddressValidationsByCountryCode(countryCode: string): Observable<CiebFieldValidationsModel[]> {
        var url = `${this.addonValidationUrl}/${countryCode}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebFieldValidationsModel[]),
                catchError(this.sharedService.handleError))
    }

    getCiebPricingAccntCodesBySeqPricingAccntId(seqPricingAccntId: number): Observable<CiebFieldValidationsModel> {
        return this.httpClient.get(`${this.pricingAccntCodesUrl}/${seqPricingAccntId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebFieldValidationsModel),
                catchError(this.sharedService.handleError))
    }


}
