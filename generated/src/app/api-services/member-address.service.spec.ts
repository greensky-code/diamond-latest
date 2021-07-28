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

import { MemberAddressService } from './member-address.service';
import { MemberAddress } from '../api-models/member-address.model'
import { MemberAddresses } from "../api-models/testing/fake-member-address.model"

describe('MemberAddressService', () => {
  let injector: TestBed;
  let service: MemberAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberAddressService]
    });
    injector = getTestBed();
    service = injector.get(MemberAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberAddresses', () => {
    it('should return an Promise<MemberAddress[]>', () => {
      const memberAddress = [
       {seqMembId:1234, addressType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', homePhoneNumber:'sample data', fax:'sample data', email:'sample data', busPhoneNumber:'sample data', beneficiaryRelCode:'sample data', beneficiaryDob:'2018-01-01', beneficiaryGender:'sample data', memAddrUserDefined1:'sample data', memAddrUserDefined2:'sample data', memAddrUserDate1:'2018-01-01', memAddrUserDate2:'2018-01-01', lastName:'sample data', firstName:'sample data', mobilePhone:'sample data', insertProcess:'sample data', updateProcess:'sample data', securityCode:'sample data'},
       {seqMembId:1234, addressType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', homePhoneNumber:'sample data', fax:'sample data', email:'sample data', busPhoneNumber:'sample data', beneficiaryRelCode:'sample data', beneficiaryDob:'2018-01-01', beneficiaryGender:'sample data', memAddrUserDefined1:'sample data', memAddrUserDefined2:'sample data', memAddrUserDate1:'2018-01-01', memAddrUserDate2:'2018-01-01', lastName:'sample data', firstName:'sample data', mobilePhone:'sample data', insertProcess:'sample data', updateProcess:'sample data', securityCode:'sample data'},
       {seqMembId:1234, addressType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', homePhoneNumber:'sample data', fax:'sample data', email:'sample data', busPhoneNumber:'sample data', beneficiaryRelCode:'sample data', beneficiaryDob:'2018-01-01', beneficiaryGender:'sample data', memAddrUserDefined1:'sample data', memAddrUserDefined2:'sample data', memAddrUserDate1:'2018-01-01', memAddrUserDate2:'2018-01-01', lastName:'sample data', firstName:'sample data', mobilePhone:'sample data', insertProcess:'sample data', updateProcess:'sample data', securityCode:'sample data'}

      ];
      service.getMemberAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/memberaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberAddress);
    });
  });


  describe('#createMemberAddress', () => {
    var id = 1;
    it('should return an Promise<MemberAddress>', () => {
      const memberAddress: MemberAddress = {seqMembId:1234, addressType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', homePhoneNumber:'sample data', fax:'sample data', email:'sample data', busPhoneNumber:'sample data', beneficiaryRelCode:'sample data', beneficiaryDob:'2018-01-01', beneficiaryGender:'sample data', memAddrUserDefined1:'sample data', memAddrUserDefined2:'sample data', memAddrUserDate1:'2018-01-01', memAddrUserDate2:'2018-01-01', lastName:'sample data', firstName:'sample data', mobilePhone:'sample data', insertProcess:'sample data', updateProcess:'sample data', securityCode:'sample data'};
      service.createMemberAddress(memberAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberAddress', () => {
    var id = 1;
    it('should return an Promise<MemberAddress>', () => {
      const memberAddress: MemberAddress = {seqMembId:1234, addressType:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', country:'sample data', homePhoneNumber:'sample data', fax:'sample data', email:'sample data', busPhoneNumber:'sample data', beneficiaryRelCode:'sample data', beneficiaryDob:'2018-01-01', beneficiaryGender:'sample data', memAddrUserDefined1:'sample data', memAddrUserDefined2:'sample data', memAddrUserDate1:'2018-01-01', memAddrUserDate2:'2018-01-01', lastName:'sample data', firstName:'sample data', mobilePhone:'sample data', insertProcess:'sample data', updateProcess:'sample data', securityCode:'sample data'};
      service.updateMemberAddress(memberAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});