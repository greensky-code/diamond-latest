/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SiteCodeMaster } from '../api-models/site-code-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SiteCodeMasterService {

    private siteCodeMasterUrl: string = `${environment.apiUrl}/sitecodemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getSiteCodeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<SiteCodeMaster[]> {
        var url = `${this.siteCodeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as SiteCodeMaster[]),
                catchError(this.sharedService.handleError))
    }

    getSiteCodeMaster(siteCode : string): Observable<SiteCodeMaster> {
        return this.httpClient.get(`${this.siteCodeMasterUrl}/${siteCode}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteCodeMaster),
                catchError(this.sharedService.handleError))
    }

    getSiteCodeMastersCount(): Observable<number> {
        var url = `${this.siteCodeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByPanelId(panelId : string): Observable<SiteCodeMaster[]> {
        return this.httpClient.get(`${this.siteCodeMasterUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteCodeMaster),
                catchError(this.sharedService.handleError))
    }
    findByLineOfBusiness(lineOfBusiness : string): Observable<SiteCodeMaster[]> {
        return this.httpClient.get(`${this.siteCodeMasterUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteCodeMaster),
                catchError(this.sharedService.handleError))
    }
    findByIpaId(ipaId : string): Observable<SiteCodeMaster[]> {
        return this.httpClient.get(`${this.siteCodeMasterUrl}/find-by-ipaid/${ipaId}`, {observe: 'response'})
            .pipe(map(response => response.body as SiteCodeMaster),
                catchError(this.sharedService.handleError))
    }




    createSiteCodeMaster(siteCodeMaster : SiteCodeMaster): Observable<any> {
        let body = JSON.stringify(siteCodeMaster);
        return this.httpClient.post(this.siteCodeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateSiteCodeMaster(siteCodeMaster : SiteCodeMaster, siteCode : string): Observable<any> {
        let body = JSON.stringify(siteCodeMaster);
        return this.httpClient.put(`${this.siteCodeMasterUrl}/${siteCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateSiteCodeMaster(siteCodeMaster : SiteCodeMaster, siteCode : string): Observable<any> {
        let body = JSON.stringify(siteCodeMaster);
        return this.httpClient.patch(`${this.siteCodeMasterUrl}/${siteCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteSiteCodeMaster(siteCode : string): Observable<any> {
        return this.httpClient.delete(`${this.siteCodeMasterUrl}/${siteCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}