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

import { SmpAdDiscoveredNodesService } from './smp-ad-discovered-nodes.service';
import { SmpAdDiscoveredNodes } from '../api-models/smp-ad-discovered-nodes.model'
import { SmpAdDiscoveredNodeses } from "../api-models/testing/fake-smp-ad-discovered-nodes.model"

describe('SmpAdDiscoveredNodesService', () => {
  let injector: TestBed;
  let service: SmpAdDiscoveredNodesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmpAdDiscoveredNodesService]
    });
    injector = getTestBed();
    service = injector.get(SmpAdDiscoveredNodesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmpAdDiscoveredNodeses', () => {
    it('should return an Promise<SmpAdDiscoveredNodes[]>', () => {
      const smpAdDiscoveredNodes = [
       {owner:'sample data', node:'sample data', address:'sample data'},
       {owner:'sample data', node:'sample data', address:'sample data'},
       {owner:'sample data', node:'sample data', address:'sample data'}

      ];
      service.getSmpAdDiscoveredNodeses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smpaddiscoverednodeses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smpAdDiscoveredNodes);
    });
  });


  describe('#createSmpAdDiscoveredNodes', () => {
    var id = 1;
    it('should return an Promise<SmpAdDiscoveredNodes>', () => {
      const smpAdDiscoveredNodes: SmpAdDiscoveredNodes = {owner:'sample data', node:'sample data', address:'sample data'};
      service.createSmpAdDiscoveredNodes(smpAdDiscoveredNodes).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpaddiscoverednodeses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmpAdDiscoveredNodes', () => {
    var id = 1;
    it('should return an Promise<SmpAdDiscoveredNodes>', () => {
      const smpAdDiscoveredNodes: SmpAdDiscoveredNodes = {owner:'sample data', node:'sample data', address:'sample data'};
      service.updateSmpAdDiscoveredNodes(smpAdDiscoveredNodes, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpaddiscoverednodeses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmpAdDiscoveredNodes', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmpAdDiscoveredNodes(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smpaddiscoverednodeses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});