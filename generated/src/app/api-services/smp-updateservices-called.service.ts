/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SmpUpdateservicesCalled } from '../api-models/smp-updateservices-called.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SmpUpdateservicesCalledService {

    private smpUpdateservicesCalledUrl: string = `${environment.apiUrl}/smpupdateservicescalleds`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSmpUpdateservicesCalleds(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SmpUpdateservicesCalled[]> {
        var url = `${this.smpUpdateservicesCalledUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SmpUpdateservicesCalled[]),
                catchError(this.sharedService.handleError))
    }

    getSmpUpdateservicesCalled(owner : string): Observable<SmpUpdateservicesCalled> {
        return this.httpClient.get(`${this.smpUpdateservicesCalledUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body as SmpUpdateservicesCalled),
                catchError(this.sharedService.handleError))
    }

    getSmpUpdateservicesCalledsCount(): Observable<number> {
        var url = `${this.smpUpdateservicesCalledUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createSmpUpdateservicesCalled(smpUpdateservicesCalled : SmpUpdateservicesCalled): Observable<any> {
        let body = JSON.stringify(smpUpdateservicesCalled);
        return this.httpClient.post(this.smpUpdateservicesCalledUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSmpUpdateservicesCalled(smpUpdateservicesCalled : SmpUpdateservicesCalled, owner : string): Observable<any> {
        let body = JSON.stringify(smpUpdateservicesCalled);
        return this.httpClient.put(`${this.smpUpdateservicesCalledUrl}/${owner}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSmpUpdateservicesCalled(smpUpdateservicesCalled : SmpUpdateservicesCalled, owner : string): Observable<any> {
        let body = JSON.stringify(smpUpdateservicesCalled);
        return this.httpClient.patch(`${this.smpUpdateservicesCalledUrl}/${owner}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSmpUpdateservicesCalled(owner : string): Observable<any> {
        return this.httpClient.delete(`${this.smpUpdateservicesCalledUrl}/${owner}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}