import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { environment } from "../../environments/environment";
import { BenefitAccumWeight } from "../api-models/benefit-accum-weight.model";
import { BenefitAccumWeightService } from "./benefit-accum-weight.service";

describe('BenefitAccumWeightService', () => {
  let injector: TestBed;
  let service: BenefitAccumWeightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefitAccumWeightService]
    });
    injector = getTestBed();
    service = injector.get(BenefitAccumWeightService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#getBenefitAccumWeights', () => {
    it('should return an Promise<BenefitAccumWeight[]>', () => {
      const benefitAccumWeight = [
        { accumulatorId: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data' },
        { accumulatorId: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data' },
        { accumulatorId: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data' }

      ];
      service.getBenefitAccumWeights().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweights/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefitAccumWeight);
    });
  });


  describe('#createBenefitAccumWeight', () => {
    var id = 1;
    it('should return an Promise<BenefitAccumWeight>', () => {
      const benefitAccumWeight: BenefitAccumWeight = { accumulatorId: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data' };
      service.createBenefitAccumWeight(benefitAccumWeight).then(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweights`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefitAccumWeight', () => {
    var id = 1;
    it('should return an Promise<BenefitAccumWeight>', () => {
      const benefitAccumWeight: BenefitAccumWeight = { accumulatorId: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: '2018-01-01', insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: '2018-01-01', updateUser: 'sample data', updateProcess: 'sample data' };
      service.updateBenefitAccumWeight(benefitAccumWeight, id).then(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweights/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefitAccumWeight', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefitAccumWeight(id).then(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitaccumweights/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});