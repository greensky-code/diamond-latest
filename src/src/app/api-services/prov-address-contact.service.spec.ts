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

import { ProvAddressContactService } from './prov-address-contact.service';
import { ProvAddressContact } from '../api-models/prov-address-contact.model'
import { ProvAddressContacts } from "../api-models/testing/fake-prov-address-contact.model"

describe('ProvAddressContactService', () => {
  let injector: TestBed;
  let service: ProvAddressContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvAddressContactService]
    });
    injector = getTestBed();
    service = injector.get(ProvAddressContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvAddressContacts', () => {
    it('should return an Promise<ProvAddressContact[]>', () => {
      const provAddressContact = [
       {seqProvContact:1234, seqProvId:1234, seqProvAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'},
       {seqProvContact:1234, seqProvId:1234, seqProvAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'},
       {seqProvContact:1234, seqProvId:1234, seqProvAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'}

      ];
      service.getProvAddressContacts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresscontacts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provAddressContact);
    });
  });


  describe('#createProvAddressContact', () => {
    var id = 1;
    it('should return an Promise<ProvAddressContact>', () => {
      const provAddressContact: ProvAddressContact = {seqProvContact:1234, seqProvId:1234, seqProvAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'};
      service.createProvAddressContact(provAddressContact).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresscontacts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvAddressContact', () => {
    var id = 1;
    it('should return an Promise<ProvAddressContact>', () => {
      const provAddressContact: ProvAddressContact = {seqProvContact:1234, seqProvId:1234, seqProvAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'};
      service.updateProvAddressContact(provAddressContact, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresscontacts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvAddressContact', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvAddressContact(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresscontacts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});