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

import { NoteMasterService } from './note-master.service';
import { NoteMaster } from '../api-models/note-master.model'
import { NoteMasters } from "../api-models/testing/fake-note-master.model"

describe('NoteMasterService', () => {
  let injector: TestBed;
  let service: NoteMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteMasterService]
    });
    injector = getTestBed();
    service = injector.get(NoteMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getNoteMasters', () => {
    it('should return an Promise<NoteMaster[]>', () => {
      const noteMaster = [
       {seqNoteId:1234, noteType:'sample data', seqSourceId:1234, charSourceId:'sample data', noteDate:'2018-01-01', noteText:'sample data', expirationDate:'2018-01-01', followupDate:'2018-01-01', followupCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', seqMembId:1234, seqGroupId:1234, seqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', noteWinId:'sample data', priority:'sample data'},
       {seqNoteId:1234, noteType:'sample data', seqSourceId:1234, charSourceId:'sample data', noteDate:'2018-01-01', noteText:'sample data', expirationDate:'2018-01-01', followupDate:'2018-01-01', followupCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', seqMembId:1234, seqGroupId:1234, seqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', noteWinId:'sample data', priority:'sample data'},
       {seqNoteId:1234, noteType:'sample data', seqSourceId:1234, charSourceId:'sample data', noteDate:'2018-01-01', noteText:'sample data', expirationDate:'2018-01-01', followupDate:'2018-01-01', followupCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', seqMembId:1234, seqGroupId:1234, seqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', noteWinId:'sample data', priority:'sample data'}

      ];
      service.getNoteMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/notemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(noteMaster);
    });
  });


  describe('#createNoteMaster', () => {
    var id = 1;
    it('should return an Promise<NoteMaster>', () => {
      const noteMaster: NoteMaster = {seqNoteId:1234, noteType:'sample data', seqSourceId:1234, charSourceId:'sample data', noteDate:'2018-01-01', noteText:'sample data', expirationDate:'2018-01-01', followupDate:'2018-01-01', followupCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', seqMembId:1234, seqGroupId:1234, seqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', noteWinId:'sample data', priority:'sample data'};
      service.createNoteMaster(noteMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateNoteMaster', () => {
    var id = 1;
    it('should return an Promise<NoteMaster>', () => {
      const noteMaster: NoteMaster = {seqNoteId:1234, noteType:'sample data', seqSourceId:1234, charSourceId:'sample data', noteDate:'2018-01-01', noteText:'sample data', expirationDate:'2018-01-01', followupDate:'2018-01-01', followupCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', seqMembId:1234, seqGroupId:1234, seqProvId:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', noteWinId:'sample data', priority:'sample data'};
      service.updateNoteMaster(noteMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteNoteMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteNoteMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/notemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});