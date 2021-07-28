/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {FuncChkPlanCode} from '../../api-models/addon/func-chk-plan-code.input-model'
import {FuncChkPlanCodeViewModel} from '../../api-models/addon/func-chk-plan-code.view-model'

import {environment} from '../../../environments/environment'

@Injectable()
export class FuncChkPlanCodeService {

    private funcChkPlanCodeUrl: string = `${environment.apiUrl}/funcchkplancodes`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }


    funcChkPlanCode(funcChkPlanCode: FuncChkPlanCode): Promise<FuncChkPlanCodeViewModel[]> {
        let body = JSON.stringify(funcChkPlanCode);
        return this.httpClient.post(this.funcChkPlanCodeUrl, body, {headers: this.contentHeaders})
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
