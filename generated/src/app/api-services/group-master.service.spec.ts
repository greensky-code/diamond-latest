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

import { GroupMasterService } from './group-master.service';
import { GroupMaster } from '../api-models/group-master.model'
import { GroupMasters } from "../api-models/testing/fake-group-master.model"

describe('GroupMasterService', () => {
  let injector: TestBed;
  let service: GroupMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupMasterService]
    });
    injector = getTestBed();
    service = injector.get(GroupMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGroupMasters', () => {
    it('should return an Promise<GroupMaster[]>', () => {
      const groupMaster = [
       {seqGroupId:1234, groupId:'sample data', shortName:'sample data', levelCode:'sample data', seqParentId:1234, groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', sicCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', gracePeriod:1234, sortOption:'sample data', nextOpenStartDt:'2018-01-01', nextOpenEndDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paidThroughDate:'2018-01-01', country:'sample data', billingFrequency:'sample data', commonBillingDate:'2018-01-01', paymentDueDaysAfter:1234, rateFreezeCalc:'sample data', invoicePrintFormat:'sample data', useEftFlg:'sample data', adultDepAgeParam:1234, maxDependentsCharge:1234, calcDueDateRule:'sample data', calcDueDateDays:1234, ptdUseReasonCde:'sample data', ptdThresholdPct:1234, nationalEmployerId:'sample data', taxId:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data', userDefined21:'sample data', userDefined22:'sample data', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDate21:'2018-01-01', userDate22:'2018-01-01', comments:'sample data'},
       {seqGroupId:1234, groupId:'sample data', shortName:'sample data', levelCode:'sample data', seqParentId:1234, groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', sicCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', gracePeriod:1234, sortOption:'sample data', nextOpenStartDt:'2018-01-01', nextOpenEndDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paidThroughDate:'2018-01-01', country:'sample data', billingFrequency:'sample data', commonBillingDate:'2018-01-01', paymentDueDaysAfter:1234, rateFreezeCalc:'sample data', invoicePrintFormat:'sample data', useEftFlg:'sample data', adultDepAgeParam:1234, maxDependentsCharge:1234, calcDueDateRule:'sample data', calcDueDateDays:1234, ptdUseReasonCde:'sample data', ptdThresholdPct:1234, nationalEmployerId:'sample data', taxId:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data', userDefined21:'sample data', userDefined22:'sample data', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDate21:'2018-01-01', userDate22:'2018-01-01', comments:'sample data'},
       {seqGroupId:1234, groupId:'sample data', shortName:'sample data', levelCode:'sample data', seqParentId:1234, groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', sicCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', gracePeriod:1234, sortOption:'sample data', nextOpenStartDt:'2018-01-01', nextOpenEndDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paidThroughDate:'2018-01-01', country:'sample data', billingFrequency:'sample data', commonBillingDate:'2018-01-01', paymentDueDaysAfter:1234, rateFreezeCalc:'sample data', invoicePrintFormat:'sample data', useEftFlg:'sample data', adultDepAgeParam:1234, maxDependentsCharge:1234, calcDueDateRule:'sample data', calcDueDateDays:1234, ptdUseReasonCde:'sample data', ptdThresholdPct:1234, nationalEmployerId:'sample data', taxId:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data', userDefined21:'sample data', userDefined22:'sample data', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDate21:'2018-01-01', userDate22:'2018-01-01', comments:'sample data'}

      ];
      service.getGroupMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/groupmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(groupMaster);
    });
  });


  describe('#createGroupMaster', () => {
    var id = 1;
    it('should return an Promise<GroupMaster>', () => {
      const groupMaster: GroupMaster = {seqGroupId:1234, groupId:'sample data', shortName:'sample data', levelCode:'sample data', seqParentId:1234, groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', sicCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', gracePeriod:1234, sortOption:'sample data', nextOpenStartDt:'2018-01-01', nextOpenEndDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paidThroughDate:'2018-01-01', country:'sample data', billingFrequency:'sample data', commonBillingDate:'2018-01-01', paymentDueDaysAfter:1234, rateFreezeCalc:'sample data', invoicePrintFormat:'sample data', useEftFlg:'sample data', adultDepAgeParam:1234, maxDependentsCharge:1234, calcDueDateRule:'sample data', calcDueDateDays:1234, ptdUseReasonCde:'sample data', ptdThresholdPct:1234, nationalEmployerId:'sample data', taxId:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data', userDefined21:'sample data', userDefined22:'sample data', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDate21:'2018-01-01', userDate22:'2018-01-01', comments:'sample data'};
      service.createGroupMaster(groupMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGroupMaster', () => {
    var id = 1;
    it('should return an Promise<GroupMaster>', () => {
      const groupMaster: GroupMaster = {seqGroupId:1234, groupId:'sample data', shortName:'sample data', levelCode:'sample data', seqParentId:1234, groupName1:'sample data', groupName2:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', groupType:'sample data', sicCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', prorationMethod:'sample data', billingLevel:'sample data', billingCycle:'sample data', billingBatch:'sample data', noOfRetroMonths:1234, billedThroughDate:'2018-01-01', gracePeriod:1234, sortOption:'sample data', nextOpenStartDt:'2018-01-01', nextOpenEndDate:'2018-01-01', holdReason:'sample data', holdDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', paidThroughDate:'2018-01-01', country:'sample data', billingFrequency:'sample data', commonBillingDate:'2018-01-01', paymentDueDaysAfter:1234, rateFreezeCalc:'sample data', invoicePrintFormat:'sample data', useEftFlg:'sample data', adultDepAgeParam:1234, maxDependentsCharge:1234, calcDueDateRule:'sample data', calcDueDateDays:1234, ptdUseReasonCde:'sample data', ptdThresholdPct:1234, nationalEmployerId:'sample data', taxId:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data', userDefined21:'sample data', userDefined22:'sample data', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDate21:'2018-01-01', userDate22:'2018-01-01', comments:'sample data'};
      service.updateGroupMaster(groupMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGroupMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGroupMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});