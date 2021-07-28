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

import { SiteCodeMasterService } from './site-code-master.service';
import { SiteCodeMaster } from '../api-models/site-code-master.model'
import { SiteCodeMasters } from "../api-models/testing/fake-site-code-master.model"

describe('SiteCodeMasterService', () => {
  let injector: TestBed;
  let service: SiteCodeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SiteCodeMasterService]
    });
    injector = getTestBed();
    service = injector.get(SiteCodeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSiteCodeMasters', () => {
    it('should return an Promise<SiteCodeMaster[]>', () => {
      const siteCodeMaster = [
       {siteCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', ipaId:'sample data', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', description:'sample data', sitemUserDefined1:'sample data', sitemUserDefined2:'sample data', sitemUserDate1:'2018-01-01', sitemUserDate2:'2018-01-01', securityCode:'sample data'},
       {siteCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', ipaId:'sample data', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', description:'sample data', sitemUserDefined1:'sample data', sitemUserDefined2:'sample data', sitemUserDate1:'2018-01-01', sitemUserDate2:'2018-01-01', securityCode:'sample data'},
       {siteCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', ipaId:'sample data', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', description:'sample data', sitemUserDefined1:'sample data', sitemUserDefined2:'sample data', sitemUserDate1:'2018-01-01', sitemUserDate2:'2018-01-01', securityCode:'sample data'}

      ];
      service.getSiteCodeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/sitecodemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(siteCodeMaster);
    });
  });


  describe('#createSiteCodeMaster', () => {
    var id = 1;
    it('should return an Promise<SiteCodeMaster>', () => {
      const siteCodeMaster: SiteCodeMaster = {siteCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', ipaId:'sample data', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', description:'sample data', sitemUserDefined1:'sample data', sitemUserDefined2:'sample data', sitemUserDate1:'2018-01-01', sitemUserDate2:'2018-01-01', securityCode:'sample data'};
      service.createSiteCodeMaster(siteCodeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/sitecodemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSiteCodeMaster', () => {
    var id = 1;
    it('should return an Promise<SiteCodeMaster>', () => {
      const siteCodeMaster: SiteCodeMaster = {siteCode:'sample data', lineOfBusiness:'sample data', panelId:'sample data', ipaId:'sample data', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01', description:'sample data', sitemUserDefined1:'sample data', sitemUserDefined2:'sample data', sitemUserDate1:'2018-01-01', sitemUserDate2:'2018-01-01', securityCode:'sample data'};
      service.updateSiteCodeMaster(siteCodeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/sitecodemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSiteCodeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSiteCodeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/sitecodemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});