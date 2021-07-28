/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GroupMaster } from '../api-models/group-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GroupMasterService {

    private groupMasterUrl: string = `${environment.apiUrl}/groupmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GroupMaster[]> {
        var url = `${this.groupMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GroupMaster[]),
                catchError(this.sharedService.handleError))
    }

    getGroupMaster(seqGroupId : number): Observable<GroupMaster> {
        return this.httpClient.get(`${this.groupMasterUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupMaster),
                catchError(this.sharedService.handleError))
    }

    getGroupMastersCount(): Observable<number> {
        var url = `${this.groupMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqParentId(seqParentId : number): Observable<GroupMaster[]> {
        return this.httpClient.get(`${this.groupMasterUrl}/find-by-seqparentid/${seqParentId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupMaster),
                catchError(this.sharedService.handleError))
    }
    findByHoldReason(holdReason : string): Observable<GroupMaster[]> {
        return this.httpClient.get(`${this.groupMasterUrl}/find-by-holdreason/${holdReason}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupMaster),
                catchError(this.sharedService.handleError))
    }
    findByPtdUseReasonCde(ptdUseReasonCde : string): Observable<GroupMaster[]> {
        return this.httpClient.get(`${this.groupMasterUrl}/find-by-ptdusereasoncde/${ptdUseReasonCde}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupMaster),
                catchError(this.sharedService.handleError))
    }




    createGroupMaster(groupMaster : GroupMaster): Observable<any> {
        let body = JSON.stringify(groupMaster);
        return this.httpClient.post(this.groupMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGroupMaster(groupMaster : GroupMaster, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(groupMaster);
        return this.httpClient.put(`${this.groupMasterUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGroupMaster(groupMaster : GroupMaster, seqGroupId : number): Observable<any> {
        let body = JSON.stringify(groupMaster);
        return this.httpClient.patch(`${this.groupMasterUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGroupMaster(seqGroupId : number): Observable<any> {
        return this.httpClient.delete(`${this.groupMasterUrl}/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}