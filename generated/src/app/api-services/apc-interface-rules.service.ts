/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ApcInterfaceRules } from '../api-models/apc-interface-rules.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApcInterfaceRulesService {

    private apcInterfaceRulesUrl: string = `${environment.apiUrl}/apcinterfaceruleses`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getApcInterfaceRuleses(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ApcInterfaceRules[]> {
        var url = `${this.apcInterfaceRulesUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ApcInterfaceRules[]),
                catchError(this.sharedService.handleError))
    }

    getApcInterfaceRules(lineOfBusiness : string): Observable<ApcInterfaceRules> {
        return this.httpClient.get(`${this.apcInterfaceRulesUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ApcInterfaceRules),
                catchError(this.sharedService.handleError))
    }

    getApcInterfaceRulesesCount(): Observable<number> {
        var url = `${this.apcInterfaceRulesUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<ApcInterfaceRules[]> {
        return this.httpClient.get(`${this.apcInterfaceRulesUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as ApcInterfaceRules),
                catchError(this.sharedService.handleError))
    }




    createApcInterfaceRules(apcInterfaceRules : ApcInterfaceRules): Observable<any> {
        let body = JSON.stringify(apcInterfaceRules);
        return this.httpClient.post(this.apcInterfaceRulesUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateApcInterfaceRules(apcInterfaceRules : ApcInterfaceRules, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(apcInterfaceRules);
        return this.httpClient.put(`${this.apcInterfaceRulesUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateApcInterfaceRules(apcInterfaceRules : ApcInterfaceRules, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(apcInterfaceRules);
        return this.httpClient.patch(`${this.apcInterfaceRulesUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteApcInterfaceRules(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.apcInterfaceRulesUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}