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

import { SmpJobService } from './smp-job.service';
import { SmpJob } from '../api-models/smp-job.model'
import { SmpJobs } from "../api-models/testing/fake-smp-job.model"

describe('SmpJobService', () => {
  let injector: TestBed;
  let service: SmpJobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpJobService]
    });
    injector = getTestBed();
    service = injector.get(SmpJobService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpJobs', () => {
    it('should return an Promise<SmpJob[]>', () => {
      const smpJob = [
       {id:1234, owner:'sample data', name:'sample data', jobtype:1234, serviceId:'sample data', schedule:'sample data', machineName:'sample data', readonly:1234, jobDescription:'sample data', fixedit:1234, library:1234, jobTmpscriptfile:'sample data'},
       {id:1234, owner:'sample data', name:'sample data', jobtype:1234, serviceId:'sample data', schedule:'sample data', machineName:'sample data', readonly:1234, jobDescription:'sample data', fixedit:1234, library:1234, jobTmpscriptfile:'sample data'},
       {id:1234, owner:'sample data', name:'sample data', jobtype:1234, serviceId:'sample data', schedule:'sample data', machineName:'sample data', readonly:1234, jobDescription:'sample data', fixedit:1234, library:1234, jobTmpscriptfile:'sample data'}

      ];
      service.getSmpJobs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpjobs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpJob);
    });
  });


  describe('#createSmpJob', () => {
    var id = 1;
    it('should return an Promise<SmpJob>', () => {
      const smpJob: SmpJob = {id:1234, owner:'sample data', name:'sample data', jobtype:1234, serviceId:'sample data', schedule:'sample data', machineName:'sample data', readonly:1234, jobDescription:'sample data', fixedit:1234, library:1234, jobTmpscriptfile:'sample data'};
      service.createSmpJob(smpJob).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpjobs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpJob', () => {
    var id = 1;
    it('should return an Promise<SmpJob>', () => {
      const smpJob: SmpJob = {id:1234, owner:'sample data', name:'sample data', jobtype:1234, serviceId:'sample data', schedule:'sample data', machineName:'sample data', readonly:1234, jobDescription:'sample data', fixedit:1234, library:1234, jobTmpscriptfile:'sample data'};
      service.updateSmpJob(smpJob, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpjobs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpJob', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpJob(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpjobs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});