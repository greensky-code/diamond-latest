/* Copyright (c) 2021 . All Rights Reserved. */

export class CiebTemplateFieldXrefModel {
    addrLineNum: number;
    fieldDelimeter: string;
    linePosition: number;
    ciebTemplateFieldXrefPrimaryKey: CiebTemplateFieldXrefPrimaryKey;
}

export class CiebTemplateFieldXrefPrimaryKey {
    seqIsoTemplateId: number;
    seqFieldId: number;
}
