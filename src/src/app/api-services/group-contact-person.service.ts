/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupContactPerson } from '../api-models/group-contact-person.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
    providedIn: "root"
})
export class GroupContactPersonService {

    private groupContactPersonUrl: string = `${environment.apiUrl}/groupcontactpersons`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getGroupContactPersons(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<GroupContactPerson[]> {
        var url = `${this.groupContactPersonUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as GroupContactPerson[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getGroupContactPerson(seqGroupId: number): Observable<GroupContactPerson[]> {
        return this.httpClient.get(`${this.groupContactPersonUrl}/${seqGroupId}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupContactPerson[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getGroupContactPersonsCount(): Observable<number> {
        var url = `${this.groupContactPersonUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByContactTitle(contactTitle: string): Observable<GroupContactPerson[]> {
        return this.httpClient.get(`${this.groupContactPersonUrl}/find-by-contacttitle/${contactTitle}`, { observe: 'response' })
            .pipe(map(response => response.body as GroupContactPerson),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createGroupContactPerson(groupContactPerson: GroupContactPerson): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        return this.httpClient.post(this.groupContactPersonUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    /**
     * Add/ update multiple group contacts
     * Each record have action: FormActionTypes (add/update/delete)
     * @param groupContactPerson
     */
    addUpdateGroupContact(groupContactPerson: GroupContactPerson[]): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        const url = `${this.groupContactPersonUrl}/updateGroupContactPersonRecords`
        return this.httpClient.post(url, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    updateGroupContactPerson(groupContactPerson: GroupContactPerson, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        return this.httpClient.put(`${this.groupContactPersonUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateGroupContactPerson(groupContactPerson: GroupContactPerson, seqGroupId: number): Observable<any> {
        let body = JSON.stringify(groupContactPerson);
        return this.httpClient.patch(`${this.groupContactPersonUrl}/${seqGroupId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteGroupContactPerson(seqGroupId: number): Observable<any> {
        return this.httpClient.delete(`${this.groupContactPersonUrl}/${seqGroupId}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
