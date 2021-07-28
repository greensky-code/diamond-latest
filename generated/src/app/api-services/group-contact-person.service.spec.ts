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

import { GroupContactPersonService } from './group-contact-person.service';
import { GroupContactPerson } from '../api-models/group-contact-person.model'
import { GroupContactPersons } from "../api-models/testing/fake-group-contact-person.model"

describe('GroupContactPersonService', () => {
  let injector: TestBed;
  let service: GroupContactPersonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupContactPersonService]
    });
    injector = getTestBed();
    service = injector.get(GroupContactPersonService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGroupContactPersons', () => {
    it('should return an Promise<GroupContactPerson[]>', () => {
      const groupContactPerson = [
       {seqGroupContact:1234, seqGroupId:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'},
       {seqGroupContact:1234, seqGroupId:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'},
       {seqGroupContact:1234, seqGroupId:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'}

      ];
      service.getGroupContactPersons().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontactpersons/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(groupContactPerson);
    });
  });


  describe('#createGroupContactPerson', () => {
    var id = 1;
    it('should return an Promise<GroupContactPerson>', () => {
      const groupContactPerson: GroupContactPerson = {seqGroupContact:1234, seqGroupId:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'};
      service.createGroupContactPerson(groupContactPerson).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontactpersons`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGroupContactPerson', () => {
    var id = 1;
    it('should return an Promise<GroupContactPerson>', () => {
      const groupContactPerson: GroupContactPerson = {seqGroupContact:1234, seqGroupId:1234, contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', extension:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', primaryDistributionMethod:'sample data', emailId:'sample data'};
      service.updateGroupContactPerson(groupContactPerson, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontactpersons/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGroupContactPerson', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGroupContactPerson(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupcontactpersons/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});