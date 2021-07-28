/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ModifierCodeMaster } from '../api-models/modifier-code-master.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ModifierCodeMasterService {

    private modifierCodeMasterUrl: string = `${environment.apiUrl}/modifiercodemasters`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getModifierCodeMasters(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ModifierCodeMaster[]> {
        var url = `${this.modifierCodeMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ModifierCodeMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getModifierCodeMaster(modifierCode : string): Observable<ModifierCodeMaster> {
        return this.httpClient.get(`${this.modifierCodeMasterUrl}/${modifierCode}`, {observe: 'response'})
            .pipe(map(response => response.body as ModifierCodeMaster),
                catchError(null))
    }

    getModifierCodeMastersCount(): Observable<number> {
        var url = `${this.modifierCodeMasterUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }





    createModifierCodeMaster(modifierCodeMaster : ModifierCodeMaster): Observable<any> {
        let body = JSON.stringify(modifierCodeMaster);
        return this.httpClient.post(this.modifierCodeMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateModifierCodeMaster(modifierCodeMaster : ModifierCodeMaster, modifierCode : string): Observable<any> {
        let body = JSON.stringify(modifierCodeMaster);
        return this.httpClient.put(`${this.modifierCodeMasterUrl}/${modifierCode}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateModifierCodeMaster(modifierCodeMaster : ModifierCodeMaster, modifierCode : string): Observable<any> {
        let body = JSON.stringify(modifierCodeMaster);
        return this.httpClient.patch(`${this.modifierCodeMasterUrl}/${modifierCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteModifierCodeMaster(modifierCode : string): Observable<any> {
        return this.httpClient.delete(`${this.modifierCodeMasterUrl}/${modifierCode}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
