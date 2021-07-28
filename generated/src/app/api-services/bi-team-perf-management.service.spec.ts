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

import { BiTeamPerfManagementService } from './bi-team-perf-management.service';
import { BiTeamPerfManagement } from '../api-models/bi-team-perf-management.model'
import { BiTeamPerfManagements } from "../api-models/testing/fake-bi-team-perf-management.model"

describe('BiTeamPerfManagementService', () => {
  let injector: TestBed;
  let service: BiTeamPerfManagementService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BiTeamPerfManagementService]
    });
    injector = getTestBed();
    service = injector.get(BiTeamPerfManagementService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBiTeamPerfManagements', () => {
    it('should return an Promise<BiTeamPerfManagement[]>', () => {
      const biTeamPerfManagement = [
       {issueId:1234, title:'sample data', status:'sample data', dateReceived:'2018-01-01', completionDate:'2018-01-01', configurationRequestStatus:'sample data', priority:'sample data', assignedTo:'sample data', category:'sample data', requestor:'sample data', requestingDepartment:'sample data', complexity:'sample data', application:'sample data', workHours:1234, itemType:1234, path:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {issueId:1234, title:'sample data', status:'sample data', dateReceived:'2018-01-01', completionDate:'2018-01-01', configurationRequestStatus:'sample data', priority:'sample data', assignedTo:'sample data', category:'sample data', requestor:'sample data', requestingDepartment:'sample data', complexity:'sample data', application:'sample data', workHours:1234, itemType:1234, path:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {issueId:1234, title:'sample data', status:'sample data', dateReceived:'2018-01-01', completionDate:'2018-01-01', configurationRequestStatus:'sample data', priority:'sample data', assignedTo:'sample data', category:'sample data', requestor:'sample data', requestingDepartment:'sample data', complexity:'sample data', application:'sample data', workHours:1234, itemType:1234, path:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBiTeamPerfManagements().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/biteamperfmanagements/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(biTeamPerfManagement);
    });
  });


  describe('#createBiTeamPerfManagement', () => {
    var id = 1;
    it('should return an Promise<BiTeamPerfManagement>', () => {
      const biTeamPerfManagement: BiTeamPerfManagement = {issueId:1234, title:'sample data', status:'sample data', dateReceived:'2018-01-01', completionDate:'2018-01-01', configurationRequestStatus:'sample data', priority:'sample data', assignedTo:'sample data', category:'sample data', requestor:'sample data', requestingDepartment:'sample data', complexity:'sample data', application:'sample data', workHours:1234, itemType:1234, path:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBiTeamPerfManagement(biTeamPerfManagement).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/biteamperfmanagements`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBiTeamPerfManagement', () => {
    var id = 1;
    it('should return an Promise<BiTeamPerfManagement>', () => {
      const biTeamPerfManagement: BiTeamPerfManagement = {issueId:1234, title:'sample data', status:'sample data', dateReceived:'2018-01-01', completionDate:'2018-01-01', configurationRequestStatus:'sample data', priority:'sample data', assignedTo:'sample data', category:'sample data', requestor:'sample data', requestingDepartment:'sample data', complexity:'sample data', application:'sample data', workHours:1234, itemType:1234, path:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBiTeamPerfManagement(biTeamPerfManagement, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/biteamperfmanagements/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBiTeamPerfManagement', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBiTeamPerfManagement(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/biteamperfmanagements/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});