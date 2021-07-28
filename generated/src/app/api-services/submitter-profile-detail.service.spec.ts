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

import { SubmitterProfileDetailService } from './submitter-profile-detail.service';
import { SubmitterProfileDetail } from '../api-models/submitter-profile-detail.model'
import { SubmitterProfileDetails } from "../api-models/testing/fake-submitter-profile-detail.model"

describe('SubmitterProfileDetailService', () => {
  let injector: TestBed;
  let service: SubmitterProfileDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubmitterProfileDetailService]
    });
    injector = getTestBed();
    service = injector.get(SubmitterProfileDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSubmitterProfileDetails', () => {
    it('should return an Promise<SubmitterProfileDetail[]>', () => {
      const submitterProfileDetail = [
       {submitterId:'sample data', fileType:'sample data', dataType:'sample data', mediaType:'sample data', blockSize:1234, customFormatPgm:'sample data', encryptFormat:'sample data', encryptKey:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', submitterDetailCode:'sample data', description:'sample data', userDefined1:'sample data', userDefined2:'sample data'},
       {submitterId:'sample data', fileType:'sample data', dataType:'sample data', mediaType:'sample data', blockSize:1234, customFormatPgm:'sample data', encryptFormat:'sample data', encryptKey:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', submitterDetailCode:'sample data', description:'sample data', userDefined1:'sample data', userDefined2:'sample data'},
       {submitterId:'sample data', fileType:'sample data', dataType:'sample data', mediaType:'sample data', blockSize:1234, customFormatPgm:'sample data', encryptFormat:'sample data', encryptKey:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', submitterDetailCode:'sample data', description:'sample data', userDefined1:'sample data', userDefined2:'sample data'}

      ];
      service.getSubmitterProfileDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofiledetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(submitterProfileDetail);
    });
  });


  describe('#createSubmitterProfileDetail', () => {
    var id = 1;
    it('should return an Promise<SubmitterProfileDetail>', () => {
      const submitterProfileDetail: SubmitterProfileDetail = {submitterId:'sample data', fileType:'sample data', dataType:'sample data', mediaType:'sample data', blockSize:1234, customFormatPgm:'sample data', encryptFormat:'sample data', encryptKey:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', submitterDetailCode:'sample data', description:'sample data', userDefined1:'sample data', userDefined2:'sample data'};
      service.createSubmitterProfileDetail(submitterProfileDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofiledetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSubmitterProfileDetail', () => {
    var id = 1;
    it('should return an Promise<SubmitterProfileDetail>', () => {
      const submitterProfileDetail: SubmitterProfileDetail = {submitterId:'sample data', fileType:'sample data', dataType:'sample data', mediaType:'sample data', blockSize:1234, customFormatPgm:'sample data', encryptFormat:'sample data', encryptKey:'sample data', runOption1:'sample data', runOption2:'sample data', runOption3:'sample data', runOption4:'sample data', runOption5:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', submitterDetailCode:'sample data', description:'sample data', userDefined1:'sample data', userDefined2:'sample data'};
      service.updateSubmitterProfileDetail(submitterProfileDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofiledetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSubmitterProfileDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSubmitterProfileDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofiledetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});