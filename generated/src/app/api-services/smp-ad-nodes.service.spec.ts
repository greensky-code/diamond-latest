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

import { SmpAdNodesService } from './smp-ad-nodes.service';
import { SmpAdNodes } from '../api-models/smp-ad-nodes.model'
import { SmpAdNodeses } from "../api-models/testing/fake-smp-ad-nodes.model"

describe('SmpAdNodesService', () => {
  let injector: TestBed;
  let service: SmpAdNodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpAdNodesService]
    });
    injector = getTestBed();
    service = injector.get(SmpAdNodesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpAdNodeses', () => {
    it('should return an Promise<SmpAdNodes[]>', () => {
      const smpAdNodes = [
       {owner:'sample data', node:'sample data', remoteName:'sample data', selectedForDiscovery:1234, discoverState:'sample data', discoverFlags:1234, discoverTime:'2018-01-01', lastContactAttempt:'2018-01-01', sequence:1234},
       {owner:'sample data', node:'sample data', remoteName:'sample data', selectedForDiscovery:1234, discoverState:'sample data', discoverFlags:1234, discoverTime:'2018-01-01', lastContactAttempt:'2018-01-01', sequence:1234},
       {owner:'sample data', node:'sample data', remoteName:'sample data', selectedForDiscovery:1234, discoverState:'sample data', discoverFlags:1234, discoverTime:'2018-01-01', lastContactAttempt:'2018-01-01', sequence:1234}

      ];
      service.getSmpAdNodeses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpadnodeses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpAdNodes);
    });
  });


  describe('#createSmpAdNodes', () => {
    var id = 1;
    it('should return an Promise<SmpAdNodes>', () => {
      const smpAdNodes: SmpAdNodes = {owner:'sample data', node:'sample data', remoteName:'sample data', selectedForDiscovery:1234, discoverState:'sample data', discoverFlags:1234, discoverTime:'2018-01-01', lastContactAttempt:'2018-01-01', sequence:1234};
      service.createSmpAdNodes(smpAdNodes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadnodeses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpAdNodes', () => {
    var id = 1;
    it('should return an Promise<SmpAdNodes>', () => {
      const smpAdNodes: SmpAdNodes = {owner:'sample data', node:'sample data', remoteName:'sample data', selectedForDiscovery:1234, discoverState:'sample data', discoverFlags:1234, discoverTime:'2018-01-01', lastContactAttempt:'2018-01-01', sequence:1234};
      service.updateSmpAdNodes(smpAdNodes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadnodeses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpAdNodes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpAdNodes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpadnodeses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});