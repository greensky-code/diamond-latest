/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GroupPanel } from '../api-models/group-panel.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GroupPanelService {

    private groupPanelUrl: string = `${environment.apiUrl}/grouppanels`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupPanels(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GroupPanel[]> {
        var url = `${this.groupPanelUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GroupPanel[]),
                catchError(this.sharedService.handleError))
    }

    getGroupPanel(seqGroupPanel : number): Observable<GroupPanel> {
        return this.httpClient.get(`${this.groupPanelUrl}/${seqGroupPanel}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupPanel),
                catchError(this.sharedService.handleError))
    }

    getGroupPanelsCount(): Observable<number> {
        var url = `${this.groupPanelUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGroupId(seqGroupId : number): Observable<GroupPanel[]> {
        return this.httpClient.get(`${this.groupPanelUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupPanel),
                catchError(this.sharedService.handleError))
    }
    findByPanelId(panelId : string): Observable<GroupPanel[]> {
        return this.httpClient.get(`${this.groupPanelUrl}/find-by-panelid/${panelId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupPanel),
                catchError(this.sharedService.handleError))
    }




    createGroupPanel(groupPanel : GroupPanel): Observable<any> {
        let body = JSON.stringify(groupPanel);
        return this.httpClient.post(this.groupPanelUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGroupPanel(groupPanel : GroupPanel, seqGroupPanel : number): Observable<any> {
        let body = JSON.stringify(groupPanel);
        return this.httpClient.put(`${this.groupPanelUrl}/${seqGroupPanel}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGroupPanel(groupPanel : GroupPanel, seqGroupPanel : number): Observable<any> {
        let body = JSON.stringify(groupPanel);
        return this.httpClient.patch(`${this.groupPanelUrl}/${seqGroupPanel}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGroupPanel(seqGroupPanel : number): Observable<any> {
        return this.httpClient.delete(`${this.groupPanelUrl}/${seqGroupPanel}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}