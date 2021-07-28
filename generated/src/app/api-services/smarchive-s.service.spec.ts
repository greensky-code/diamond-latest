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

import { SmarchiveSService } from './smarchive-s.service';
import { SmarchiveS } from '../api-models/smarchive-s.model'
import { SmarchiveSs } from "../api-models/testing/fake-smarchive-s.model"

describe('SmarchiveSService', () => {
  let injector: TestBed;
  let service: SmarchiveSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmarchiveSService]
    });
    injector = getTestBed();
    service = injector.get(SmarchiveSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmarchiveSs', () => {
    it('should return an Promise<SmarchiveS[]>', () => {
      const smarchiveS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, archivePrdlocation:'sample data', archiveArchivelocation:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, archivePrdlocation:'sample data', archiveArchivelocation:'sample data'},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, archivePrdlocation:'sample data', archiveArchivelocation:'sample data'}

      ];
      service.getSmarchiveSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smarchivess/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smarchiveS);
    });
  });


  describe('#createSmarchiveS', () => {
    var id = 1;
    it('should return an Promise<SmarchiveS>', () => {
      const smarchiveS: SmarchiveS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, archivePrdlocation:'sample data', archiveArchivelocation:'sample data'};
      service.createSmarchiveS(smarchiveS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smarchivess`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmarchiveS', () => {
    var id = 1;
    it('should return an Promise<SmarchiveS>', () => {
      const smarchiveS: SmarchiveS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, archivePrdlocation:'sample data', archiveArchivelocation:'sample data'};
      service.updateSmarchiveS(smarchiveS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smarchivess/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmarchiveS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmarchiveS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smarchivess/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});