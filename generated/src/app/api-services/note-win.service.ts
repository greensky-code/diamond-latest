/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NoteWin } from '../api-models/note-win.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class NoteWinService {

    private noteWinUrl: string = `${environment.apiUrl}/notewins`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNoteWins(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<NoteWin[]> {
        var url = `${this.noteWinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NoteWin[]),
                catchError(this.sharedService.handleError))
    }

    getNoteWin(winId : string): Observable<NoteWin> {
        return this.httpClient.get(`${this.noteWinUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteWin),
                catchError(this.sharedService.handleError))
    }

    getNoteWinsCount(): Observable<number> {
        var url = `${this.noteWinUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByNoteType(noteType : string): Observable<NoteWin[]> {
        return this.httpClient.get(`${this.noteWinUrl}/find-by-notetype/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteWin),
                catchError(this.sharedService.handleError))
    }




    createNoteWin(noteWin : NoteWin): Observable<any> {
        let body = JSON.stringify(noteWin);
        return this.httpClient.post(this.noteWinUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateNoteWin(noteWin : NoteWin, winId : string): Observable<any> {
        let body = JSON.stringify(noteWin);
        return this.httpClient.put(`${this.noteWinUrl}/${winId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateNoteWin(noteWin : NoteWin, winId : string): Observable<any> {
        let body = JSON.stringify(noteWin);
        return this.httpClient.patch(`${this.noteWinUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteNoteWin(winId : string): Observable<any> {
        return this.httpClient.delete(`${this.noteWinUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}