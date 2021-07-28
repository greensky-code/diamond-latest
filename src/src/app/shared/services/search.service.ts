import {Injectable} from '@angular/core';
import {SearchModel} from '../../shared/models/models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SharedService} from '../../shared/services/shared.service';
import {environment} from '../../../environments/environment';
import {strict} from "assert";

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient,
                private sharedService: SharedService) {
    }

    getSearchResults(searchModel: SearchModel, isSilentError: boolean = true): Observable<any> {
        let body = {isMatch: searchModel.isMatch, options: searchModel.searchOption, userId: searchModel.userId,
            isMatchAllContracts: searchModel.isMatchAllContracts, winId: searchModel.winId, dwName: searchModel.dwName,
            isContracts: searchModel.isContracts};
        if (searchModel.httpMethod.toLowerCase() === 'post') {
            return this.http.post(`${this.baseUrl}/${searchModel.url}`, body).pipe(map(resp => resp),
                catchError((error: any) => {
                    return this.sharedService.handleError(error, null, isSilentError);
                }))
        } else if (searchModel.httpMethod.toLowerCase() === 'get') {
            return this.http.get(`${this.baseUrl}/${searchModel.url}`).pipe(map(resp => resp),
                catchError((error: any) => {
                    return this.sharedService.handleError(error, null, isSilentError);
                }))
        }
    }

    getPaginationSearchResults(searchOptions: SearchModel, isSilentError = true, usePagination = false, page = 0, direction = 'ASC',sortProperty:any = null): Observable<any> {
        let body = {isMatch: searchOptions.isMatch, options: searchOptions.searchOption, userId: searchOptions.userId,
            isMatchAllContracts: searchOptions.isMatchAllContracts, winId: searchOptions.winId, dwName: searchOptions.dwName,
            isContracts: searchOptions.isContracts};
        const url = `${this.baseUrl}/${searchOptions.url}`;
        let httpParams = new HttpParams().set('use-pagination', String(usePagination)).set('page', String(page)).set('order', String(direction)).set('sort', String(sortProperty))

        if (searchOptions.httpMethod === 'post') {
            return this.http.post(url, body, {params: httpParams}).pipe(map(resp => resp),
                catchError((error: any) => {
                    return this.sharedService.handleError(error, null, isSilentError);
                }))
        } else if (searchOptions.httpMethod === 'get') {
            return this.http.get(url, {params: httpParams}).pipe(map(resp => resp),
                catchError((error: any) => {
                    return this.sharedService.handleError(error, null, isSilentError);
                }))
        }
    }


}
