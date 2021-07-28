/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NoteWinLink } from '../../api-models/notes/note-win-link.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class NoteWinLinkService {

    private noteWinLinkUrl: string = `${environment.apiUrl}/notewinlinks`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNoteWinLinks(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<NoteWinLink[]> {
        var url = `${this.noteWinLinkUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NoteWinLink[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteWinLink(winId : string): Observable<NoteWinLink> {
        return this.httpClient.get(`${this.noteWinLinkUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteWinLink),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteWinLinkByWinIdAndNoteType(winId : string, noteType: string): Observable<NoteWinLink[]> {
        return this.httpClient.get(`${this.noteWinLinkUrl}/${winId}/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteWinLink),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getNoteWinLinksCount(): Observable<number> {
        var url = `${this.noteWinLinkUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByNoteType(noteType : string): Observable<NoteWinLink[]> {
        return this.httpClient.get(`${this.noteWinLinkUrl}/find-by-notetype/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteWinLink),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createNoteWinLink(noteWinLink : NoteWinLink): Observable<any> {
        let body = JSON.stringify(noteWinLink);
        return this.httpClient.post(this.noteWinLinkUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateNoteWinLink(noteWinLink : NoteWinLink, linkWinId : string, noteType: string, winId : string): Observable<any> {
        let body = JSON.stringify(noteWinLink);
        return this.httpClient.put(`${this.noteWinLinkUrl}/${linkWinId}/${noteType}/${winId}`, body,{ headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
    }

    partiallyUpdateNoteWinLink(noteWinLink : NoteWinLink, winId : string): Observable<any> {
        let body = JSON.stringify(noteWinLink);
        return this.httpClient.patch(`${this.noteWinLinkUrl}/${winId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteNoteWinLink(winId : string): Observable<any> {
        return this.httpClient.delete(`${this.noteWinLinkUrl}/${winId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
