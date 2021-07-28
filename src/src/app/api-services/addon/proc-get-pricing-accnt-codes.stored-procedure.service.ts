/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {environment} from "../../../environments/environment";
import {ProcGetPricingAccntCodesViewModel} from "../../api-models/addon/proc-get-pricing-accnt-codes.view-model";
import {SharedService} from "../../shared/services/shared.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ProcGetPricingAccntCodesService {

    private procGetPricingAccntCodesUrl: string = `${environment.apiUrl}/procgetpricingaccntcodes`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }


    procGetPricingAccntCodes(groupId: string): Observable<ProcGetPricingAccntCodesViewModel[]> {
        const params: HttpParams = new HttpParams().set('groupId', groupId);
        return this.httpClient.post(this.procGetPricingAccntCodesUrl, null, {headers: this.contentHeaders, params })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }


}
