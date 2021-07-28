/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceRuleMaster} from "../../api-models"

var priceRuleMaster1 = new PriceRuleMaster();
priceRuleMaster1.priceRule ="sample data1";
priceRuleMaster1.description ="sample data1";
priceRuleMaster1.securityCode ="sample data1";
priceRuleMaster1.insertDatetime =new Date('2010-01-01');
priceRuleMaster1.insertUser ="sample data1";
priceRuleMaster1.insertProcess ="sample data1";
priceRuleMaster1.updateDatetime =new Date('2010-01-01');
priceRuleMaster1.updateUser ="sample data1";
priceRuleMaster1.updateProcess ="sample data1";
priceRuleMaster1.drgGrouperType ="sample data1";
priceRuleMaster1.drgPricerType ="sample data1";
priceRuleMaster1.customTableLogic ="sample data1";
priceRuleMaster1.currAnesMinUnit =123;
priceRuleMaster1.currConvEffDate =new Date('2010-01-01');
priceRuleMaster1.priorAnesMinUnit =123;
priceRuleMaster1.assignDrg ="sample data1";
priceRuleMaster1.useExtDrgPricer ="sample data1";
priceRuleMaster1.fromMin1 =123;
priceRuleMaster1.thruMin1 =123;
priceRuleMaster1.currAnesMinUnit2 =123;
priceRuleMaster1.priorAnesMinUnit2 =123;
priceRuleMaster1.fromMin2 =123;
priceRuleMaster1.thruMin2 =123;
priceRuleMaster1.currAnesMinUnit3 =123;
priceRuleMaster1.priorAnesMinUnit3 =123;
priceRuleMaster1.fromMin3 =123;
priceRuleMaster1.thruMin3 =123;
priceRuleMaster1.currAnesMinUnit4 =123;
priceRuleMaster1.priorAnesMinUnit4 =123;
priceRuleMaster1.fromMin4 =123;
priceRuleMaster1.thruMin4 =123;
priceRuleMaster1.minimumMinForUnit =123;
priceRuleMaster1.procedurePriceOption ="sample data1";
priceRuleMaster1.modifierCode ="sample data1";

var priceRuleMaster2 = new PriceRuleMaster();
priceRuleMaster2.priceRule ="sample data2";
priceRuleMaster2.description ="sample data2";
priceRuleMaster2.securityCode ="sample data2";
priceRuleMaster2.insertDatetime =new Date('2010-01-01');
priceRuleMaster2.insertUser ="sample data2";
priceRuleMaster2.insertProcess ="sample data2";
priceRuleMaster2.updateDatetime =new Date('2010-01-01');
priceRuleMaster2.updateUser ="sample data2";
priceRuleMaster2.updateProcess ="sample data2";
priceRuleMaster2.drgGrouperType ="sample data2";
priceRuleMaster2.drgPricerType ="sample data2";
priceRuleMaster2.customTableLogic ="sample data2";
priceRuleMaster2.currAnesMinUnit =123;
priceRuleMaster2.currConvEffDate =new Date('2010-01-01');
priceRuleMaster2.priorAnesMinUnit =123;
priceRuleMaster2.assignDrg ="sample data2";
priceRuleMaster2.useExtDrgPricer ="sample data2";
priceRuleMaster2.fromMin1 =123;
priceRuleMaster2.thruMin1 =123;
priceRuleMaster2.currAnesMinUnit2 =123;
priceRuleMaster2.priorAnesMinUnit2 =123;
priceRuleMaster2.fromMin2 =123;
priceRuleMaster2.thruMin2 =123;
priceRuleMaster2.currAnesMinUnit3 =123;
priceRuleMaster2.priorAnesMinUnit3 =123;
priceRuleMaster2.fromMin3 =123;
priceRuleMaster2.thruMin3 =123;
priceRuleMaster2.currAnesMinUnit4 =123;
priceRuleMaster2.priorAnesMinUnit4 =123;
priceRuleMaster2.fromMin4 =123;
priceRuleMaster2.thruMin4 =123;
priceRuleMaster2.minimumMinForUnit =123;
priceRuleMaster2.procedurePriceOption ="sample data2";
priceRuleMaster2.modifierCode ="sample data2";

var priceRuleMaster3 = new PriceRuleMaster();
priceRuleMaster3.priceRule ="sample data3";
priceRuleMaster3.description ="sample data3";
priceRuleMaster3.securityCode ="sample data3";
priceRuleMaster3.insertDatetime =new Date('2010-01-01');
priceRuleMaster3.insertUser ="sample data3";
priceRuleMaster3.insertProcess ="sample data3";
priceRuleMaster3.updateDatetime =new Date('2010-01-01');
priceRuleMaster3.updateUser ="sample data3";
priceRuleMaster3.updateProcess ="sample data3";
priceRuleMaster3.drgGrouperType ="sample data3";
priceRuleMaster3.drgPricerType ="sample data3";
priceRuleMaster3.customTableLogic ="sample data3";
priceRuleMaster3.currAnesMinUnit =123;
priceRuleMaster3.currConvEffDate =new Date('2010-01-01');
priceRuleMaster3.priorAnesMinUnit =123;
priceRuleMaster3.assignDrg ="sample data3";
priceRuleMaster3.useExtDrgPricer ="sample data3";
priceRuleMaster3.fromMin1 =123;
priceRuleMaster3.thruMin1 =123;
priceRuleMaster3.currAnesMinUnit2 =123;
priceRuleMaster3.priorAnesMinUnit2 =123;
priceRuleMaster3.fromMin2 =123;
priceRuleMaster3.thruMin2 =123;
priceRuleMaster3.currAnesMinUnit3 =123;
priceRuleMaster3.priorAnesMinUnit3 =123;
priceRuleMaster3.fromMin3 =123;
priceRuleMaster3.thruMin3 =123;
priceRuleMaster3.currAnesMinUnit4 =123;
priceRuleMaster3.priorAnesMinUnit4 =123;
priceRuleMaster3.fromMin4 =123;
priceRuleMaster3.thruMin4 =123;
priceRuleMaster3.minimumMinForUnit =123;
priceRuleMaster3.procedurePriceOption ="sample data3";
priceRuleMaster3.modifierCode ="sample data3";


export const PriceRuleMasters: PriceRuleMaster[] = [
    priceRuleMaster1,
    priceRuleMaster2,
    priceRuleMaster3,
];