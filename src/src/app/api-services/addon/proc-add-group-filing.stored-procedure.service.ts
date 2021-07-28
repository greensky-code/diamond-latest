/* Copyright (c) 2021 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {GroupFilingDetailModel} from '../../api-models/addon/proc-add-group-filing.input-model';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SharedService} from '../../shared/services/shared.service';


@Injectable({
    providedIn: 'root'
})
export class ProcAddGroupFilingService {

    private ciedAddGroupFilingUrl = `${environment.apiUrl}/ciebgroupfilingdetails`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getCiebGroupFilingDetails(seqGroupId: number, usePagination: boolean = false, page: number = 0, size: number = 0): Observable<GroupFilingDetailModel[]> {
        const url = `${this.ciedAddGroupFilingUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}&seqGroupId=${seqGroupId}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as GroupFilingDetailModel[]),
                catchError(this.sharedService.handleError))
    }

    createCiebGroupFilingDetail(groupFilingDetailModel: GroupFilingDetailModel[]=[]): Observable<any> {
        let body = JSON.stringify(groupFilingDetailModel);
        return this.httpClient.post(this.ciedAddGroupFilingUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    updateCiebGroupFilingDetail(groupFilingDetailModel: GroupFilingDetailModel, seqGrpfilingId: number): Observable<any> {
        let body = JSON.stringify(groupFilingDetailModel);
        return this.httpClient.put(`${this.ciedAddGroupFilingUrl}/${seqGrpfilingId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }


}
