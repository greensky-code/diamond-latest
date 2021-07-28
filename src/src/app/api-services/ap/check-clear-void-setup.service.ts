/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/services/shared.service';
import { CheckClearVoidSetup } from '../../api-models/ap/check-clear-void-setup.model';


@Injectable({
    providedIn: "root"
})
export class CheckClearVoidSetupService {

    private checkClearVoidSetupUrl: string = `${environment.apiUrl}/checkclearvoidsetups`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCheckClearVoidSetups(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CheckClearVoidSetup[]> {
        var url = `${this.checkClearVoidSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CheckClearVoidSetup[]),
                catchError(this.sharedService.handleError))
    }

    findAllCheckClearVoidSetup(): Observable<any[]> {
        var url = `${this.checkClearVoidSetupUrl}/findAllCheckClearVoidSetup`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as any[]),
                catchError(this.sharedService.handleError))
    }

    getNextJobId(): Observable<string> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.httpClient.get(`${this.checkClearVoidSetupUrl}/getNextJobId`, { headers, responseType: 'text'})
            .pipe(map(response => response as string)
                ,catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    getCheckClearVoidSetup(jobId : string): Observable<CheckClearVoidSetup> {
        return this.httpClient.get(`${this.checkClearVoidSetupUrl}/${jobId}`, {observe: 'response'})
            .pipe(map(response => response.body as CheckClearVoidSetup),
                catchError(this.sharedService.handleError))
    }

    getCheckClearVoidSetupsCount(): Observable<number> {
        var url = `${this.checkClearVoidSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    createCheckClearVoidSetup(checkClearVoidSetup : CheckClearVoidSetup): Observable<any> {
        let body = JSON.stringify(checkClearVoidSetup);
        return this.httpClient.post(this.checkClearVoidSetupUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCheckClearVoidSetup(checkClearVoidSetup : CheckClearVoidSetup, jobId : string): Observable<any> {
        let body = JSON.stringify(checkClearVoidSetup);
        return this.httpClient.put(`${this.checkClearVoidSetupUrl}/${jobId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCheckClearVoidSetup(checkClearVoidSetup : CheckClearVoidSetup, jobId : string): Observable<any> {
        let body = JSON.stringify(checkClearVoidSetup);
        return this.httpClient.patch(`${this.checkClearVoidSetupUrl}/${jobId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCheckClearVoidSetup(jobId : string): Observable<any> {
        return this.httpClient.delete(`${this.checkClearVoidSetupUrl}/${jobId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}