/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {catchError, map} from 'rxjs/operators';
import {SharedService} from "../../shared/services/shared.service";
import {environment} from "../../../environments/environment";
import {IdCardSetup} from "../../api-models/id-card-setup.model";

@Injectable({
    providedIn: "root"
})
export class IdCardSetupService {

    private idCardSetupUrl: string = `${environment.apiUrl}/idcardsetups`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getIdCardSetups(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<IdCardSetup[]> {
        var url = `${this.idCardSetupUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as IdCardSetup[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getIdCardSetup(seqIdprtId: number): Observable<IdCardSetup> {
        return this.httpClient.get(`${this.idCardSetupUrl}/${seqIdprtId}`, {observe: 'response'})
            .pipe(map(response => response.body as IdCardSetup),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getIdCardSetupsCount(): Observable<number> {
        var url = `${this.idCardSetupUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createIdCardSetup(idCardSetup: IdCardSetup): Observable<any> {
        let body = JSON.stringify(idCardSetup);
        return this.httpClient.post(this.idCardSetupUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateIdCardSetup(idCardSetup: IdCardSetup, seqIdprtId: number): Observable<any> {
        let body = JSON.stringify(idCardSetup);
        return this.httpClient.put(`${this.idCardSetupUrl}/${idCardSetup.idCardSetupPrimaryKey.jobId}/${seqIdprtId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateIdCardSetup(idCardSetup: IdCardSetup, seqIdprtId: number): Observable<any> {
        let body = JSON.stringify(idCardSetup);
        return this.httpClient.patch(`${this.idCardSetupUrl}/${seqIdprtId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteIdCardSetup(seqIdprtId: number): Observable<any> {
        return this.httpClient.delete(`${this.idCardSetupUrl}/${seqIdprtId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
