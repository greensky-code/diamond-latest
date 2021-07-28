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

import { ProvAddressService } from './prov-address.service';
import { ProvAddress } from '../api-models/prov-address.model'
import { ProvAddresses } from "../api-models/testing/fake-prov-address.model"

describe('ProvAddressService', () => {
  let injector: TestBed;
  let service: ProvAddressService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvAddressService]
    });
    injector = getTestBed();
    service = injector.get(ProvAddressService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvAddresses', () => {
    it('should return an Promise<ProvAddress[]>', () => {
      const provAddress = [
       {seqProvAddress:1234, seqProvId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', medicalGroup:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryAddress:'sample data', country:'sample data', longitude:1234, latitude:1234, geoResult:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', siteCode:'sample data', seqSiteAddressId:1234},
       {seqProvAddress:1234, seqProvId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', medicalGroup:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryAddress:'sample data', country:'sample data', longitude:1234, latitude:1234, geoResult:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', siteCode:'sample data', seqSiteAddressId:1234},
       {seqProvAddress:1234, seqProvId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', medicalGroup:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryAddress:'sample data', country:'sample data', longitude:1234, latitude:1234, geoResult:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', siteCode:'sample data', seqSiteAddressId:1234}

      ];
      service.getProvAddresses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provAddress);
    });
  });


  describe('#createProvAddress', () => {
    var id = 1;
    it('should return an Promise<ProvAddress>', () => {
      const provAddress: ProvAddress = {seqProvAddress:1234, seqProvId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', medicalGroup:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryAddress:'sample data', country:'sample data', longitude:1234, latitude:1234, geoResult:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', siteCode:'sample data', seqSiteAddressId:1234};
      service.createProvAddress(provAddress).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvAddress', () => {
    var id = 1;
    it('should return an Promise<ProvAddress>', () => {
      const provAddress: ProvAddress = {seqProvAddress:1234, seqProvId:1234, name2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', county:'sample data', medicalGroup:'sample data', sundayHours:'sample data', mondayHours:'sample data', tuesdayHours:'sample data', wednesdayHours:'sample data', thursdayHours:'sample data', fridayHours:'sample data', saturdayHours:'sample data', userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryAddress:'sample data', country:'sample data', longitude:1234, latitude:1234, geoResult:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', siteCode:'sample data', seqSiteAddressId:1234};
      service.updateProvAddress(provAddress, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvAddress', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvAddress(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provaddresses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});