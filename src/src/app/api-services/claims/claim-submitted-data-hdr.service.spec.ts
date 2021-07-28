/* Copyright (c) 2021 . All Rights Reserved. */

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

import { ClaimSubmittedDataHdrService } from './claim-submitted-data-hdr.service';
import { ClaimSubmittedDataHdr } from '../api-models/claim-submitted-data-hdr.model'
import { ClaimSubmittedDataHdrs } from "../api-models/testing/fake-claim-submitted-data-hdr.model"

describe('ClaimSubmittedDataHdrService', () => {
  let injector: TestBed;
  let service: ClaimSubmittedDataHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimSubmittedDataHdrService]
    });
    injector = getTestBed();
    service = injector.get(ClaimSubmittedDataHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimSubmittedDataHdrs', () => {
    it('should return an Promise<ClaimSubmittedDataHdr[]>', () => {
      const claimSubmittedDataHdr = [
       {facilityPostalCode:'sample data', facilityState:'sample data', facilityCity:'sample data', facilityAddress:'sample data', facilityName:'sample data', facilityNo:'sample data', vendFirstName:'sample data', occurrenceSpanCode2:'sample data', occurrenceSpanCode1:'sample data', occurrence8:'sample data', occurrence7:'sample data', occurrence6:'sample data', occurrence5:'sample data', occurrence4:'sample data', occurrence3:'sample data', occurrence2:'sample data', occurrence1:'sample data', eCode:'sample data', dischargeHour:'sample data', admitSource:'sample data', admitType:'sample data', admitHour:'sample data', drgCode:'sample data', patientStatus:'sample data', billType:'sample data', vendZipCode:'sample data', vendAddressLine1:'sample data', vendLastName:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendId:'sample data', prov3FirstName:'sample data', prov3LastName:'sample data', prov3NationalId:'sample data', prov3TaxId:'sample data', prov3Id:'sample data', prov2FirstName:'sample data', prov2LastName:'sample data', prov2NationalId:'sample data', prov2TaxId:'sample data', prov2Id:'sample data', provState:'sample data', provAddressLine1:'sample data', provNationalId:'sample data', provTaxId:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', procedureCode6:'sample data', procedureCode5:'sample data', procedureCode4:'sample data', procedureCode3:'sample data', procedureCode2:'sample data', procedureCode1:'sample data', admitDiagnosis:'sample data', diagnosis9:'sample data', diagnosis8:'sample data', diagnosis7:'sample data', diagnosis6:'sample data', diagnosis5:'sample data', diagnosis4:'sample data', diagnosis3:'sample data', diagnosis2:'sample data', diagnosis1:'sample data', placeOfService:'sample data', provZipCode:'sample data', provCity:'sample data', provFirstName:'sample data', provLastName:'sample data', provId:'sample data', memOtherId:'sample data', memDateOfBirth:'sample data', memGender:'sample data', memMiddleName:'sample data', memFirstName:'sample data', memLastName:'sample data', memPersonNumber:'sample data', memSubscriberId:'sample data', memDiamondId:'sample data', seqClaimId:1234},
       {facilityPostalCode:'sample data', facilityState:'sample data', facilityCity:'sample data', facilityAddress:'sample data', facilityName:'sample data', facilityNo:'sample data', vendFirstName:'sample data', occurrenceSpanCode2:'sample data', occurrenceSpanCode1:'sample data', occurrence8:'sample data', occurrence7:'sample data', occurrence6:'sample data', occurrence5:'sample data', occurrence4:'sample data', occurrence3:'sample data', occurrence2:'sample data', occurrence1:'sample data', eCode:'sample data', dischargeHour:'sample data', admitSource:'sample data', admitType:'sample data', admitHour:'sample data', drgCode:'sample data', patientStatus:'sample data', billType:'sample data', vendZipCode:'sample data', vendAddressLine1:'sample data', vendLastName:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendId:'sample data', prov3FirstName:'sample data', prov3LastName:'sample data', prov3NationalId:'sample data', prov3TaxId:'sample data', prov3Id:'sample data', prov2FirstName:'sample data', prov2LastName:'sample data', prov2NationalId:'sample data', prov2TaxId:'sample data', prov2Id:'sample data', provState:'sample data', provAddressLine1:'sample data', provNationalId:'sample data', provTaxId:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', procedureCode6:'sample data', procedureCode5:'sample data', procedureCode4:'sample data', procedureCode3:'sample data', procedureCode2:'sample data', procedureCode1:'sample data', admitDiagnosis:'sample data', diagnosis9:'sample data', diagnosis8:'sample data', diagnosis7:'sample data', diagnosis6:'sample data', diagnosis5:'sample data', diagnosis4:'sample data', diagnosis3:'sample data', diagnosis2:'sample data', diagnosis1:'sample data', placeOfService:'sample data', provZipCode:'sample data', provCity:'sample data', provFirstName:'sample data', provLastName:'sample data', provId:'sample data', memOtherId:'sample data', memDateOfBirth:'sample data', memGender:'sample data', memMiddleName:'sample data', memFirstName:'sample data', memLastName:'sample data', memPersonNumber:'sample data', memSubscriberId:'sample data', memDiamondId:'sample data', seqClaimId:1234},
       {facilityPostalCode:'sample data', facilityState:'sample data', facilityCity:'sample data', facilityAddress:'sample data', facilityName:'sample data', facilityNo:'sample data', vendFirstName:'sample data', occurrenceSpanCode2:'sample data', occurrenceSpanCode1:'sample data', occurrence8:'sample data', occurrence7:'sample data', occurrence6:'sample data', occurrence5:'sample data', occurrence4:'sample data', occurrence3:'sample data', occurrence2:'sample data', occurrence1:'sample data', eCode:'sample data', dischargeHour:'sample data', admitSource:'sample data', admitType:'sample data', admitHour:'sample data', drgCode:'sample data', patientStatus:'sample data', billType:'sample data', vendZipCode:'sample data', vendAddressLine1:'sample data', vendLastName:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendId:'sample data', prov3FirstName:'sample data', prov3LastName:'sample data', prov3NationalId:'sample data', prov3TaxId:'sample data', prov3Id:'sample data', prov2FirstName:'sample data', prov2LastName:'sample data', prov2NationalId:'sample data', prov2TaxId:'sample data', prov2Id:'sample data', provState:'sample data', provAddressLine1:'sample data', provNationalId:'sample data', provTaxId:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', procedureCode6:'sample data', procedureCode5:'sample data', procedureCode4:'sample data', procedureCode3:'sample data', procedureCode2:'sample data', procedureCode1:'sample data', admitDiagnosis:'sample data', diagnosis9:'sample data', diagnosis8:'sample data', diagnosis7:'sample data', diagnosis6:'sample data', diagnosis5:'sample data', diagnosis4:'sample data', diagnosis3:'sample data', diagnosis2:'sample data', diagnosis1:'sample data', placeOfService:'sample data', provZipCode:'sample data', provCity:'sample data', provFirstName:'sample data', provLastName:'sample data', provId:'sample data', memOtherId:'sample data', memDateOfBirth:'sample data', memGender:'sample data', memMiddleName:'sample data', memFirstName:'sample data', memLastName:'sample data', memPersonNumber:'sample data', memSubscriberId:'sample data', memDiamondId:'sample data', seqClaimId:1234}

      ];
      service.getClaimSubmittedDataHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatahdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimSubmittedDataHdr);
    });
  });


  describe('#createClaimSubmittedDataHdr', () => {
    var id = 1;
    it('should return an Promise<ClaimSubmittedDataHdr>', () => {
      const claimSubmittedDataHdr: ClaimSubmittedDataHdr = {facilityPostalCode:'sample data', facilityState:'sample data', facilityCity:'sample data', facilityAddress:'sample data', facilityName:'sample data', facilityNo:'sample data', vendFirstName:'sample data', occurrenceSpanCode2:'sample data', occurrenceSpanCode1:'sample data', occurrence8:'sample data', occurrence7:'sample data', occurrence6:'sample data', occurrence5:'sample data', occurrence4:'sample data', occurrence3:'sample data', occurrence2:'sample data', occurrence1:'sample data', eCode:'sample data', dischargeHour:'sample data', admitSource:'sample data', admitType:'sample data', admitHour:'sample data', drgCode:'sample data', patientStatus:'sample data', billType:'sample data', vendZipCode:'sample data', vendAddressLine1:'sample data', vendLastName:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendId:'sample data', prov3FirstName:'sample data', prov3LastName:'sample data', prov3NationalId:'sample data', prov3TaxId:'sample data', prov3Id:'sample data', prov2FirstName:'sample data', prov2LastName:'sample data', prov2NationalId:'sample data', prov2TaxId:'sample data', prov2Id:'sample data', provState:'sample data', provAddressLine1:'sample data', provNationalId:'sample data', provTaxId:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', procedureCode6:'sample data', procedureCode5:'sample data', procedureCode4:'sample data', procedureCode3:'sample data', procedureCode2:'sample data', procedureCode1:'sample data', admitDiagnosis:'sample data', diagnosis9:'sample data', diagnosis8:'sample data', diagnosis7:'sample data', diagnosis6:'sample data', diagnosis5:'sample data', diagnosis4:'sample data', diagnosis3:'sample data', diagnosis2:'sample data', diagnosis1:'sample data', placeOfService:'sample data', provZipCode:'sample data', provCity:'sample data', provFirstName:'sample data', provLastName:'sample data', provId:'sample data', memOtherId:'sample data', memDateOfBirth:'sample data', memGender:'sample data', memMiddleName:'sample data', memFirstName:'sample data', memLastName:'sample data', memPersonNumber:'sample data', memSubscriberId:'sample data', memDiamondId:'sample data', seqClaimId:1234};
      service.createClaimSubmittedDataHdr(claimSubmittedDataHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatahdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimSubmittedDataHdr', () => {
    var id = 1;
    it('should return an Promise<ClaimSubmittedDataHdr>', () => {
      const claimSubmittedDataHdr: ClaimSubmittedDataHdr = {facilityPostalCode:'sample data', facilityState:'sample data', facilityCity:'sample data', facilityAddress:'sample data', facilityName:'sample data', facilityNo:'sample data', vendFirstName:'sample data', occurrenceSpanCode2:'sample data', occurrenceSpanCode1:'sample data', occurrence8:'sample data', occurrence7:'sample data', occurrence6:'sample data', occurrence5:'sample data', occurrence4:'sample data', occurrence3:'sample data', occurrence2:'sample data', occurrence1:'sample data', eCode:'sample data', dischargeHour:'sample data', admitSource:'sample data', admitType:'sample data', admitHour:'sample data', drgCode:'sample data', patientStatus:'sample data', billType:'sample data', vendZipCode:'sample data', vendAddressLine1:'sample data', vendLastName:'sample data', vendNationalId:'sample data', vendTaxId:'sample data', vendId:'sample data', prov3FirstName:'sample data', prov3LastName:'sample data', prov3NationalId:'sample data', prov3TaxId:'sample data', prov3Id:'sample data', prov2FirstName:'sample data', prov2LastName:'sample data', prov2NationalId:'sample data', prov2TaxId:'sample data', prov2Id:'sample data', provState:'sample data', provAddressLine1:'sample data', provNationalId:'sample data', provTaxId:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', procedureCode6:'sample data', procedureCode5:'sample data', procedureCode4:'sample data', procedureCode3:'sample data', procedureCode2:'sample data', procedureCode1:'sample data', admitDiagnosis:'sample data', diagnosis9:'sample data', diagnosis8:'sample data', diagnosis7:'sample data', diagnosis6:'sample data', diagnosis5:'sample data', diagnosis4:'sample data', diagnosis3:'sample data', diagnosis2:'sample data', diagnosis1:'sample data', placeOfService:'sample data', provZipCode:'sample data', provCity:'sample data', provFirstName:'sample data', provLastName:'sample data', provId:'sample data', memOtherId:'sample data', memDateOfBirth:'sample data', memGender:'sample data', memMiddleName:'sample data', memFirstName:'sample data', memLastName:'sample data', memPersonNumber:'sample data', memSubscriberId:'sample data', memDiamondId:'sample data', seqClaimId:1234};
      service.updateClaimSubmittedDataHdr(claimSubmittedDataHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatahdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimSubmittedDataHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimSubmittedDataHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatahdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});