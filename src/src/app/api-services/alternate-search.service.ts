import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { AlternateSearchModel } from '../api-models/alternate-search-model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';
@Injectable({
  providedIn: 'root'
})
export class AlternateSearchService {

  private memberMasterUrl: string = `${environment.apiUrl}/meddefnaltsrchparamss`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getAlternateSearchColumns(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<AlternateSearchModel[]> {
    var url = `${this.memberMasterUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as AlternateSearchModel[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
  updateAlternateSearchColumns(ASC: AlternateSearchModel): Observable<any> {
    let body = JSON.stringify(ASC);
    return this.httpClient.put(`${this.memberMasterUrl}`, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }
  createAlternateSearchColumns(ASC: AlternateSearchModel): Observable<any> {
    let body = JSON.stringify(ASC);
    return this.httpClient.post(this.memberMasterUrl, body, { headers: this.contentHeaders })
      .pipe(map(response => response),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

}
