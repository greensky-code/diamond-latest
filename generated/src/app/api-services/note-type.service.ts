/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NoteType } from '../api-models/note-type.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
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
                catchError(this.sharedService.handleError))
    }

    getNoteType(noteType : string): Observable<NoteType> {
        return this.httpClient.get(`${this.noteTypeUrl}/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteType),
                catchError(this.sharedService.handleError))
    }

    getNoteTypesCount(): Observable<number> {
        var url = `${this.noteTypeUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    createNoteType(noteType : NoteType): Observable<any> {
        let body = JSON.stringify(noteType);
        return this.httpClient.post(this.noteTypeUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateNoteType(noteType : NoteType, noteType : string): Observable<any> {
        let body = JSON.stringify(noteType);
        return this.httpClient.put(`${this.noteTypeUrl}/${noteType}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateNoteType(noteType : NoteType, noteType : string): Observable<any> {
        let body = JSON.stringify(noteType);
        return this.httpClient.patch(`${this.noteTypeUrl}/${noteType}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteNoteType(noteType : string): Observable<any> {
        return this.httpClient.delete(`${this.noteTypeUrl}/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}
