import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MemberOtherCoverage } from '../api-models/member-other-coverage';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class MemberOtherCoverageService {

  private memberOtherCoverageUrl: string = `${environment.apiUrl}/memberothercoverages`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
    this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getMemberOtherCoverages(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<MemberOtherCoverage[]> {
    var url = `${this.memberOtherCoverageUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
    return this.httpClient.get(url, { observe: 'response' })
      .pipe(map(response => response.body as MemberOtherCoverage[]),
        catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  getMemberOtherCoveragesBySubId(seqMembId:any): Observable<MemberOtherCoverage[]> {
    var url = `${this.memberOtherCoverageUrl}/find-by-seqmembid/${seqMembId}`;
    return this.httpClient.get(url, { observe: 'response' })
    .pipe(map(response => response.body as MemberOtherCoverage[]),
    catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }


  determineCOBOrder(seqMembId:any, seqSubsId:any, seqMembOthCov:any): Observable<MemberOtherCoverage[]> {
    var url = `${this.memberOtherCoverageUrl}/determine-cob-order/${seqMembId}/${seqSubsId}/${seqMembOthCov}`;
    return this.httpClient.get(url, { observe: 'response' })
    .pipe(map(response => response.body as MemberOtherCoverage[]),
    catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  getMemberOtherCoveragesBySeqMembId(seqMembId:any): Observable<MemberOtherCoverage[]> {
    var url = `${this.memberOtherCoverageUrl}/find-member-other-coverage-by-seqmembid/${seqMembId}`;
    return this.httpClient.get(url, { observe: 'response' })
    .pipe(map(response => response.body as MemberOtherCoverage[]),
    catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }));
  }

  createOtherCoverage(memberOtherCoverage : MemberOtherCoverage): Observable<any> {
    let body = JSON.stringify(memberOtherCoverage);
    return this.httpClient.post(this.memberOtherCoverageUrl, body, { headers: this.contentHeaders })
        .pipe(map(response => response),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }

  updateOtherCoverage(memberOtherCoverage : MemberOtherCoverage, seqMembId: number, seqMembOthCov: number): Observable<any> {
    let body = JSON.stringify(memberOtherCoverage);
    return this.httpClient.put(`${this.memberOtherCoverageUrl}/${seqMembId}/${seqMembOthCov}`, body, { headers: this.contentHeaders })
        .pipe(map(response => response),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
  }


  private handleError(error: any): Promise<any> {
    var errorMessage = "";
    if (parseInt(error.status) == 0) {
      errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
    }
    else if (parseInt(error.status) == 404) {
      errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
    }
    else if (parseInt(error.status) == 500) {
      errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
    }
    else if (parseInt(error.status) == 400) {
      errorMessage = `An error occurred while accessing URL ${error.url}. Bad Request`;
    }
    else {
      errorMessage = `An error occurred while accessing URL ${error.url}. ${error.statusText}`;
    }

    return Promise.reject(errorMessage);
  }

}
