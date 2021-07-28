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

import { SiteAddressService } from './site-address.service';
import { SiteAddress } from '../api-models/site-address.model'
import { SiteAddresses } from "../api-models/testing/fake-site-address.model"

describe('SiteAddressService', () => {
  let injector: TestBed;
  let service: SiteAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SiteAddressService]
    });
    injector = getTestBed();
    service = injector.get(SiteAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSiteAddresses', () => {
    it('should return an Promise<SiteAddress[]>', () => {
      const siteAddress = [
       {siteCode:'sample data', seqSiteAddressId:1234, termReasonCode:'sample data', name1:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', county:'sample data', state:'sample data', zipCode:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', mailingAddressLine1:'sample data', mailingAddressLine2:'sample data', mailingCity:'sample data', mailingCounty:'sample data', mailingState:'sample data', mailingZipCode:'sample data', siteaUserDefined1:'sample data', siteaUserDefined2:'sample data', siteaUserDate1:'2018-01-01', siteaUserDate2:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', securityCode:'sample data', certifiedFlg:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', primaryAddressFlg:'sample data'},
       {siteCode:'sample data', seqSiteAddressId:1234, termReasonCode:'sample data', name1:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', county:'sample data', state:'sample data', zipCode:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', mailingAddressLine1:'sample data', mailingAddressLine2:'sample data', mailingCity:'sample data', mailingCounty:'sample data', mailingState:'sample data', mailingZipCode:'sample data', siteaUserDefined1:'sample data', siteaUserDefined2:'sample data', siteaUserDate1:'2018-01-01', siteaUserDate2:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', securityCode:'sample data', certifiedFlg:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', primaryAddressFlg:'sample data'},
       {siteCode:'sample data', seqSiteAddressId:1234, termReasonCode:'sample data', name1:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', county:'sample data', state:'sample data', zipCode:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', mailingAddressLine1:'sample data', mailingAddressLine2:'sample data', mailingCity:'sample data', mailingCounty:'sample data', mailingState:'sample data', mailingZipCode:'sample data', siteaUserDefined1:'sample data', siteaUserDefined2:'sample data', siteaUserDate1:'2018-01-01', siteaUserDate2:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', securityCode:'sample data', certifiedFlg:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', primaryAddressFlg:'sample data'}

      ];
      service.getSiteAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(siteAddress);
    });
  });


  describe('#createSiteAddress', () => {
    var id = 1;
    it('should return an Promise<SiteAddress>', () => {
      const siteAddress: SiteAddress = {siteCode:'sample data', seqSiteAddressId:1234, termReasonCode:'sample data', name1:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', county:'sample data', state:'sample data', zipCode:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', mailingAddressLine1:'sample data', mailingAddressLine2:'sample data', mailingCity:'sample data', mailingCounty:'sample data', mailingState:'sample data', mailingZipCode:'sample data', siteaUserDefined1:'sample data', siteaUserDefined2:'sample data', siteaUserDate1:'2018-01-01', siteaUserDate2:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', securityCode:'sample data', certifiedFlg:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', primaryAddressFlg:'sample data'};
      service.createSiteAddress(siteAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSiteAddress', () => {
    var id = 1;
    it('should return an Promise<SiteAddress>', () => {
      const siteAddress: SiteAddress = {siteCode:'sample data', seqSiteAddressId:1234, termReasonCode:'sample data', name1:'sample data', name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', county:'sample data', state:'sample data', zipCode:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', mailingAddressLine1:'sample data', mailingAddressLine2:'sample data', mailingCity:'sample data', mailingCounty:'sample data', mailingState:'sample data', mailingZipCode:'sample data', siteaUserDefined1:'sample data', siteaUserDefined2:'sample data', siteaUserDate1:'2018-01-01', siteaUserDate2:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', securityCode:'sample data', certifiedFlg:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', primaryAddressFlg:'sample data'};
      service.updateSiteAddress(siteAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSiteAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSiteAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/siteaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});