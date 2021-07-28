/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { ProfsvcClaimHeaderEdiService } from './profsvc-claim-header-edi.service';
import { ProfsvcClaimHeaderEdi } from '../api-models/profsvc-claim-header-edi.model'
import { ProfsvcClaimHeaderEdis } from "../api-models/testing/fake-profsvc-claim-header-edi.model"

describe('ProfsvcClaimHeaderEdiService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimHeaderEdiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimHeaderEdiService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimHeaderEdiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimHeaderEdis', () => {
    it('should return an Promise<ProfsvcClaimHeaderEdi[]>', () => {
      const profsvcClaimHeaderEdi = [
       {transactionSetId:'sample data', seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data'},
       {transactionSetId:'sample data', seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data'},
       {transactionSetId:'sample data', seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data'}

      ];
      service.getProfsvcClaimHeaderEdis().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderedis/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimHeaderEdi);
    });
  });


  describe('#createProfsvcClaimHeaderEdi', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimHeaderEdi>', () => {
      const profsvcClaimHeaderEdi: ProfsvcClaimHeaderEdi = {transactionSetId:'sample data', seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data'};
      service.createProfsvcClaimHeaderEdi(profsvcClaimHeaderEdi).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderedis`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimHeaderEdi', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimHeaderEdi>', () => {
      const profsvcClaimHeaderEdi: ProfsvcClaimHeaderEdi = {transactionSetId:'sample data', seqClaimId:1234, claimNumber:'sample data', primarySvcDate:'2018-01-01', claimThruDate:'2018-01-01', authNumber:1234, secondaryAuth:'sample data', seqMembId:1234, memberAge:1234, memberGender:'sample data', seqPcpId:1234, pcpType:'sample data', pcpSpec:'sample data', pcpIpaId:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', riderString:'sample data', eligibleThruDate:'2018-01-01', eligStatus:'sample data', seqProvId:1234, seqProvAddress:1234, providerParStat:'sample data', providerType:'sample data', providerSpec:'sample data', providerIpaId:'sample data', providerPcpFlag:'sample data', seqRefProvId:1234, refProvType:'sample data', refProvSpec:'sample data', refProvParStat:'sample data', refProvIpaId:'sample data', seqVendId:1234, seqVendAddress:1234, totalBilledAmt:1234, placeOfService1:'sample data', placeOfService2:'sample data', placeOfService3:'sample data', serviceReason1:'sample data', diagnosis1:'sample data', diagnosis2:'sample data', diagnosis3:'sample data', diagnosis4:'sample data', dateReceived:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', batchNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProvContract:1234, paySubscriber:'sample data', memberLastName:'sample data', memberFirstName:'sample data', memberDateOfBirth:'2018-01-01', memberSocialSecNo:'sample data', subscriberId:'sample data', personNumber:'sample data', extProvId:'sample data', extProvIdType:'sample data', extVendId:'sample data', extVendIdType:'sample data'};
      service.updateProfsvcClaimHeaderEdi(profsvcClaimHeaderEdi, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderedis/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimHeaderEdi', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimHeaderEdi(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimheaderedis/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});