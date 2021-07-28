/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { PlaceOfSvcMaster } from '../api-models/place-of-svc-master.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class PlaceOfSvcMasterService {

    private placeOfSvcMasterUrl: string = `${environment.apiUrl}/placesofsvcmaster`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPlacesOfSvcMaster(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<PlaceOfSvcMaster[]> {
        var url = `${this.placeOfSvcMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as PlaceOfSvcMaster[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPlaceOfSvcMaster(placeOfSvcCode: string): Observable<PlaceOfSvcMaster> {
        return this.httpClient.get(`${this.placeOfSvcMasterUrl}/${placeOfSvcCode}`, { observe: 'response' })
            .pipe(map(response => response.body as PlaceOfSvcMaster),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getPlacesOfSvcMasterCount(): Observable<number> {
        var url = `${this.placeOfSvcMasterUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createPlaceOfSvcMaster(placeOfSvcMaster: PlaceOfSvcMaster): Observable<any> {
        let body = JSON.stringify(placeOfSvcMaster);
        return this.httpClient.post(this.placeOfSvcMasterUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updatePlaceOfSvcMaster(placeOfSvcMaster: PlaceOfSvcMaster, placeOfSvcCode: string): Observable<any> {
        let body = JSON.stringify(placeOfSvcMaster);
        return this.httpClient.put(`${this.placeOfSvcMasterUrl}/${placeOfSvcCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdatePlaceOfSvcMaster(placeOfSvcMaster: PlaceOfSvcMaster, placeOfSvcCode: string): Observable<any> {
        let body = JSON.stringify(placeOfSvcMaster);
        return this.httpClient.patch(`${this.placeOfSvcMasterUrl}/${placeOfSvcCode}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deletePlaceOfSvcMaster(placeOfSvcCode: string): Observable<any> {
        return this.httpClient.delete(`${this.placeOfSvcMasterUrl}/${placeOfSvcCode}`, { observe: 'response' })
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
