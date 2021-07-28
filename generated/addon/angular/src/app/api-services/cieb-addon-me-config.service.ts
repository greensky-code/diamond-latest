/* Copyright (c) 2021 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebAddonMeConfig } from '../api-models/cieb-addon-me-config.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class CiebAddonMeConfigService {

    private ciebAddonMeConfigUrl: string = `${environment.apiUrl}/ciebaddonmeconfigs`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebAddonMeConfigs(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<CiebAddonMeConfig[]> {
        var url = `${this.ciebAddonMeConfigUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddonMeConfig[]),
                catchError(this.sharedService.handleError))
    }

    getCiebAddonMeConfig(seqCodeId : number): Observable<CiebAddonMeConfig> {
        return this.httpClient.get(`${this.ciebAddonMeConfigUrl}/${seqCodeId}`, {observe: 'response'})
            .pipe(map(response => response.body as CiebAddonMeConfig),
                catchError(this.sharedService.handleError))
    }

    getCiebAddonMeConfigsCount(): Observable<number> {
        var url = `${this.ciebAddonMeConfigUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createCiebAddonMeConfig(ciebAddonMeConfig : CiebAddonMeConfig): Observable<any> {
        let body = JSON.stringify(ciebAddonMeConfig);
        return this.httpClient.post(this.ciebAddonMeConfigUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateCiebAddonMeConfig(ciebAddonMeConfig : CiebAddonMeConfig, seqCodeId : number): Observable<any> {
        let body = JSON.stringify(ciebAddonMeConfig);
        return this.httpClient.put(`${this.ciebAddonMeConfigUrl}/${seqCodeId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateCiebAddonMeConfig(ciebAddonMeConfig : CiebAddonMeConfig, seqCodeId : number): Observable<any> {
        let body = JSON.stringify(ciebAddonMeConfig);
        return this.httpClient.patch(`${this.ciebAddonMeConfigUrl}/${seqCodeId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteCiebAddonMeConfig(seqCodeId : number): Observable<any> {
        return this.httpClient.delete(`${this.ciebAddonMeConfigUrl}/${seqCodeId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}