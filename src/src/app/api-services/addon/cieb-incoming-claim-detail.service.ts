import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { CiebIncomingClaimDetail } from '../../api-models/addon/cieb-incoming-claim-detail.model';
import { EntityHeader } from '../../api-models/addon/entity-header.model';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CiebIncomingClaimDetailService {

  private ciebIncomingClaimDetailUrl: string = `${environment.apiUrl}/ciebincomingclaimdetails`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient : HttpClient,
              private sharedService: SharedService) {
      this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
      this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  getCiebIncomingClaimDetailBySeqId(seqClaimid : number) : Observable<CiebIncomingClaimDetail[]>{

    return this.httpClient
    .get(`${this.ciebIncomingClaimDetailUrl}/findBySeqClaimId/${seqClaimid}`, {
      observe: "response",
    })
    .pipe(
      map((response) => response.body as CiebIncomingClaimDetail[]),
      catchError(this.sharedService.handleError)
    );
  }

  createCiebIncomingClaimDetail(ciebIncomingClaimDetail : CiebIncomingClaimDetail) : Observable<CiebIncomingClaimDetail>{

    let body = JSON.stringify(ciebIncomingClaimDetail);

    return this.httpClient.post(this.ciebIncomingClaimDetailUrl, body, { headers: this.contentHeaders })
    .pipe(map(response => response),
         catchError((error: any) => {
             return this.sharedService.handleError(error)
         }))
  }

  updateByAction(ciebincomingclaimdetails : CiebIncomingClaimDetail []){
    let body = JSON.stringify(ciebincomingclaimdetails);

    return this.httpClient.post(`${this.ciebIncomingClaimDetailUrl}/updateIncomingClaimDetailRecords`, body, { headers: this.contentHeaders })
    .pipe(map(response => response),
         catchError((error: any) => {
             return this.sharedService.handleError(error)
         }))
    
  }

  updateCiebIncomingClaimDetail(ciebIncomingClaimDetail : CiebIncomingClaimDetail) : Observable<CiebIncomingClaimDetail>{

    let body = JSON.stringify(ciebIncomingClaimDetail);

    return this.httpClient.put(this.ciebIncomingClaimDetailUrl, body, { headers: this.contentHeaders })
    .pipe(map(response => response),
         catchError((error: any) => {
             return this.sharedService.handleError(error)
         }))
  }
  


}
