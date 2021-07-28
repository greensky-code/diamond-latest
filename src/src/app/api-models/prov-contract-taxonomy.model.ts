/* Copyright (c) 2020 . All Rights Reserved. */

export class ProvContractTaxonomy {
  primary: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  action: string;
  provContractTaxonomyPrimaryKey: {
        seqProvContract: number,
        seqProvId: number,
        taxonomyCode: string
      }
}
