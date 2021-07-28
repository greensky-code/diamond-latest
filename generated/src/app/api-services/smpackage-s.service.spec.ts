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

import { SmpackageSService } from './smpackage-s.service';
import { SmpackageS } from '../api-models/smpackage-s.model'
import { SmpackageSs } from "../api-models/testing/fake-smpackage-s.model"

describe('SmpackageSService', () => {
  let injector: TestBed;
  let service: SmpackageSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpackageSService]
    });
    injector = getTestBed();
    service = injector.get(SmpackageSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpackageSs', () => {
    it('should return an Promise<SmpackageS[]>', () => {
      const smpackageS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, packageName:'sample data', packageOs:'sample data', packageCreationdate:'2018-01-01', packageState:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, packageName:'sample data', packageOs:'sample data', packageCreationdate:'2018-01-01', packageState:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, packageName:'sample data', packageOs:'sample data', packageCreationdate:'2018-01-01', packageState:1234}

      ];
      service.getSmpackageSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpackagess/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpackageS);
    });
  });


  describe('#createSmpackageS', () => {
    var id = 1;
    it('should return an Promise<SmpackageS>', () => {
      const smpackageS: SmpackageS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, packageName:'sample data', packageOs:'sample data', packageCreationdate:'2018-01-01', packageState:1234};
      service.createSmpackageS(smpackageS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpackagess`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpackageS', () => {
    var id = 1;
    it('should return an Promise<SmpackageS>', () => {
      const smpackageS: SmpackageS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, packageName:'sample data', packageOs:'sample data', packageCreationdate:'2018-01-01', packageState:1234};
      service.updateSmpackageS(smpackageS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpackagess/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpackageS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpackageS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpackagess/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});