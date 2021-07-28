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

import { SmmownerlinksService } from './smmownerlinks.service';
import { Smmownerlinks } from '../api-models/smmownerlinks.model'
import { Smmownerlinkss } from "../api-models/testing/fake-smmownerlinks.model"

describe('SmmownerlinksService', () => {
  let injector: TestBed;
  let service: SmmownerlinksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmmownerlinksService]
    });
    injector = getTestBed();
    service = injector.get(SmmownerlinksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmmownerlinkss', () => {
    it('should return an Promise<Smmownerlinks[]>', () => {
      const smmownerlinks = [
       {mownerid:1234, mownertype:1234, mowneeid:1234, mowneetype:1234, associationId:1234, associationRemarks:'sample data'},
       {mownerid:1234, mownertype:1234, mowneeid:1234, mowneetype:1234, associationId:1234, associationRemarks:'sample data'},
       {mownerid:1234, mownertype:1234, mowneeid:1234, mowneetype:1234, associationId:1234, associationRemarks:'sample data'}

      ];
      service.getSmmownerlinkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smmownerlinkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smmownerlinks);
    });
  });


  describe('#createSmmownerlinks', () => {
    var id = 1;
    it('should return an Promise<Smmownerlinks>', () => {
      const smmownerlinks: Smmownerlinks = {mownerid:1234, mownertype:1234, mowneeid:1234, mowneetype:1234, associationId:1234, associationRemarks:'sample data'};
      service.createSmmownerlinks(smmownerlinks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmownerlinkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmmownerlinks', () => {
    var id = 1;
    it('should return an Promise<Smmownerlinks>', () => {
      const smmownerlinks: Smmownerlinks = {mownerid:1234, mownertype:1234, mowneeid:1234, mowneetype:1234, associationId:1234, associationRemarks:'sample data'};
      service.updateSmmownerlinks(smmownerlinks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmownerlinkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmmownerlinks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmmownerlinks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smmownerlinkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});