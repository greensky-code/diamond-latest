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

import { GroupPanelService } from './group-panel.service';
import { GroupPanel } from '../api-models/group-panel.model'
import { GroupPanels } from "../api-models/testing/fake-group-panel.model"

describe('GroupPanelService', () => {
  let injector: TestBed;
  let service: GroupPanelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupPanelService]
    });
    injector = getTestBed();
    service = injector.get(GroupPanelService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGroupPanels', () => {
    it('should return an Promise<GroupPanel[]>', () => {
      const groupPanel = [
       {seqGroupPanel:1234, seqGroupId:1234, panelId:'sample data', planCode:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGroupPanel:1234, seqGroupId:1234, panelId:'sample data', planCode:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGroupPanel:1234, seqGroupId:1234, panelId:'sample data', planCode:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getGroupPanels().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/grouppanels/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(groupPanel);
    });
  });


  describe('#createGroupPanel', () => {
    var id = 1;
    it('should return an Promise<GroupPanel>', () => {
      const groupPanel: GroupPanel = {seqGroupPanel:1234, seqGroupId:1234, panelId:'sample data', planCode:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createGroupPanel(groupPanel).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/grouppanels`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGroupPanel', () => {
    var id = 1;
    it('should return an Promise<GroupPanel>', () => {
      const groupPanel: GroupPanel = {seqGroupPanel:1234, seqGroupId:1234, panelId:'sample data', planCode:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateGroupPanel(groupPanel, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/grouppanels/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGroupPanel', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGroupPanel(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/grouppanels/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});