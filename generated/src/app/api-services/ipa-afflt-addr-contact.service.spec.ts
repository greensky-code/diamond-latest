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

import { IpaAffltAddrContactService } from './ipa-afflt-addr-contact.service';
import { IpaAffltAddrContact } from '../api-models/ipa-afflt-addr-contact.model'
import { IpaAffltAddrContacts } from "../api-models/testing/fake-ipa-afflt-addr-contact.model"

describe('IpaAffltAddrContactService', () => {
  let injector: TestBed;
  let service: IpaAffltAddrContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpaAffltAddrContactService]
    });
    injector = getTestBed();
    service = injector.get(IpaAffltAddrContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIpaAffltAddrContacts', () => {
    it('should return an Promise<IpaAffltAddrContact[]>', () => {
      const ipaAffltAddrContact = [
       {seqIpaAffltAddrCtat:1234, seqIpaAffltAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAffltAddrCtat:1234, seqIpaAffltAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqIpaAffltAddrCtat:1234, seqIpaAffltAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getIpaAffltAddrContacts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffltaddrcontacts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ipaAffltAddrContact);
    });
  });


  describe('#createIpaAffltAddrContact', () => {
    var id = 1;
    it('should return an Promise<IpaAffltAddrContact>', () => {
      const ipaAffltAddrContact: IpaAffltAddrContact = {seqIpaAffltAddrCtat:1234, seqIpaAffltAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createIpaAffltAddrContact(ipaAffltAddrContact).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffltaddrcontacts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIpaAffltAddrContact', () => {
    var id = 1;
    it('should return an Promise<IpaAffltAddrContact>', () => {
      const ipaAffltAddrContact: IpaAffltAddrContact = {seqIpaAffltAddrCtat:1234, seqIpaAffltAddress:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateIpaAffltAddrContact(ipaAffltAddrContact, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffltaddrcontacts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIpaAffltAddrContact', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIpaAffltAddrContact(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ipaaffltaddrcontacts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});