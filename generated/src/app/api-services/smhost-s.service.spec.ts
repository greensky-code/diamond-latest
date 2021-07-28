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

import { SmhostSService } from './smhost-s.service';
import { SmhostS } from '../api-models/smhost-s.model'
import { SmhostSs } from "../api-models/testing/fake-smhost-s.model"

describe('SmhostSService', () => {
  let injector: TestBed;
  let service: SmhostSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmhostSService]
    });
    injector = getTestBed();
    service = injector.get(SmhostSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmhostSs', () => {
    it('should return an Promise<SmhostS[]>', () => {
      const smhostS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostHostname:'sample data', hostRpcaddress:'sample data', hostFtpaddress:'sample data', hostOs:'sample data', hostOsversion:'sample data', hostState:1234, hostIssoserver:1234, hostIsdistributionhost:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostHostname:'sample data', hostRpcaddress:'sample data', hostFtpaddress:'sample data', hostOs:'sample data', hostOsversion:'sample data', hostState:1234, hostIssoserver:1234, hostIsdistributionhost:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostHostname:'sample data', hostRpcaddress:'sample data', hostFtpaddress:'sample data', hostOs:'sample data', hostOsversion:'sample data', hostState:1234, hostIssoserver:1234, hostIsdistributionhost:1234}

      ];
      service.getSmhostSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smhostss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smhostS);
    });
  });


  describe('#createSmhostS', () => {
    var id = 1;
    it('should return an Promise<SmhostS>', () => {
      const smhostS: SmhostS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostHostname:'sample data', hostRpcaddress:'sample data', hostFtpaddress:'sample data', hostOs:'sample data', hostOsversion:'sample data', hostState:1234, hostIssoserver:1234, hostIsdistributionhost:1234};
      service.createSmhostS(smhostS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smhostss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmhostS', () => {
    var id = 1;
    it('should return an Promise<SmhostS>', () => {
      const smhostS: SmhostS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, hostHostname:'sample data', hostRpcaddress:'sample data', hostFtpaddress:'sample data', hostOs:'sample data', hostOsversion:'sample data', hostState:1234, hostIssoserver:1234, hostIsdistributionhost:1234};
      service.updateSmhostS(smhostS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smhostss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmhostS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmhostS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smhostss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});