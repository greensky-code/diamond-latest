/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';


import {catchError, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {SharedService} from "../../shared/services/shared.service";
import {CiebAddonMeConfig} from "../../api-models/addon/cieb-addon-me-config";

@Injectable({
    providedIn: "root"
})
export class CiebAddonMeConfigService {

    private ciebAddonMeConfigUrl: string = `${environment.apiUrl}/ciebaddonmeconfigs`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebAddonMeConfig(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<CiebAddonMeConfig[]> {
        var url = `${this.ciebAddonMeConfigUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddonMeConfig[]),
                catchError(this.sharedService.handleError))
    }

    findByCiebAddonMeConfigByCodeType( codeType: string): Observable<CiebAddonMeConfig[]> {
        const url = `${this.ciebAddonMeConfigUrl}/find-by-codeType/${codeType}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddonMeConfig[]),
                catchError(this.sharedService.handleError))
    }

    findOptionsByCodeType( codeType: string): Observable<CiebAddonMeConfig[]> {
        const url = `${this.ciebAddonMeConfigUrl}/getOptions/${codeType}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as Object[]),
                catchError(this.sharedService.handleError))
    }

    findOptionsByCodeTypeAndCode( codeType: string, code: string): Observable<CiebAddonMeConfig[]> {
        const url = `${this.ciebAddonMeConfigUrl}/getOptions/${codeType}/${code}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as Object[]),
                catchError(this.sharedService.handleError))
    }
}
