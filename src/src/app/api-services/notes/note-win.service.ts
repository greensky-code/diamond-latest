/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {NoteWin} from '../../api-models/notes/note-win.model'
import {CONFIG} from '../../core/config';
import {environment} from '../../../environments/environment'
import {HttpHeaders} from '@angular/common/http';
import {SharedService} from '../../shared/services/shared.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class NoteWinService {

    private noteWinUrl: string = `${environment.apiUrl}/notewins`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNoteWins(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<NoteWin[]> {
        var url = `${this.noteWinUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NoteWin[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAllNoteWins(): Observable<NoteWin[]> {
        var url = `${this.noteWinUrl}/get-all-note-wins`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NoteWin[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteWin(winId: string): Observable<NoteWin> {
        return this.httpClient.get(`${this.noteWinUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteWin),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteWinsCount(): Observable<number> {
        var url = `${this.noteWinUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByNoteType(noteType: string): Observable<NoteWin[]> {
        return this.httpClient.get(`${this.noteWinUrl}/find-by-notetype/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteWin),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createNoteWin(noteWin: NoteWin): Observable<any> {
        let body = JSON.stringify(noteWin);

        return this.httpClient.post(this.noteWinUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateNoteWin(noteWin: NoteWin, winId: string): Observable<any> {
        let body = JSON.stringify(noteWin);
        return this.httpClient.put(`${this.noteWinUrl}/${winId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateNoteWin(noteWin: NoteWin, winId: string): Observable<any> {
        let body = JSON.stringify(noteWin);
        return this.httpClient.patch(`${this.noteWinUrl}/${winId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteNoteWin(winId: string): Observable<any> {
        return this.httpClient.delete(`${this.noteWinUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
