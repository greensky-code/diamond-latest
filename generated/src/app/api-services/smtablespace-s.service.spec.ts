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

import { SmtablespaceSService } from './smtablespace-s.service';
import { SmtablespaceS } from '../api-models/smtablespace-s.model'
import { SmtablespaceSs } from "../api-models/testing/fake-smtablespace-s.model"

describe('SmtablespaceSService', () => {
  let injector: TestBed;
  let service: SmtablespaceSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmtablespaceSService]
    });
    injector = getTestBed();
    service = injector.get(SmtablespaceSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmtablespaceSs', () => {
    it('should return an Promise<SmtablespaceS[]>', () => {
      const smtablespaceS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, tablespaceName:'sample data', tablespaceFreespace:1234, tablespaceTotalspace:1234, tablespaceLargestfext:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, tablespaceName:'sample data', tablespaceFreespace:1234, tablespaceTotalspace:1234, tablespaceLargestfext:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, tablespaceName:'sample data', tablespaceFreespace:1234, tablespaceTotalspace:1234, tablespaceLargestfext:1234}

      ];
      service.getSmtablespaceSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smtablespacess/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smtablespaceS);
    });
  });


  describe('#createSmtablespaceS', () => {
    var id = 1;
    it('should return an Promise<SmtablespaceS>', () => {
      const smtablespaceS: SmtablespaceS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, tablespaceName:'sample data', tablespaceFreespace:1234, tablespaceTotalspace:1234, tablespaceLargestfext:1234};
      service.createSmtablespaceS(smtablespaceS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smtablespacess`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmtablespaceS', () => {
    var id = 1;
    it('should return an Promise<SmtablespaceS>', () => {
      const smtablespaceS: SmtablespaceS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, tablespaceName:'sample data', tablespaceFreespace:1234, tablespaceTotalspace:1234, tablespaceLargestfext:1234};
      service.updateSmtablespaceS(smtablespaceS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smtablespacess/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmtablespaceS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmtablespaceS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smtablespacess/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});