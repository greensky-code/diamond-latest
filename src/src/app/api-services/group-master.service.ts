/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupMaster } from '../api-models';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class GroupMasterService {

    private groupMasterUrl: string = `${environment.apiUrl}/groupmasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<GroupMaster[]> {
        var url = `${this.groupMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as GroupMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getGroupMasterByGroupId(groupId: any): Observable<GroupMaster> {
        return this.httpClient.get(`${this.groupMasterUrl}/groupId/${groupId}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getBillingGroupMasterByGroupId(groupId: any): Observable<GroupMaster> {
        return this.httpClient.get(`${this.groupMasterUrl}/billing/groupId/${groupId}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupMaster),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    getGroupMaster(seqGroupId: number): Observable<GroupMaster> {
        return this.httpClient.get(`${this.groupMasterUrl}/${seqGroupId}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getGroupMastersCount(): Observable<number> {
        var url = `${this.groupMasterUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPtdUseReasonCde(ptdUseReasonCde: string): Observable<GroupMaster[]> {
        return this.httpClient.get(`${this.groupMasterUrl}/find-by-ptdusereasoncde/${ptdUseReasonCde}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findBySeqParentId(seqParentId: number): Observable<GroupMaster[]> {
        return this.httpClient.get(`${this.groupMasterUrl}/find-by-seqparentid/${seqParentId}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findAllGroupsByGroupId(groupId: string): Observable<GroupMaster[]> {
        return this.httpClient.get(`${this.groupMasterUrl}/get-all-groups-by-groupId/${groupId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupMaster),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }

    findByHoldReason(holdReason: string): Observable<GroupMaster[]> {
        return this.httpClient.get(`${this.groupMasterUrl}/find-by-holdreason/${holdReason}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createGroupMaster(groupMaster: GroupMaster): Observable<any> {
        let body = JSON.stringify(groupMaster);
        return this.httpClient.post(this.groupMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateGroupMaster(groupMaster: GroupMaster, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(groupMaster);
        return this.httpClient.put(`${this.groupMasterUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateGroupMaster(groupMaster: GroupMaster, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(groupMaster);
        return this.httpClient.patch(`${this.groupMasterUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteGroupMaster(seqGroupId: number): Observable<any> {
        return this.httpClient.delete(`${this.groupMasterUrl}/${seqGroupId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
