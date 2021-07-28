import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { CiebOutgoingClaimDetail } from '../../api-models/addon/cieb-outgoing-claim-detail.model';
import { CurrencyPaymentTransaction } from '../../api-models/addon/currency-payment-transaction.model';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CiebOutgoingClaimDetailService {

  private ciebOutgoingClaimDetailUrl: string = `${environment.apiUrl}/cieboutgoingclaimdetails`;
  private contentHeaders = new HttpHeaders();
  constructor(private httpClient : HttpClient,
              private sharedService: SharedService) {
      this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
      this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
  }

  findAllBySeqClaimIDStatusCode(seqClaimid : number) : Observable<CurrencyPaymentTransaction[]>{
    return this.httpClient.get(`${this.ciebOutgoingClaimDetailUrl}/findAllBySeqClaimIDStatusCode/${seqClaimid}`, {
      observe: "response",
    }).pipe(
      map((response) => response.body as CurrencyPaymentTransaction[]),
      catchError(this.sharedService.handleError)
    );
  }

}
