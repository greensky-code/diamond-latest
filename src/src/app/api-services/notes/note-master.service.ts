/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NoteMaster } from '../../api-models/notes/note-master.model'
import { CONFIG } from '../../core/config';
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import {not} from "rxjs/internal-compatibility";

@Injectable({
    providedIn: 'root'
})
export class NoteMasterService {

    private noteMasterUrl: string = `${environment.apiUrl}/notemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getNoteMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<NoteMaster[]> {
        var url = `${this.noteMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster[]),
            catchError(
                this.sharedService.handleError
            ));
    }

    getNoteMaster(seqNoteId: number): Observable<NoteMaster> {
        return this.httpClient.get(`${this.noteMasterUrl}/${seqNoteId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster),
                catchError((error: any) => {
                    if (error.error && error.error.status && error.error.status === 409) {
                        console.log(error);
                    } else {
                        return this.sharedService.handleError(error)
                    }
                 }))
    }

    getNoteMastersCount(): Observable<number> {
        var url = `${this.noteMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
            catchError(
                this.sharedService.handleError
            ));
    }

    findByNoteType(noteType : string): Observable<NoteMaster[]> {
        return this.httpClient.get(`${this.noteMasterUrl}/find-by-notetype/${noteType}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster),
            catchError(
                this.sharedService.handleError
            ));
    }
    findBySeqGroupId(seqGroupId : number): Observable<NoteMaster[]> {
        return this.httpClient.get(`${this.noteMasterUrl}/find-by-seqgroupid/${seqGroupId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster),
            catchError(
                this.sharedService.handleError
            ));
    }
    findBySeqMembId(seqMembId : number): Observable<NoteMaster[]> {
        return this.httpClient.get(`${this.noteMasterUrl}/find-by-seqmembid/${seqMembId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster),
            catchError(
                this.sharedService.handleError
            ));
    }
    findBySeqProvId(seqProvId : number): Observable<NoteMaster[]> {
        return this.httpClient.get(`${this.noteMasterUrl}/find-by-seqprovid/${seqProvId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster),
            catchError(
                this.sharedService.handleError
            ));
    }




    createNoteMaster(noteMaster : NoteMaster): Observable<any> {
        let body = JSON.stringify(noteMaster);
        return this.httpClient.post(this.noteMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
            catchError(
                this.sharedService.handleError
            ));
    }

    updateNoteMaster(noteMaster : NoteMaster, seqNoteId : number): Observable<any> {
        let body = JSON.stringify(noteMaster);
        return this.httpClient.put(`${this.noteMasterUrl}/${seqNoteId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
             catchError(
                this.sharedService.handleError
            ));
    }

    partiallyUpdateNoteMaster(noteMaster : NoteMaster, seqNoteId : number): Observable<any> {
        let body = JSON.stringify(noteMaster);
        return this.httpClient.patch(`${this.noteMasterUrl}/${seqNoteId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
            catchError(
                this.sharedService.handleError
            ));
    }

    deleteNoteMaster(seqNoteId : number): Observable<any> {
        return this.httpClient.delete(`${this.noteMasterUrl}/${seqNoteId}`, {observe: 'response'})
            .pipe(map(response => response.body),
            catchError(
                this.sharedService.handleError
            ));
    }

    findBySourceAndWinId(sourceId: any, noteWinId: string):  Observable<any>{
        return this.httpClient.get(`${this.noteMasterUrl}/findBySourceWin/${sourceId}/${noteWinId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster),
                catchError(
                    this.sharedService.handleError
                ));
    }

    findPriorityBySourceAndNote(sourceId: any, noteWinId: string):  Observable<any>{
        return this.httpClient.get(`${this.noteMasterUrl}/findPriorityBySourceAndNote/${sourceId}/${noteWinId}`, {observe: 'response'})
            .pipe(map(response => response.body as any),
                catchError(
                    this.sharedService.handleError
                ));
    }

    findHighPriorityNotesBySourceId(sourceId: any):  Observable<NoteMaster[]>{
        return this.httpClient.get(`${this.noteMasterUrl}/findHighPriorityNotesBySourceId/${sourceId}`, {observe: 'response'})
            .pipe(map(response => response.body as NoteMaster),
                catchError(
                    this.sharedService.handleError
                ));
    }
}
