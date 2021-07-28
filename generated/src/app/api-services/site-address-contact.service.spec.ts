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

import { SiteAddressContactService } from './site-address-contact.service';
import { SiteAddressContact } from '../api-models/site-address-contact.model'
import { SiteAddressContacts } from "../api-models/testing/fake-site-address-contact.model"

describe('SiteAddressContactService', () => {
  let injector: TestBed;
  let service: SiteAddressContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SiteAddressContactService]
    });
    injector = getTestBed();
    service = injector.get(SiteAddressContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSiteAddressContacts', () => {
    it('should return an Promise<SiteAddressContact[]>', () => {
      const siteAddressContact = [
       {siteCode:'sample data', seqSiteAddressId:1234, seqSiteContactId:1234, contactTitle:'sample data', contactName:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {siteCode:'sample data', seqSiteAddressId:1234, seqSiteContactId:1234, contactTitle:'sample data', contactName:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {siteCode:'sample data', seqSiteAddressId:1234, seqSiteContactId:1234, contactTitle:'sample data', contactName:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'}

      ];
      service.getSiteAddressContacts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresscontacts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(siteAddressContact);
    });
  });


  describe('#createSiteAddressContact', () => {
    var id = 1;
    it('should return an Promise<SiteAddressContact>', () => {
      const siteAddressContact: SiteAddressContact = {siteCode:'sample data', seqSiteAddressId:1234, seqSiteContactId:1234, contactTitle:'sample data', contactName:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.createSiteAddressContact(siteAddressContact).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresscontacts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSiteAddressContact', () => {
    var id = 1;
    it('should return an Promise<SiteAddressContact>', () => {
      const siteAddressContact: SiteAddressContact = {siteCode:'sample data', seqSiteAddressId:1234, seqSiteContactId:1234, contactTitle:'sample data', contactName:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', primaryContact:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.updateSiteAddressContact(siteAddressContact, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresscontacts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSiteAddressContact', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSiteAddressContact(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresscontacts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});