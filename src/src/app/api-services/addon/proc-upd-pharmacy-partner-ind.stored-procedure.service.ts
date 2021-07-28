/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ProcUpdPharmacyPartnerInd} from '../../api-models/addon/proc-upd-pharmacy-partner-ind.input-model'
import {ProcUpdPharmacyPartnerIndViewModel} from '../../api-models/addon/proc-upd-pharmacy-partner-ind.view-model'
import {environment} from '../../../environments/environment'

@Injectable()
export class ProcUpdPharmacyPartnerIndService {

    private procUpdPharmacyPartnerIndUrl: string = `${environment.apiUrl}/procupdpharmacypartnerinds`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }


    procUpdPharmacyPartnerInd(procUpdPharmacyPartnerInd: ProcUpdPharmacyPartnerInd): Promise<ProcUpdPharmacyPartnerIndViewModel[]> {
        let body = JSON.stringify(procUpdPharmacyPartnerInd);
        return this.httpClient.post(this.procUpdPharmacyPartnerIndUrl, body, {headers: this.contentHeaders})
            .toPromise()
            .subscribe(response => response)
            .catch(this.handleError)
    }


    private handleError(error: any): Promise<any> {
        var errorMessage = '';
        if (parseInt(error.status) == 0) {
            errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
        } else if (parseInt(error.status) == 404) {
            errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
        } else if (parseInt(error.status) == 500) {
            errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
        } else if (parseInt(error.status) == 400) {
            errorMessage = `An error occurred while accessing URL ${error.url}. Bad Request`;
        } else {
            errorMessage = `An error occurred while accessing URL ${error.url}. ${error.statusText}`;
        }

        return Promise.reject(errorMessage);
    }
}
