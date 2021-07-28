/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ContactTitleMaster } from '../api-models/contact-title-master.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ContactTitleMasterService {

    private contactTitleMasterUrl: string = `${environment.apiUrl}/contacttitlemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getContactTitleMasters(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<ContactTitleMaster[]> {
        var url = `${this.contactTitleMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as ContactTitleMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getContactTitleMaster(contactTitle: string): Observable<ContactTitleMaster> {
        return this.httpClient.get(`${this.contactTitleMasterUrl}/${contactTitle}`, { observe: 'response' })
            .pipe(map(response => response.body as ContactTitleMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getContactTitleMastersCount(): Observable<number> {
        var url = `${this.contactTitleMasterUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createContactTitleMaster(contactTitleMaster: ContactTitleMaster): Observable<any> {
        let body = JSON.stringify(contactTitleMaster);
        return this.httpClient.post(this.contactTitleMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateContactTitleMaster(contactTitleMaster: ContactTitleMaster, contactTitle: string): Observable<any> {
        let body = JSON.stringify(contactTitleMaster);
        return this.httpClient.put(`${this.contactTitleMasterUrl}/${contactTitle}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateContactTitleMaster(contactTitleMaster: ContactTitleMaster, contactTitle: string): Observable<any> {
        let body = JSON.stringify(contactTitleMaster);
        return this.httpClient.patch(`${this.contactTitleMasterUrl}/${contactTitle}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteContactTitleMaster(contactTitle: string): Observable<any> {
        return this.httpClient.delete(`${this.contactTitleMasterUrl}/${contactTitle}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getContactTitleMastersByTitleType(titleType: string): Observable<ContactTitleMaster[]> {
        return this.httpClient.get(`${this.contactTitleMasterUrl}/by-title-type/${titleType}`, { observe: 'response' })
            .pipe(map(response => response.body as ContactTitleMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
