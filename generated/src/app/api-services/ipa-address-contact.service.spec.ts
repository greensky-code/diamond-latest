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

import { IpaAddressContactService } from './ipa-address-contact.service';
import { IpaAddressContact } from '../api-models/ipa-address-contact.model'
import { IpaAddressContacts } from "../api-models/testing/fake-ipa-address-contact.model"

describe('IpaAddressContactService', () => {
  let injector: TestBed;
  let service: IpaAddressContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaAddressContactService]
    });
    injector = getTestBed();
    service = injector.get(IpaAddressContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIpaAddressContacts', () => {
    it('should return an Promise<IpaAddressContact[]>', () => {
      const ipaAddressContact = [
       {seqIpaAddrContact:1234, seqIpaAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAddrContact:1234, seqIpaAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAddrContact:1234, seqIpaAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getIpaAddressContacts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresscontacts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaAddressContact);
    });
  });


  describe('#createIpaAddressContact', () => {
    var id = 1;
    it('should return an Promise<IpaAddressContact>', () => {
      const ipaAddressContact: IpaAddressContact = {seqIpaAddrContact:1234, seqIpaAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createIpaAddressContact(ipaAddressContact).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresscontacts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaAddressContact', () => {
    var id = 1;
    it('should return an Promise<IpaAddressContact>', () => {
      const ipaAddressContact: IpaAddressContact = {seqIpaAddrContact:1234, seqIpaAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateIpaAddressContact(ipaAddressContact, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresscontacts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaAddressContact', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIpaAddressContact(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaddresscontacts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});