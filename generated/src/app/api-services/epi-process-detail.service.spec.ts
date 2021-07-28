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

import { EpiProcessDetailService } from './epi-process-detail.service';
import { EpiProcessDetail } from '../api-models/epi-process-detail.model'
import { EpiProcessDetails } from "../api-models/testing/fake-epi-process-detail.model"

describe('EpiProcessDetailService', () => {
  let injector: TestBed;
  let service: EpiProcessDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpiProcessDetailService]
    });
    injector = getTestBed();
    service = injector.get(EpiProcessDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEpiProcessDetails', () => {
    it('should return an Promise<EpiProcessDetail[]>', () => {
      const epiProcessDetail = [
       {seqProcessId:1234, seqSessionId:1234, seqSourceId:1234, comments:'sample data', startTime:'2018-01-01', endTime:'2018-01-01', status:'sample data', returnValue:1234, unixProcessId:1234, commandPath:'sample data', seqPrevSessionId:1234, argumentString:'sample data'},
       {seqProcessId:1234, seqSessionId:1234, seqSourceId:1234, comments:'sample data', startTime:'2018-01-01', endTime:'2018-01-01', status:'sample data', returnValue:1234, unixProcessId:1234, commandPath:'sample data', seqPrevSessionId:1234, argumentString:'sample data'},
       {seqProcessId:1234, seqSessionId:1234, seqSourceId:1234, comments:'sample data', startTime:'2018-01-01', endTime:'2018-01-01', status:'sample data', returnValue:1234, unixProcessId:1234, commandPath:'sample data', seqPrevSessionId:1234, argumentString:'sample data'}

      ];
      service.getEpiProcessDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(epiProcessDetail);
    });
  });


  describe('#createEpiProcessDetail', () => {
    var id = 1;
    it('should return an Promise<EpiProcessDetail>', () => {
      const epiProcessDetail: EpiProcessDetail = {seqProcessId:1234, seqSessionId:1234, seqSourceId:1234, comments:'sample data', startTime:'2018-01-01', endTime:'2018-01-01', status:'sample data', returnValue:1234, unixProcessId:1234, commandPath:'sample data', seqPrevSessionId:1234, argumentString:'sample data'};
      service.createEpiProcessDetail(epiProcessDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEpiProcessDetail', () => {
    var id = 1;
    it('should return an Promise<EpiProcessDetail>', () => {
      const epiProcessDetail: EpiProcessDetail = {seqProcessId:1234, seqSessionId:1234, seqSourceId:1234, comments:'sample data', startTime:'2018-01-01', endTime:'2018-01-01', status:'sample data', returnValue:1234, unixProcessId:1234, commandPath:'sample data', seqPrevSessionId:1234, argumentString:'sample data'};
      service.updateEpiProcessDetail(epiProcessDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEpiProcessDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEpiProcessDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/epiprocessdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});