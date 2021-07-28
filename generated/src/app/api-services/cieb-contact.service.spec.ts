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

import { CiebContactService } from './cieb-contact.service';
import { CiebContact } from '../api-models/cieb-contact.model'
import { CiebContacts } from "../api-models/testing/fake-cieb-contact.model"

describe('CiebContactService', () => {
  let injector: TestBed;
  let service: CiebContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebContactService]
    });
    injector = getTestBed();
    service = injector.get(CiebContactService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebContacts', () => {
    it('should return an Promise<CiebContact[]>', () => {
      const ciebContact = [
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', termDate:'2018-01-01', effDate:'2018-01-01', phoneExt:'sample data', phoneNum:'sample data', phonePrefix:'sample data', emailAddress:'sample data', lastName:'sample data', firstName:'sample data', contactCode:'sample data', seqEntityId:1234, seqContactId:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', termDate:'2018-01-01', effDate:'2018-01-01', phoneExt:'sample data', phoneNum:'sample data', phonePrefix:'sample data', emailAddress:'sample data', lastName:'sample data', firstName:'sample data', contactCode:'sample data', seqEntityId:1234, seqContactId:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', termDate:'2018-01-01', effDate:'2018-01-01', phoneExt:'sample data', phoneNum:'sample data', phonePrefix:'sample data', emailAddress:'sample data', lastName:'sample data', firstName:'sample data', contactCode:'sample data', seqEntityId:1234, seqContactId:1234}

      ];
      service.getCiebContacts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcontacts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebContact);
    });
  });


  describe('#createCiebContact', () => {
    var id = 1;
    it('should return an Promise<CiebContact>', () => {
      const ciebContact: CiebContact = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', termDate:'2018-01-01', effDate:'2018-01-01', phoneExt:'sample data', phoneNum:'sample data', phonePrefix:'sample data', emailAddress:'sample data', lastName:'sample data', firstName:'sample data', contactCode:'sample data', seqEntityId:1234, seqContactId:1234};
      service.createCiebContact(ciebContact).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcontacts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebContact', () => {
    var id = 1;
    it('should return an Promise<CiebContact>', () => {
      const ciebContact: CiebContact = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', termDate:'2018-01-01', effDate:'2018-01-01', phoneExt:'sample data', phoneNum:'sample data', phonePrefix:'sample data', emailAddress:'sample data', lastName:'sample data', firstName:'sample data', contactCode:'sample data', seqEntityId:1234, seqContactId:1234};
      service.updateCiebContact(ciebContact, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcontacts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebContact', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebContact(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebcontacts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});