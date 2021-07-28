/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GroupContactPerson } from '../api-models/group-contact-person.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GroupContactPersonService {

    private groupContactPersonUrl: string = `${environment.apiUrl}/groupcontactpersons`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupContactPersons(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<GroupContactPerson[]> {
        var url = `${this.groupContactPersonUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GroupContactPerson[]),
                catchError(this.sharedService.handleError))
    }

    getGroupContactPerson(seqGroupContact : number): Observable<GroupContactPerson> {
        return this.httpClient.get(`${this.groupContactPersonUrl}/${seqGroupContact}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupContactPerson),
                catchError(this.sharedService.handleError))
    }

    getGroupContactPersonsCount(): Observable<number> {
        var url = `${this.groupContactPersonUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findBySeqGroupId(seqGroupId : number): Observable<GroupContactPerson[]> {
        return this.httpClient.get(`${this.groupContactPersonUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupContactPerson),
                catchError(this.sharedService.handleError))
    }
    findByContactTitle(contactTitle : string): Observable<GroupContactPerson[]> {
        return this.httpClient.get(`${this.groupContactPersonUrl}/find-by-contacttitle/${contactTitle}`, {observe: 'response'})
            .pipe(map(response => response.body as GroupContactPerson),
                catchError(this.sharedService.handleError))
    }




    createGroupContactPerson(groupContactPerson : GroupContactPerson): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        return this.httpClient.post(this.groupContactPersonUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateGroupContactPerson(groupContactPerson : GroupContactPerson, seqGroupContact : number): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        return this.httpClient.put(`${this.groupContactPersonUrl}/${seqGroupContact}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateGroupContactPerson(groupContactPerson : GroupContactPerson, seqGroupContact : number): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        return this.httpClient.patch(`${this.groupContactPersonUrl}/${seqGroupContact}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteGroupContactPerson(seqGroupContact : number): Observable<any> {
        return this.httpClient.delete(`${this.groupContactPersonUrl}/${seqGroupContact}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}