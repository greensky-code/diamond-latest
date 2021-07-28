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

import { SminstallationSService } from './sminstallation-s.service';
import { SminstallationS } from '../api-models/sminstallation-s.model'
import { SminstallationSs } from "../api-models/testing/fake-sminstallation-s.model"

describe('SminstallationSService', () => {
  let injector: TestBed;
  let service: SminstallationSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SminstallationSService]
    });
    injector = getTestBed();
    service = injector.get(SminstallationSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSminstallationSs', () => {
    it('should return an Promise<SminstallationS[]>', () => {
      const sminstallationS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, installationOraclehome:'sample data', installationLanguage:'sample data', installationOs:'sample data', installationOsversion:'sample data', installationMachinetype:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, installationOraclehome:'sample data', installationLanguage:'sample data', installationOs:'sample data', installationOsversion:'sample data', installationMachinetype:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, installationOraclehome:'sample data', installationLanguage:'sample data', installationOs:'sample data', installationOsversion:'sample data', installationMachinetype:1234}

      ];
      service.getSminstallationSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/sminstallationss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(sminstallationS);
    });
  });


  describe('#createSminstallationS', () => {
    var id = 1;
    it('should return an Promise<SminstallationS>', () => {
      const sminstallationS: SminstallationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, installationOraclehome:'sample data', installationLanguage:'sample data', installationOs:'sample data', installationOsversion:'sample data', installationMachinetype:1234};
      service.createSminstallationS(sminstallationS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/sminstallationss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSminstallationS', () => {
    var id = 1;
    it('should return an Promise<SminstallationS>', () => {
      const sminstallationS: SminstallationS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, installationOraclehome:'sample data', installationLanguage:'sample data', installationOs:'sample data', installationOsversion:'sample data', installationMachinetype:1234};
      service.updateSminstallationS(sminstallationS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/sminstallationss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSminstallationS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSminstallationS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/sminstallationss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});