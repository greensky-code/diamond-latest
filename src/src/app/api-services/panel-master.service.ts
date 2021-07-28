/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PanelMaster } from '../api-models/panel-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class PanelMasterService {

    private panelMasterUrl: string = `${environment.apiUrl}/panelmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPanelMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<PanelMaster[]> {
        var url = `${this.panelMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as PanelMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPanelMaster(panelId : string): Observable<PanelMaster> {
        return this.httpClient.get(`${this.panelMasterUrl}/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as PanelMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPanelMastersCount(): Observable<number> {
        var url = `${this.panelMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createPanelMaster(panelMaster : PanelMaster): Observable<any> {
        let body = JSON.stringify(panelMaster);
        return this.httpClient.post(this.panelMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePanelMaster(panelMaster : PanelMaster, panelId : string): Observable<any> {
        let body = JSON.stringify(panelMaster);
        return this.httpClient.put(`${this.panelMasterUrl}/${panelId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePanelMaster(panelMaster : PanelMaster, panelId : string): Observable<any> {
        let body = JSON.stringify(panelMaster);
        return this.httpClient.patch(`${this.panelMasterUrl}/${panelId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePanelMaster(panelId : string): Observable<any> {
        return this.httpClient.delete(`${this.panelMasterUrl}/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
