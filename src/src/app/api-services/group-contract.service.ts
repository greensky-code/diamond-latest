/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupContract } from '../api-models/group-contract.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class GroupContractService {

    private groupContractUrl: string = `${environment.apiUrl}/groupcontracts`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupContracts(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<GroupContract[]> {
        var url = `${this.groupContractUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as GroupContract[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getGroupContract(seqGroupContract: number): Observable<GroupContract> {
        return this.httpClient.get(`${this.groupContractUrl}/${seqGroupContract}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getGroupContractsCount(): Observable<number> {
        var url = `${this.groupContractUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    findBySeqGroupId(seqGroupId: number): Observable<GroupContract[]> {
        return this.httpClient.get(`${this.groupContractUrl}/find-by-seqgroupid/${seqGroupId}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByTermReason(termReason: string): Observable<GroupContract[]> {
        return this.httpClient.get(`${this.groupContractUrl}/find-by-termreason/${termReason}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupContract),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createGroupContract(groupContract: GroupContract): Observable<any> {
        let body = JSON.stringify(groupContract);
        return this.httpClient.post(this.groupContractUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateGroupContract(groupContract: GroupContract, seqGroupId: number, seqGroupContract: number): Observable<any> {
        let body = JSON.stringify(groupContract);
        return this.httpClient.put(`${this.groupContractUrl}/${seqGroupContract}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateGroupContract(groupContract: GroupContract, seqGroupContract: number): Observable<any> {
        let body = JSON.stringify(groupContract);
        return this.httpClient.patch(`${this.groupContractUrl}/${seqGroupContract}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteGroupContract(seqGroupContract: number): Observable<any> {
        return this.httpClient.delete(`${this.groupContractUrl}/${seqGroupContract}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
