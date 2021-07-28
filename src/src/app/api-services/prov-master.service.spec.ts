/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { ProvMasterService } from './prov-master.service';
import { ProvMaster } from '../api-models/prov-master.model'

describe('ProvMasterService', () => {
  let injector: TestBed;
  let service: ProvMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvMasterService]
    });
    injector = getTestBed();
    service = injector.get(ProvMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#getProvMasters', () => {
    it('should return an Promise<ProvMaster[]>', () => {
      const provMaster = [
        { seqProvId: 1234, providerId: 'sample data', shortName: 'sample data', lastName: 'sample data', firstName: 'sample data', middleInitial: 'sample data', providerCategory: 'sample data', seqProvXrefId: 1234, userId1: 'sample data', userId2: 'sample data', userId3: 'sample data', providerType: 'sample data', dateOfBirth: '2018-01-01', nonSpecificProv: 'sample data', ipaId: 'sample data', seqVendId: 1234, language1: 'sample data', language2: 'sample data', language3: 'sample data', userDefined1: 'sample data', userDefined2: 'sample data', userDefined3: 'sample data', userDefined4: 'sample data', userDefined5: 'sample data', userDefinedDate: '2018-01-01', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data', license: 'sample data', salutation: 'sample data', journalFlag: 'sample data', authClass: 'sample data', seqVendAddress: 1234, seqCapVendAddress: 1234, caseMgmtSendTms: '2018-01-01', userDefined6: 'sample data', userDefined7: 'sample data', userDefined8: 'sample data', userDefined9: 'sample data', userDefined10: 'sample data', userDefined11: 'sample data', userDefined12: 'sample data', userDefined13: 'sample data', userDefined14: 'sample data', userDefined15: 'sample data', userDefined16: 'sample data', userDefinedDate2: '2018-01-01', userDefinedDate3: '2018-01-01', nationalProviderId: 'sample data', maxEnrollLmt: 1234, accessProgramEligible: 'sample data' },
        { seqProvId: 1234, providerId: 'sample data', shortName: 'sample data', lastName: 'sample data', firstName: 'sample data', middleInitial: 'sample data', providerCategory: 'sample data', seqProvXrefId: 1234, userId1: 'sample data', userId2: 'sample data', userId3: 'sample data', providerType: 'sample data', dateOfBirth: '2018-01-01', nonSpecificProv: 'sample data', ipaId: 'sample data', seqVendId: 1234, language1: 'sample data', language2: 'sample data', language3: 'sample data', userDefined1: 'sample data', userDefined2: 'sample data', userDefined3: 'sample data', userDefined4: 'sample data', userDefined5: 'sample data', userDefinedDate: '2018-01-01', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data', license: 'sample data', salutation: 'sample data', journalFlag: 'sample data', authClass: 'sample data', seqVendAddress: 1234, seqCapVendAddress: 1234, caseMgmtSendTms: '2018-01-01', userDefined6: 'sample data', userDefined7: 'sample data', userDefined8: 'sample data', userDefined9: 'sample data', userDefined10: 'sample data', userDefined11: 'sample data', userDefined12: 'sample data', userDefined13: 'sample data', userDefined14: 'sample data', userDefined15: 'sample data', userDefined16: 'sample data', userDefinedDate2: '2018-01-01', userDefinedDate3: '2018-01-01', nationalProviderId: 'sample data', maxEnrollLmt: 1234, accessProgramEligible: 'sample data' },
        { seqProvId: 1234, providerId: 'sample data', shortName: 'sample data', lastName: 'sample data', firstName: 'sample data', middleInitial: 'sample data', providerCategory: 'sample data', seqProvXrefId: 1234, userId1: 'sample data', userId2: 'sample data', userId3: 'sample data', providerType: 'sample data', dateOfBirth: '2018-01-01', nonSpecificProv: 'sample data', ipaId: 'sample data', seqVendId: 1234, language1: 'sample data', language2: 'sample data', language3: 'sample data', userDefined1: 'sample data', userDefined2: 'sample data', userDefined3: 'sample data', userDefined4: 'sample data', userDefined5: 'sample data', userDefinedDate: '2018-01-01', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data', license: 'sample data', salutation: 'sample data', journalFlag: 'sample data', authClass: 'sample data', seqVendAddress: 1234, seqCapVendAddress: 1234, caseMgmtSendTms: '2018-01-01', userDefined6: 'sample data', userDefined7: 'sample data', userDefined8: 'sample data', userDefined9: 'sample data', userDefined10: 'sample data', userDefined11: 'sample data', userDefined12: 'sample data', userDefined13: 'sample data', userDefined14: 'sample data', userDefined15: 'sample data', userDefined16: 'sample data', userDefinedDate2: '2018-01-01', userDefinedDate3: '2018-01-01', nationalProviderId: 'sample data', maxEnrollLmt: 1234, accessProgramEligible: 'sample data' }

      ];
      service.getProvMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provMaster);
    });
  });


  describe('#createProvMaster', () => {
    var id = 1;
    it('should return an Promise<ProvMaster>', () => {
      const provMaster: ProvMaster = { seqProvId: 1234, providerId: 'sample data', shortName: 'sample data', lastName: 'sample data', firstName: 'sample data', middleInitial: 'sample data', providerCategory: 'sample data', seqProvXrefId: 1234, userId1: 'sample data', userId2: 'sample data', userId3: 'sample data', providerType: 'sample data', dateOfBirth: new Date(), nonSpecificProv: 'sample data', ipaId: 'sample data', seqVendId: 1234, language1: 'sample data', language2: 'sample data', language3: 'sample data', userDefined1: 'sample data', userDefined2: 'sample data', userDefined3: 'sample data', userDefined4: 'sample data', userDefined5: 'sample data', userDefinedDate: new Date(), securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', license: 'sample data', salutation: 'sample data', journalFlag: 'sample data', authClass: 'sample data', seqVendAddress: 1234, seqCapVendAddress: 1234, caseMgmtSendTms: new Date(), userDefined6: 'sample data', userDefined7: 'sample data', userDefined8: 'sample data', userDefined9: 'sample data', userDefined10: 'sample data', userDefined11: 'sample data', userDefined12: 'sample data', userDefined13: 'sample data', userDefined14: 'sample data', userDefined15: 'sample data', userDefined16: 'sample data', userDefinedDate2: new Date(), userDefinedDate3: new Date(), nationalProviderId: 'sample data', maxEnrollLmt: 1234, accessProgramEligible: 'sample data' };
      service.createProvMaster(provMaster).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvMaster', () => {
    var id = 1;
    it('should return an Promise<ProvMaster>', () => {
      const provMaster: ProvMaster = { seqProvId: 1234, providerId: 'sample data', shortName: 'sample data', lastName: 'sample data', firstName: 'sample data', middleInitial: 'sample data', providerCategory: 'sample data', seqProvXrefId: 1234, userId1: 'sample data', userId2: 'sample data', userId3: 'sample data', providerType: 'sample data', dateOfBirth: new Date(), nonSpecificProv: 'sample data', ipaId: 'sample data', seqVendId: 1234, language1: 'sample data', language2: 'sample data', language3: 'sample data', userDefined1: 'sample data', userDefined2: 'sample data', userDefined3: 'sample data', userDefined4: 'sample data', userDefined5: 'sample data', userDefinedDate: new Date(), securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', license: 'sample data', salutation: 'sample data', journalFlag: 'sample data', authClass: 'sample data', seqVendAddress: 1234, seqCapVendAddress: 1234, caseMgmtSendTms: new Date(), userDefined6: 'sample data', userDefined7: 'sample data', userDefined8: 'sample data', userDefined9: 'sample data', userDefined10: 'sample data', userDefined11: 'sample data', userDefined12: 'sample data', userDefined13: 'sample data', userDefined14: 'sample data', userDefined15: 'sample data', userDefined16: 'sample data', userDefinedDate2: new Date(), userDefinedDate3: new Date(), nationalProviderId: 'sample data', maxEnrollLmt: 1234, accessProgramEligible: 'sample data' };
      service.updateProvMaster(provMaster, id).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvMaster(id).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});