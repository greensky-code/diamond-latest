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

import { ContactTitleMasterService } from './contact-title-master.service';
import { ContactTitleMaster } from '../api-models/contact-title-master.model'
import { ContactTitleMasters } from "../api-models/testing/fake-contact-title-master.model"

describe('ContactTitleMasterService', () => {
  let injector: TestBed;
  let service: ContactTitleMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactTitleMasterService]
    });
    injector = getTestBed();
    service = injector.get(ContactTitleMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getContactTitleMasters', () => {
    it('should return an Promise<ContactTitleMaster[]>', () => {
      const contactTitleMaster = [
       {titleType:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', contactTitle:'sample data'},
       {titleType:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', contactTitle:'sample data'},
       {titleType:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', contactTitle:'sample data'}

      ];
      service.getContactTitleMasters().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/contacttitlemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(contactTitleMaster);
    });
  });


  describe('#createContactTitleMaster', () => {
    var id = 1;
    it('should return an Promise<ContactTitleMaster>', () => {
      const contactTitleMaster: ContactTitleMaster = {titleType:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', contactTitle:'sample data'};
      service.createContactTitleMaster(contactTitleMaster).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/contacttitlemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateContactTitleMaster', () => {
    var id = 1;
    it('should return an Promise<ContactTitleMaster>', () => {
      const contactTitleMaster: ContactTitleMaster = {titleType:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', description:'sample data', contactTitle:'sample data'};
      service.updateContactTitleMaster(contactTitleMaster, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/contacttitlemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteContactTitleMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteContactTitleMaster(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/contacttitlemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});