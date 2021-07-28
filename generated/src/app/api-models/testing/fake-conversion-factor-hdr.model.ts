/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ConversionFactorHdr} from "../../api-models"

var conversionFactorHdr1 = new ConversionFactorHdr();
conversionFactorHdr1.seqConvFactor =123;
conversionFactorHdr1.priceSchedule ="sample data1";
conversionFactorHdr1.pricingRegion ="sample data1";
conversionFactorHdr1.effectiveDate =new Date('2010-01-01');
conversionFactorHdr1.description ="sample data1";
conversionFactorHdr1.scaleType ="sample data1";
conversionFactorHdr1.securityCode ="sample data1";
conversionFactorHdr1.insertDatetime =new Date('2010-01-01');
conversionFactorHdr1.insertUser ="sample data1";
conversionFactorHdr1.insertProcess ="sample data1";
conversionFactorHdr1.updateDatetime =new Date('2010-01-01');
conversionFactorHdr1.updateUser ="sample data1";
conversionFactorHdr1.updateProcess ="sample data1";

var conversionFactorHdr2 = new ConversionFactorHdr();
conversionFactorHdr2.seqConvFactor =123;
conversionFactorHdr2.priceSchedule ="sample data2";
conversionFactorHdr2.pricingRegion ="sample data2";
conversionFactorHdr2.effectiveDate =new Date('2010-01-01');
conversionFactorHdr2.description ="sample data2";
conversionFactorHdr2.scaleType ="sample data2";
conversionFactorHdr2.securityCode ="sample data2";
conversionFactorHdr2.insertDatetime =new Date('2010-01-01');
conversionFactorHdr2.insertUser ="sample data2";
conversionFactorHdr2.insertProcess ="sample data2";
conversionFactorHdr2.updateDatetime =new Date('2010-01-01');
conversionFactorHdr2.updateUser ="sample data2";
conversionFactorHdr2.updateProcess ="sample data2";

var conversionFactorHdr3 = new ConversionFactorHdr();
conversionFactorHdr3.seqConvFactor =123;
conversionFactorHdr3.priceSchedule ="sample data3";
conversionFactorHdr3.pricingRegion ="sample data3";
conversionFactorHdr3.effectiveDate =new Date('2010-01-01');
conversionFactorHdr3.description ="sample data3";
conversionFactorHdr3.scaleType ="sample data3";
conversionFactorHdr3.securityCode ="sample data3";
conversionFactorHdr3.insertDatetime =new Date('2010-01-01');
conversionFactorHdr3.insertUser ="sample data3";
conversionFactorHdr3.insertProcess ="sample data3";
conversionFactorHdr3.updateDatetime =new Date('2010-01-01');
conversionFactorHdr3.updateUser ="sample data3";
conversionFactorHdr3.updateProcess ="sample data3";


export const ConversionFactorHdrs: ConversionFactorHdr[] = [
    conversionFactorHdr1,
    conversionFactorHdr2,
    conversionFactorHdr3,
];