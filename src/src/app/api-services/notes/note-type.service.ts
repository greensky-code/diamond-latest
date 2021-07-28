/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SharedService } from './../../shared/services/shared.service';
import { NoteType } from './../../api-models';

@Injectable({
    providedIn: 'root'
})
export class NoteTypeService {

    private noteTypeUrl: string = `${environment.apiUrl}/notetypes`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNoteTypes(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<NoteType[]> {
        var url = `${this.noteTypeUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NoteType[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteType(noteType : string): Observable<NoteType> {
        return this.httpClient.get(`${this.noteTypeUrl}/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteType),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteTypesCount(): Observable<number> {
        var url = `${this.noteTypeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createNoteType(noteType : NoteType): Observable<any> {
        let body = JSON.stringify(noteType);
        return this.httpClient.post(this.noteTypeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateNoteType(noteType : NoteType, noteType2 : string): Observable<any> {
        let body = JSON.stringify(noteType);
        return this.httpClient.put(`${this.noteTypeUrl}/${noteType2}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateNoteType(noteType : NoteType, noteType2 : string): Observable<any> {
        let body = JSON.stringify(noteType);
        return this.httpClient.patch(`${this.noteTypeUrl}/${noteType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteNoteType(noteType : string): Observable<any> {
        return this.httpClient.delete(`${this.noteTypeUrl}/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteTypesInLinkWindow() {
        var url = `${this.noteTypeUrl}/linkWindows`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as any[]),
                catchError((error: any) => {
                    return this.sharedService.handleError(error)
                }))
    }
}
