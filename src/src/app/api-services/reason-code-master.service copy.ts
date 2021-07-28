/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReasonCodeMaster } from '../api-models/reason-code-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReasonCodeMasterService {

    private reasonCodeMasterUrl: string = `${environment.apiUrl}/reasoncodemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }
    getReasonCodeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Promise<ReasonCodeMaster[]> {
        var url = `${this.reasonCodeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .toPromise()
            .then(response => response.body as ReasonCodeMaster[])
            .catch(this.handleError)
    }

    getReasonCodeMaster(reasonCode : string): Promise<ReasonCodeMaster> {
        return this.httpClient.get(`${this.reasonCodeMasterUrl}/${reasonCode}`, {observe: 'response'})
            .toPromise()
            .then(response => response.body as ReasonCodeMaster)
            .catch(this.handleError)
    }

    getReasonCodeMastersCount(): Promise<number> {
        var url = `${this.reasonCodeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .toPromise()
            .then(response => response.body as number)
            .catch(this.handleError)
    }





    createReasonCodeMaster(reasonCodeMaster : ReasonCodeMaster): Promise<any> {
        let body = JSON.stringify(reasonCodeMaster);
        return this.httpClient.post(this.reasonCodeMasterUrl, body, { headers: this.contentHeaders })
            .toPromise()
            .then(response => response)
            .catch(this.handleError)
    }

    updateReasonCodeMaster(reasonCodeMaster : ReasonCodeMaster, reasonCode : string): Promise<any> {
        let body = JSON.stringify(reasonCodeMaster);
        return this.httpClient.put(`${this.reasonCodeMasterUrl}/${reasonCode}`, body, { headers: this.contentHeaders })
            .toPromise()
            .then(response => response)
            .catch(this.handleError)
    }

    partiallyUpdateReasonCodeMaster(reasonCodeMaster : ReasonCodeMaster, reasonCode : string): Promise<any> {
        let body = JSON.stringify(reasonCodeMaster);
        return this.httpClient.patch(`${this.reasonCodeMasterUrl}/${reasonCode}`, body, { headers: this.contentHeaders })
            .toPromise()
            .then(response => response)
            .catch(this.handleError)
    }

    deleteReasonCodeMaster(reasonCode : string): Promise<any> {
        return this.httpClient.delete(`${this.reasonCodeMasterUrl}/${reasonCode}`, {observe: 'response'})
            .toPromise()
            .then(response => response.body)
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