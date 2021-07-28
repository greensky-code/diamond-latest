/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {SharedService} from "../../../shared/services/shared.service";
import {Observable} from "rxjs/Rx";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {ProcSavePricingAccntCode} from "../../../api-models/addon/proc-save-pricing-accnt-code.input-model";
import {ProcSavePricingAccntCodeViewModel} from "../../../api-models/addon/proc-save-pricing-accnt-code.view-model";

@Injectable({
    providedIn: "root"
})
export class ProcSavePricingAccntCodeService {

    private procSavePricingAccntCodeUrl: string = `${environment.apiUrl}/procsavepricingaccntcode`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }


    procSavePricingAccntCode(procSavePricingAccntCode: ProcSavePricingAccntCode): Observable<ProcSavePricingAccntCodeViewModel[]> {
        let body = JSON.stringify(procSavePricingAccntCode);
        return this.httpClient.post(this.procSavePricingAccntCodeUrl, body, {headers: this.contentHeaders}).pipe(map(resp => resp),
            catchError(this.sharedService.handleError))
    }
}
