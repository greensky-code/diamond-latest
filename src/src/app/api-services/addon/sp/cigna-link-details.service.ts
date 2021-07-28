/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {ProcCloneData} from "../../../api-models/addon/proc-clone-data.input-model";
import {environment} from "../../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {SharedService} from "../../../shared/services/shared.service";
import {CignaLinkCloneModel} from "../../../api-models/addon/cigna-link-clone-model";
import {CignaLinkMaintenanceModel} from "../../../api-models/addon/cigna-link-maintenance-model";


@Injectable({
    providedIn: "root"
})
export class CignaLinkDetailsService {

    private procCloneDataUrl: string = `${environment.apiUrl}/cignaLinkDetails`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private shareService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }


    procCloneCignaLinkDetails(body: CignaLinkCloneModel, userName: string): Observable<[]> {
        const payload = JSON.stringify(body);
        return this.httpClient.post(`${this.procCloneDataUrl}/cloneCignaLinkDetails/${userName}`, payload,
            {headers: this.contentHeaders}).pipe(map(response => response),
            catchError(this.shareService.handleError));
    }

    procCloneCountry(procCloneData: ProcCloneData): Observable<[]> {
        let body = JSON.stringify(procCloneData);
        return this.httpClient.post(`${this.procCloneDataUrl}/cloneCountry`, body,
            {headers: this.contentHeaders}).pipe(map(response => response),
            catchError(this.shareService.handleError));
    }


    viewHistory(groupId: string): Observable<[]> {
        return this.httpClient.post(`${this.procCloneDataUrl}/getGroupHistory/${groupId}`,null,
            {headers: this.contentHeaders}).pipe(map(response => response),
            catchError(this.shareService.handleError));
    }

    saveCignaLinkDetails(userName: string, cignaLinkDetailsModels: CignaLinkMaintenanceModel): Observable<[]> {
        let body = JSON.stringify(cignaLinkDetailsModels);

        return this.httpClient.post(`${this.procCloneDataUrl}/saveCignaLinkDetails/${userName}`,body,
            {headers: this.contentHeaders}).pipe(map(response => response),
            catchError(this.shareService.handleError));
    }
}
