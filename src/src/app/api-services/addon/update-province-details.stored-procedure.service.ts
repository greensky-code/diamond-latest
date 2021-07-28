/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UpdateProvinceDetails } from '../../api-models/addon/update-province-details.input-model'
import { UpdateProvinceDetailsViewModel } from '../../api-models/addon/update-province-details.view-model'

import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class UpdateProvinceDetailsService {

    private updateProvinceDetailsUrl: string = `${environment.apiUrl}/updateprovincedetail`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }


    updateProvinceDetails(updateProvinceDetails : UpdateProvinceDetails): Promise<UpdateProvinceDetailsViewModel[]> {
        let body = JSON.stringify(updateProvinceDetails);
        return this.httpClient.post(this.updateProvinceDetailsUrl, body, { headers: this.contentHeaders })
            .toPromise()
            .subscribe(response => response)
            .catch(this.handleError)
    }


    private handleError(error: any): Promise<any> {
        var errorMessage = "";
        if(parseInt(error.status) == 0) {
            errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
        }
        else if (parseInt(error.status) == 404) {
            errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
        }
        else if (parseInt(error.status) == 500) {
            errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
        }
        else if (parseInt(error.status) == 400) {
            errorMessage = `An error occurred while accessing URL ${error.url}. Bad Request`;
        }
        else {
            errorMessage = `An error occurred while accessing URL ${error.url}. ${error.statusText}`;
        }

        return Promise.reject(errorMessage);
   }
}