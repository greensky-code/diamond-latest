import {FormField} from './models';

export enum ContactPersonFieldNames {
    'CONTACT_NAME' = 'contactName',
    'TITLE' = 'contactTitle',
    'PHONE_NUMBER' = 'phoneNumber',
    'PHONE_EXT' = 'phoneExt',
    'AL_DIST_METH' = 'distMeth',
    'EMAIL_ID' = 'emailId',
    'FAX_NUMBER' = 'faxNumber'

}

export const ContactPersonFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Contact Name',
        name: ContactPersonFieldNames.CONTACT_NAME,
        value: '',
        required: true,
        maxLength: 40,
        class: 'pl-1',
        emitOnChange: true
    },
    {
        type: 'select',
        label: 'Title',
        name: ContactPersonFieldNames.TITLE,
        placeholder: '',
        maxLength: 5,
        size: '-md-1',
        emitOnChange: true,
        options: []
    },
    {
        type: 'text',
        label: 'Phone Number',
        name: ContactPersonFieldNames.PHONE_NUMBER,
        placeholder: '',
        maxLength: 20,
        emitOnChange: true
    },
    {
        type: 'text',
        label: 'Phone Ext',
        name: ContactPersonFieldNames.PHONE_EXT,
        placeholder: '',
        maxLength: 6,
        emitOnChange: true
    },
    {
        type: 'select',
        label: 'Al Dist Meth',
        name: ContactPersonFieldNames.AL_DIST_METH,
        options: [{key: 'E Email', value: 'E'}, {key: 'F Fax', value: 'F'}, {key: 'P Print', value: 'P'}],
        placeholder: '',
        required: true,
        maxLength: 1,
        size: '-md-1',
        class: 'p-0',
        emitOnChange: true,
        defaultValue: 'P'
    },
    {
        type: 'email',
        label: 'Email ID',
        name: ContactPersonFieldNames.EMAIL_ID,
        maxLength: 60,
        emitOnChange: true
    },
    {
        type: 'text',
        label: 'Fax Number',
        name: ContactPersonFieldNames.FAX_NUMBER,
        maxLength: 20,
        size: '-md',
        class: 'pr-1',
        emitOnChange: true
    }
];


// Alias Respinsible Party
export enum MemberContactFieldNames {
    'CONTACT_SOURCE' = 'contactSource',
    'DISTR_METHOD' = 'distrMethod',
    'EMAIL_ID' = 'emailID',
    'FAX_NUMBER' = 'faxNumber'
}

export const MemberContactFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Contact Source',
        name: MemberContactFieldNames.CONTACT_SOURCE,
        options: [{key: 'A Alias', value: 'A'}, {key: 'P Privacy', value: 'P'}, {
            key: 'R Responsible Party',
            value: 'R'
        }],
        placeholder: '',
        required: true,
        maxLength: 1,
        size: '-md-3',
        class: 'pl-1'
    },
    {
        type: 'select',
        label: 'Distr Method',
        name: MemberContactFieldNames.DISTR_METHOD,
        options: [{key: 'E Email', value: 'E'}, {key: 'F Fax', value: 'F'}, {key: 'P Print', value: 'P'}],
        placeholder: '',
        required: true,
        maxLength: 1,
        size: '-md-3',
        class: 'p-0'
    },
    {
        type: 'email',
        label: 'Email ID',
        name: ContactPersonFieldNames.EMAIL_ID,
        size: '-md-3',

    },
    {
        type: 'text',
        label: 'Fax Number',
        name: ContactPersonFieldNames.FAX_NUMBER,
        maxLength: 6,
        class: 'pr-1',
        minLength: 6,
        size: '-md',

    }
];

// Benefit Accumulator Base Values

// Alias Respinsible Party
export enum BenefitAccVBFieldNames {
    'RULE_ID' = 'ruleId',
    'DETAIL_DATE' = 'detailDate',
    'BASE_AMT' = 'baseAmt',
    'BASE_QTY' = 'baseQty',
    'COMPARE_DATES' = 'compareDates',
    'USER_DEF_1' = 'userdef1'

}

export const BenefitAccVBFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Rule Id',
        name: BenefitAccVBFieldNames.RULE_ID,
        placeholder: '',
        required: true,
        size: '-md-2',
        emitOnChange: true,
    },
    {
        type: 'date',
        label: 'Detail Date',
        name: BenefitAccVBFieldNames.DETAIL_DATE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
    },
    {
        type: 'text',
        label: 'Base Amt',
        emitOnChange: true,
        name: BenefitAccVBFieldNames.BASE_AMT,
        size: '-md-2',
        class: 'text-right'
    },
    {
        type: 'number',
        label: 'Base Qty',
        emitOnChange: true,
        name: BenefitAccVBFieldNames.BASE_QTY,
        size: '-md-2',
    },
    {
        type: 'select',
        label: 'Compare Dates',
        disabled: false,
        emitOnChange: true,
        name: BenefitAccVBFieldNames.COMPARE_DATES,
        size: '-md-2',
    },
    {
        type: 'select',
        label: 'See Rsn:kkk',
        emitOnChange: true,
        name: BenefitAccVBFieldNames.USER_DEF_1,
        size: '-md',
    },
];


// Group Panel
export enum GroupPanelFieldNames {
    'PANEL_ID' = 'panelId',
    'PLAN_CODE' = 'planCode',
    'EFF_DATE' = 'effDate',
    'TERM_DATE' = 'termDate'
}

export const GroupPanelFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Panel Id',
        name: GroupPanelFieldNames.PANEL_ID,
        placeholder: '',
        required: true,
        size: '-md-3',
        class: 'pl-1'
    },
    {
        type: 'select',
        label: 'Plan Code',
        name: GroupPanelFieldNames.PLAN_CODE,
        placeholder: '',
        required: true,
        size: '-md-3',
        class: 'p-0'
    },
    {
        type: 'date',
        label: 'Eff Date',
        name: GroupPanelFieldNames.EFF_DATE,
        size: '-md-3',
    },
    {
        type: 'date',
        label: 'Term Date',
        name: GroupPanelFieldNames.TERM_DATE,
        class: 'pr-1',
        size: '-md-2',
    }
];

// COB Panel
export enum COBOrderOfLiabilityFieldNames {
    'OPERATOR' = 'operator',
    'SEC_DETERMINANT_TABLE' = 'secDeterminantTable',
    'SEC_DETERMINANT_COL' = 'secDeterminantColumn',
    'FROM_VALUE' = 'fromValue',
    'THRU_VALUE' = 'thruValue'
}

export const COBOrderLiabilityFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Operator',
        name: COBOrderOfLiabilityFieldNames.OPERATOR,
        options: [{key: 'Equal', value: 'EQ'},
            {key: 'Greater Than', value: '>'},
            {key: 'Greater Than Equal', value: '>='},
            {key: 'Less Than', value: '<'},
            {key: 'Less Than Equal', value: '<='},
            {key: 'Not', value: 'NOT'}
            ],
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'Sec Determinant Table',
        name: COBOrderOfLiabilityFieldNames.SEC_DETERMINANT_TABLE,
        placeholder: '',
        required: false,
        size: '-md-3',
        class: 'p-0',
        isTableLookup: true,
        tableNameField: "secDeterminantTable",
        columnNameField: "secDeterminantColumn",
        disabled: true
    },
    {
        type: 'text',
        label: 'Sec Determinant Column',
        name: COBOrderOfLiabilityFieldNames.SEC_DETERMINANT_COL,
        required: false,
        size: '-md-2',
        isTableLookup: true,
        tableNameField: "secDeterminantTable",
        columnNameField: "secDeterminantColumn",
        disabled: true
    },
    {
        type: 'text',
        label: 'From Value',
        name: COBOrderOfLiabilityFieldNames.FROM_VALUE,
        class: 'p-0',
        size: '-md-2',
        disabled: false
    },
    {
        type: 'text',
        label: 'Thru Value',
        name: COBOrderOfLiabilityFieldNames.THRU_VALUE,
        class: 'p-0',
        size: '',
        disabled: true
    }
];

// COB Panel
export enum ClaimHoldReleaseDetermFieldNames {
    'OPERATOR' = 'operator',
    'FROM_VALUE' = 'fromValue',
    'THRU_VALUE' = 'thruValue'
}

export const ClaimHoldReleaseDetermConfig: FormField[] = [
    {
        type: 'select',
        label: 'Operator',
        name: ClaimHoldReleaseDetermFieldNames.OPERATOR,
        options: [{key: 'Equal', value: 'EQ'},
            {key: 'Greater Than', value: '>'},
            {key: 'Greater Than Equal', value: '>='},
            {key: 'Less Than', value: '<'},
            {key: 'Less Than Equal', value: '<='},
            {key: 'Not', value: 'NOT'}
        ],
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'From Value',
        name: ClaimHoldReleaseDetermFieldNames.FROM_VALUE,
        class: 'p-0',
        size: '-md-2',
        required: true,
        disabled: false
    },
    {
        type: 'text',
        label: 'Thru Value',
        name: ClaimHoldReleaseDetermFieldNames.THRU_VALUE,
        class: 'p-0',
        size: '',
        disabled: false
    }
];

export enum DefineBenefitValueFiltersFieldNames {
    'FILTER_TYPE' = 'type',
    'OPERATOR' = 'operator',
    'FROM_VALUE' = 'fromValue',
    'THRU_VALUE' = 'thruValue'
}

export const DefineBenefitValueFiltersFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Filter Type',
        name: DefineBenefitValueFiltersFieldNames.FILTER_TYPE,
        options: [],
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1'
    },
    {
        type: 'select',
        label: 'Operator',
        name: DefineBenefitValueFiltersFieldNames.OPERATOR,
        options: [],
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'From Value',
        name: DefineBenefitValueFiltersFieldNames.FROM_VALUE,
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'Thru Value',
        name: DefineBenefitValueFiltersFieldNames.THRU_VALUE,
        size: '-md-2',
        class: 'pl-1'
    }
];


export enum UserFiltersFieldNames {
    'CLAIM_TYPE' = 'claimType',
    'HOLD_RELEASE' = 'holdRelease',
    'CLAIM_LIMIT' = 'claimlimit',
    'DETERMINANT' = 'determinant',
    'REASON_CODE' = 'reasonCode'
}

export const UserFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Claim Type',
        name: UserFiltersFieldNames.CLAIM_TYPE,
        options: [],
        placeholder: '',
        required: true,
        size: '-md-3',
        class: 'pl-1',
        emitOnChange:true
    },
    {
        type: 'select',
        label: 'Hold/Release',
        name: UserFiltersFieldNames.HOLD_RELEASE,
        options: [],
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1',
        emitOnChange:true
    },
    {
        type: 'text',
        label: 'Claim Limit',
        name: UserFiltersFieldNames.CLAIM_LIMIT,
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1'
    },
    {
        type: 'select',
        label: 'Determinant',
        name: UserFiltersFieldNames.DETERMINANT,
        options: [],
        required: true,
        size: '-md-2',
        class: 'pl-1',
        emitOnChange:true
    },
    {
        type: 'select',
        label: 'Reason Code',
        name: UserFiltersFieldNames.REASON_CODE,
        options: [],
        required: true,
        size: '-md-2',
        class: 'pl-1',
        emitOnChange:true
    }
];


export const DEFAULT_LANGUAGE = '0';
export const SYSTEM_CODE_APL_PAT_LIB = 'APPLYCPLIA';
export const SYSTEM_CODE_ADV_PAY_TYPE = 'ADVANCEPAYTYPE';
export const SYSTEM_CODE_COPAY_LIB = 'PARFLAG';
export const SYSTEM_CODE_PARSTATUS = 'PARSTATUS';
export const SYSTEM_CODE_QUALITY_PRGM = 'QUALPRGM';
export const SYSTEM_CODE_ACCT_INF_TYPE = 'ACCTINFTYPE';
export const SYSTEM_CODE_CLAIM_TYPE = 'CLAIMTYPE';
export const SYSTEM_CODE_TRANS_TYPE = 'TRANSTYPE';

export const SYSTEM_CODE_DNCLMSURFACE = 'DNCLMSURFACE';
export const SYSTEM_CODE_AUTH_CERT_TYPE = 'AUTH_CERT_TYPE';
export const SYSTEM_CODE_DNCLMARCH = 'DNCLMARCH';
export const SYSTEM_CODE_DNCLMTOOTH = 'DNCLMTOOTH';
export const SYSTEM_CODE_DNCLMQUADRANT = 'DNCLMQUADRANT';
export const SYSTEM_CODE_DNCLMORALCAV = 'DNCLMORALCAV';
export const SYSTEM_CODE_DNCLMTOOTHSTAT = 'DNCLMTOOTHSTAT';
export const SYSTEM_CODE_PCPAARULETYPE = 'PCPAARULETYPE';
export const SYSTEM_CODE_PCPRLATTRBDESCR = 'PCPRLATTRBDESCR';
export const SYSTEM_CODE_TM = 'TM';
export const SYSTEM_CODE_MELIGLOC = 'MELIGLOC';


// ---------------- Benefit Rule Selection

export enum BenefitRuleSelectionFields {
    'OPERATOR' = 'operator',
    'FROM_VALUE' = 'fromValue',
    'THRU_VALUE' = 'thruValue',
    'STATE' = 'state',

}

export const BenefitRuleSelectionFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Operator',
        name: BenefitRuleSelectionFields.OPERATOR,
        options: [{key: 'Include', value: 'I'}, {key: 'Exclude', value: 'E'}],
        value: '',
        required: true,
        class: 'pl-1',
        size: '-md-2'

    },
    {
        type: 'text',
        label: 'From Value',
        name: BenefitRuleSelectionFields.FROM_VALUE,
        placeholder: '',
        maxLength: 5,
        required: true,
        emitOnChange: true,
        size: '-md-3'
    },
    {
        type: 'text',
        label: 'Thru Value',
        name: BenefitRuleSelectionFields.THRU_VALUE,
        placeholder: '',
        emitOnChange: true,
        maxLength: 20,
        size: '-md-3'
    },
    {
        type: 'select',
        label: 'State',
        name: BenefitRuleSelectionFields.STATE,
        value: '',
        placeholder: '',
        size: '-md'
    },
];


export enum SecColDetailFormFieldNames {
    'FUNCTIONAL_AREA' = 'functionalArea',
    'TABLE_NAME' = 'tableName',
    'COLUMN_NAME' = 'columnName',
    'SECURITY_IND' = 'securityInd'
}


export const SecColDetailFormConfig: FormField[] = [
  {
    type: "select",
    label: "Functional Area",
    name: SecColDetailFormFieldNames.FUNCTIONAL_AREA,
    value: "",
    size: "-md-3",
    class: "pl-1",
    required: true,
  },
  {
    type: "text",
    label: "Table Name",
    name: SecColDetailFormFieldNames.TABLE_NAME,
    placeholder: "",
    size: "-md-3",
    class: "p-0",
    required: true,
    emitOnChange: true,
    isTableLookup: true,
    emitChangeFieldWhenf5: true, //if we want to get some column data of that row in dynamic form See logic in code dynamic code file.
    tableNameField: "tableName",
    columnNameField: "columnName",
  },
  {
    type: "text",
    label: "Column Name",
    name: SecColDetailFormFieldNames.COLUMN_NAME,
    placeholder: "",
    size: "-md-2",
    required: true,
    emitOnChange: true,
    isTableLookup: true,
    emitChangeFieldWhenf5: true, //if we want to get some column data of that row in dynamic form See logic in code dynamic code file.
    tableNameField: "tableName",
    columnNameField: "columnName",
  },
  {
    type: "select",
    label: "Security",
    name: SecColDetailFormFieldNames.SECURITY_IND,
    placeholder: "",
    size: "-md-3",
    class: "pr-1",
    required: true,
  },
];

// ---------------- Vendor Address Contact

export enum VendorAddressContactFields {
    'CONTACT_NAME' = 'contactName',
    'TITLE' = 'contactTitle',
    'PHONE_NUMBER' = 'phoneNumber',
    'EXT_NO' = 'extension',
    'AL_DIST_METH' = 'primaryDistributionMethod',
    'EMAIL_ID' = 'emailId',
    'FAX_NUMBER' = 'faxNumber'
}

export const VendorAddressContactFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Contact Name',
        name: VendorAddressContactFields.CONTACT_NAME,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 40
    },
    {
        type: 'select',
        label: 'Title',
        name: VendorAddressContactFields.TITLE,
        options: [{key: 'Mr.', value: 'Mr'}, {key: 'Mrs.', value: 'Mrs'}],
        placeholder: '',
        size: '-md-1',
        class: 'pl-0'
    },
    {
        type: 'text',
        label: 'Phone Number',
        name: VendorAddressContactFields.PHONE_NUMBER,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 20
    },
    {
        type: 'text',
        label: 'Ext. No.',
        name: VendorAddressContactFields.EXT_NO,
        placeholder: '',
        class: 'pl-1',
        size: '-md-1',
        maxLength: 6
    },
    {
        type: 'select',
        label: 'Al Dist Meth',
        name: VendorAddressContactFields.AL_DIST_METH,
        options: [{key: 'E Email', value: 'E'}, {key: 'F Fax', value: 'F'}, {key: 'P Print', value: 'P'}],
        placeholder: '',
        maxLength: 1,
        size: '-md-1',
        class: 'pl-0'
    },
    {
        type: 'text',
        label: 'Email ID',
        name: VendorAddressContactFields.EMAIL_ID,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 60
    },
    {
        type: 'text',
        label: 'Fax Number',
        name: VendorAddressContactFields.FAX_NUMBER,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 20
    }
];


// ---------------- Provider Address Contact

export enum ProviderAddressContactFields {
    'CONTACT_NAME' = 'contactName',
    'TITLE' = 'contactTitle',
    'PHONE_NUMBER' = 'phoneNumber',
    'EXT_NO' = 'extension',
    'AL_DIST_METH' = 'primaryDistributionMethod',
    'EMAIL_ID' = 'emailId',
    'FAX_NUMBER' = 'faxNumber',
    'PRIM' = 'primaryContact'
}

export const ProviderAddressContactFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Contact Name',
        name: ProviderAddressContactFields.CONTACT_NAME,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 40
    },
    {
        type: 'select',
        label: 'Title',
        name: ProviderAddressContactFields.TITLE,
        options: [{key: 'Mr', value: 'Mr'}, {key: 'Ms', value: 'Ms'}],
        placeholder: '',
        maxLength: 3,
        size: '-md-1',
        class: 'pl-0'
    },
    {
        type: 'text',
        label: 'Phone Number',
        name: ProviderAddressContactFields.PHONE_NUMBER,
        placeholder: '',
        class: 'pl-1',
        size: '-md-1',
        maxLength: 20
    },
    {
        type: 'text',
        label: 'Ext',
        name: ProviderAddressContactFields.EXT_NO,
        placeholder: '',
        class: 'pl-1',
        size: '-md-1',
        maxLength: 6
    },
    {
        type: 'text',
        label: 'Fax Number',
        name: ProviderAddressContactFields.FAX_NUMBER,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 20
    },
    {
        type: 'select',
        label: 'Prim',
        name: ProviderAddressContactFields.PRIM,
        options: [{key: 'Yes', value: 'Y'}, {key: 'No', value: 'N'}],
        placeholder: '',
        maxLength: 1,
        size: '-md-1',
        class: 'pl-0 text-primary'
    },
    {
        type: 'select',
        label: 'Al Dist Meth',
        name: ProviderAddressContactFields.AL_DIST_METH,
        options: [{key: 'E Email', value: 'E'}, {key: 'F Fax', value: 'F'}, {key: 'P Print', value: 'P'}],
        placeholder: '',
        maxLength: 1,
        size: '-md-1',
        class: 'pl-0 text-primary'
    },
    {
        type: 'text',
        label: 'Email ID',
        name: ProviderAddressContactFields.EMAIL_ID,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 60
    }

];

export enum BenefitWeightAccumDetailFields {
    FROM_VALUE = 'fromValue',
    THRU_VALUE = 'thruValue',
    PRIMARY_GROUP = 'primaryGroup',
    SECONDARY_GROUP = 'secondaryGroup',
    WEIGHT_ACCUM = 'weightedAccum',
    EFFECTIVE_DATE = 'effectiveDate',
    THRU_DATE = 'thruDate'
}

export const BenefitWeightAccumDetailConfig: FormField[] = [
    {
        type: 'text',
        label: 'Procedure Code From',
        name: BenefitWeightAccumDetailFields.FROM_VALUE,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 20
    }, {
        type: 'text',
        label: 'Procedure Code Thru',
        name: BenefitWeightAccumDetailFields.THRU_VALUE,
        placeholder: '',
        class: 'pl-1',
        size: '-md-2',
        maxLength: 20
    }, {
        type: 'text',
        label: 'Primary Proc Grouping',
        name: BenefitWeightAccumDetailFields.PRIMARY_GROUP,
        placeholder: '',
        class: 'pl-1',
        size: '-md-1',
        maxLength: 20
    }, {
        type: 'text',
        label: 'Second Proc Grouping',
        name: BenefitWeightAccumDetailFields.SECONDARY_GROUP,
        placeholder: '',
        class: 'pl-1',
        size: '-md-1',
        maxLength: 20
    }, {
        type: 'number',
        label: 'Weighted Accum %',
        emitOnChange: false,
        name: BenefitWeightAccumDetailFields.WEIGHT_ACCUM,
        size: '-md-1',
        maxLength: 10
    }, {
        type: 'date',
        label: 'Effective Date',
        name: BenefitWeightAccumDetailFields.EFFECTIVE_DATE,
        placeholder: '',
        required: false,
        emitOnChange: false,
        size: '-md-2',
        maxLength: 30
    }, {
        type: 'date',
        label: 'Term Date',
        name: BenefitWeightAccumDetailFields.THRU_DATE,
        placeholder: '',
        required: false,
        emitOnChange: false,
        size: '-md-2',
        maxLength: 30
    }
];

export enum ProviderContractDetailsValue {
    'FROM' = 'detValueFrom',
    'THROUGH' = 'detValueTo'
}

export const ProviderContractDetailsValueFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'From',
        name: ProviderContractDetailsValue.FROM,
        value: '',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'Through',
        name: ProviderContractDetailsValue.THROUGH,
        value: '',
        class: 'pl-1'
    }
];

export enum ProviderContractDetailsPricesValueForm {
    'ORDER' = 'SCHED_ORDER',
    'PRICESCHED' = 'PRICE_SCHEDULE',
    'DESCRIPTION' = 'DESCRIPTION',
    'PRICESCHEDPCTALD' = 'SCHED_PCT_ALLOWED'

}


export const ProviderContractDetailsPricesValueFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Order',
        name: ProviderContractDetailsPricesValueForm.ORDER,
        value: '',
        class: 'pl-1',
        min: 1,
        max: 9999,
        required: true
    },
    {
        type: 'text',
        label: 'Price sched',
        name: ProviderContractDetailsPricesValueForm.PRICESCHED,
        value: '',
        class: 'pl-1',
        required: true,
        isLookup: true,
        lookupResponseField: 'PRICE_SCHEDULE'
    },
    {
        type: 'label',
        label: '',
        name: ProviderContractDetailsPricesValueForm.DESCRIPTION,
        value: '',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'Price sched Pct Allowed',
        name: ProviderContractDetailsPricesValueForm.PRICESCHEDPCTALD,
        value: '',
        class: 'pl-1',
        required: true
    }
];

export enum AddressEmailFields {
    'EMAIL_TYPE' = 'emailType',
    'EMAIL_ADDR' = 'emailAddress',
    'EFF_DATE' = 'effDate',
    'TERM_DATE' = 'termDate',
    'SEQ_EMAIL_ADD' = 'seqEmailAdd',
    'SEQ_ENTITY_ID' = 'seqEntityId',
}

export const AddressEmailFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'E-Mail Type',
        name: AddressEmailFields.EMAIL_TYPE,
        class: 'pl-1',
        required: true,
        size: '-md-2'
    },
    {
        type: 'email',
        label: 'E-Mail Address',
        name: AddressEmailFields.EMAIL_ADDR,
        required: true,
        size: '-md-3'
    },
    {
        type: 'date',
        label: 'Effective Date',
        name: AddressEmailFields.EFF_DATE,
        required: true,
        size: '-md-3'
    },
    {
        type: 'date',
        label: 'Term Date',
        name: AddressEmailFields.TERM_DATE,
        required: false,
        size: '-md-3'
    },
    {
        type: 'text',
        name: AddressEmailFields.SEQ_EMAIL_ADD,
        hideField: true,
    },
    {
        type: 'text',
        name: AddressEmailFields.SEQ_ENTITY_ID,
        hideField: true,
    },
];

export enum MedDefDetFields {
    'FROM' = 'from',
    'THRU' = 'thru',
    'CODE_TYPE' = 'codeType',
    'STATE' = 'state',
    'EFF_DATE' = 'effectiveDate',
    'TERM_DATE' = 'termDate',
}

export const MedDefDetFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'From',
        name: MedDefDetFields.FROM,
        class: 'pl-1, text-primary',
        required: true,
        emitOnChange: true,
        size: '-md-1',
    },
    {
        type: 'text',
        label: 'Thru',
        name: MedDefDetFields.THRU,
        size: '-md-1',
        emitOnChange: true,
        required: false
    },
    {
        type: 'dropdown',
        label: 'Code Type',
        name: MedDefDetFields.CODE_TYPE,
        size: '-md-2',
        emitOnChange: true,
        required: false
    },
    {
        type: 'dropdown',
        label: 'State',
        name: MedDefDetFields.STATE,
        required: false,
        emitOnChange: true,
        size: '-md-2'
    },
    {
        type: 'date',
        label: 'Eff Date',
        name: MedDefDetFields.EFF_DATE,
        required: false,
        emitOnChange: true,
        size: '-md-2'
    },
    {
        type: 'date',
        label: 'Term Date',
        name: MedDefDetFields.TERM_DATE,
        required: false,
        emitOnChange: true,
        size: '-md-2'
    },
];


// ------------------------------- Provider Vendor grid

export enum ProvVendorFieldNames {
    'VENDOR' = 'vendor',
    'ADDRESS' = 'address',
    'DIR_INC' = 'dirInc',
    'DEFAULT' = 'default',
}

export const ProvVendorFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Vendor',
        name: ProvVendorFieldNames.VENDOR,
        value: '',
        required: true,
        maxLength: 10,
        emitOnChange: true,
        class: 'pl-2 col-md-3'
    },
    {
        type: 'select',
        label: 'Address',
        name: ProvVendorFieldNames.ADDRESS,
        placeholder: '',
        maxLength: 40,
        required: true,
        size: '-md-1',
        class: 'col-md-3'
    },
    {
        type: 'select',
        label: 'Dir Inc',
        required: true,
        name: ProvVendorFieldNames.DIR_INC,
        placeholder: '',
        maxLength: 1,
        class: 'col-md-3'
    }, {
        type: 'select',
        required: true,
        label: 'Default',
        name: ProvVendorFieldNames.DEFAULT,
        emitOnChange: true,
        placeholder: '',
        maxLength: 20,
    },

];


export enum ClaimHoldRuleSelectionFields {
    'FROM_VALUE' = 'detFromValue',
    'THRU_VALUE' = 'detThruValue'
}

export const ClaimHoldRuleSelectionFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'From Value',
        name: ClaimHoldRuleSelectionFields.FROM_VALUE,
        placeholder: '',
        maxLength: 20,
        required: true,
        size: '-md-5'
    },
    {
        type: 'text',
        label: 'Thru Value',
        name: ClaimHoldRuleSelectionFields.THRU_VALUE,
        placeholder: '',
        maxLength: 20,
        size: '-md-5'
    }
];

// Group Panel
export enum ProcedureDeterminantFieldsNames {
    "OPERATOR" = "operator",
    "FROM_VALUE" = "fromValue",
    "THRU_VALUE" = "thruValue",
}

export const ProcedureDeterminantFormConfig: FormField[] = [
    {
        type: "select",
        label: "Operator",
        name: ProcedureDeterminantFieldsNames.OPERATOR,
        options: [
            {key: "Include", value: "I"},
            {key: "Exclude", value: "E"},
        ],
        value: "",
        required: true,
        class: "pl-1",
        size: "-md-2",
    },
    {
        type: "text",
        label: "From Value",
        name: ProcedureDeterminantFieldsNames.FROM_VALUE,
        placeholder: "",
        maxLength: 10,
        required: true,
        size: "-md-3",
        emitOnChange: true,
    },
    {
        type: "text",
        label: "Thru Value",
        name: ProcedureDeterminantFieldsNames.THRU_VALUE,
        placeholder: "",
        maxLength: 10,
        size: "-md-3",
        emitOnChange: true
    },
];

export enum TimelyFilingSpecialFieldsNames {
    "OPERATOR" = "operator",
    "FROM_VALUE" = "fromValue",
    "THRU_VALUE" = "thruValue",
}

export const TimelyFilingSpecialFormConfig: FormField[] = [
    {
        type: "select",
        label: "Operator",
        name: TimelyFilingSpecialFieldsNames.OPERATOR,
        options: [
            {key: "Include", value: "I"},
            {key: "Exclude", value: "E"},
        ],
        value: "",
        required: true,
        class: "pl-1",
        size: "-md-2",
    },
    {
        type: "text",
        label: "From Value",
        name: ProcedureDeterminantFieldsNames.FROM_VALUE,
        placeholder: "",
        maxLength: 10,
        required: true,
        size: "-md-3",
        emitOnChange: true,
    },
    {
        type: "text",
        label: "Thru Value",
        name: ProcedureDeterminantFieldsNames.THRU_VALUE,
        placeholder: "",
        maxLength: 10,
        size: "-md-3",
        emitOnChange: true
    },
];


//Claim auth Proc Link


// Group Panel
export enum ClaimAuthProcLinkNames {
    "PROCESS_ORDER" = "processOrder",
    "RANGE_ID" = "rangeId",
    "INC_ALL_RNG_ROWS" = "IncAllRingRows",
    "RULE_ID" = "ruleId",
    "PAY_ACTION" = "payAction",
    "ALLOWED_REASON" = "allowedReason",
    "HOLD_DNY_REASON" = "oldDnyReason",
    "EFFECTIVE_DATE" = "effectiveDate",
    "TERM_DATE" = "termDate"
}

export const ClaimAuthProcLinkConfig: FormField[] = [
    {
        type: "text",
        label: "Process Order",
        name: ClaimAuthProcLinkNames.PROCESS_ORDER,
        placeholder: "",
        required: true,
        size: "-md-1",
        class: "pl-1",
        emitOnChange: true
    },
    {
        type: "text",
        label: "Range Id",
        name: ClaimAuthProcLinkNames.RANGE_ID,
        placeholder: "",
        size: "-md-1",
        class: "pl-1",
        isLookup: true,
        emitOnChange: true,
        lookupResponseField: "authProcRangeId",
    },
    {
        type: "checkbox",
        label: "INC ALL RNG ROWS",
        name: ClaimAuthProcLinkNames.INC_ALL_RNG_ROWS,
        size: "-md-1",
        class: "pl-1",
    },
    {
        type: "text",
        label: "Rule ID",
        name: ClaimAuthProcLinkNames.RULE_ID,
        class: "pl-1",
        emitOnChange: true,

        size: "-md-1",
    },
    {
        type: "select",
        label: "Pay Action",
        name: ClaimAuthProcLinkNames.PAY_ACTION,
        class: "pl-1",
        size: "-md-3",
        emitOnChange: true,

        required: true,
    },
    {
        type: "text",
        label: "Allowed Reason",
        name: ClaimAuthProcLinkNames.ALLOWED_REASON,
        class: "pl-1",
        size: "-md-1",
        isLookup: true,
        lookupResponseField: "reasonCode",
    },
    {
        type: "text",
        label: "Hld/Dny Reason",
        name: ClaimAuthProcLinkNames.HOLD_DNY_REASON,
        class: "pl-1",
        emitOnChange: true,

        size: "-md-1",
    },
    {
        type: "date",
        label: "Effective Date",
        name: ClaimAuthProcLinkNames.EFFECTIVE_DATE,
        class: "pl-1",
        size: "-md-1",
        emitOnChange: true,
    },
    {
        type: "date",
        label: "Term Date",
        name: ClaimAuthProcLinkNames.TERM_DATE,
        class: "pl-1",
        emitOnChange: true,

        size: "-md-1",
    },
];


export enum SecFuncsFieldNames {
    'INSDT' = 'insDt',
    'PEXE' = 'pexe',
    'FUNCID' = 'funcId'
}

export const SecFuncsFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Function',
        name: SecFuncsFieldNames.FUNCID,
        placeholder: '',
        maxLength: 20,
        size: '-md-4',
        class: 'p-0',
        required: true
    },
    {
        type: 'checkbox',
        label: 'Access',
        name: SecFuncsFieldNames.PEXE,
        size: '-md-3',
        maxLength: 20,
    },
    {
        type: 'date',
        label: 'Ins Dt',
        name: SecFuncsFieldNames.INSDT,
        size: '-md-4',
        maxLength: 20,
    }
];

// NoteWin grids

export enum NOTE_WIN_Fields {
    'WIN_ID' = 'winId',
    'NOTE_TYPE' = 'noteType'
}

export const NoteWinFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Window',
        name: NOTE_WIN_Fields.WIN_ID,
        placeholder: '',
        maxLength: 20,
        required: true,
        class: 'pl-3',
        size: '-md-5'
    },
    {
        type: 'select',
        class: 'pl-3',
        required: true,
        label: 'Note Type',
        name: NOTE_WIN_Fields.NOTE_TYPE,
        placeholder: '',
        maxLength: 20,
        size: '-md-5'
    }
];

export enum NOTE_WIN_LINK_Fields {
    'LINK_WINDOW' = 'linkWindow',
    'LINK_CONTEXT' = 'linkContext'
}

export const NoteWinLinkFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Link Window',
        name: NOTE_WIN_LINK_Fields.LINK_WINDOW,
        placeholder: '',
        maxLength: 20,
        required: true,
        class: 'pl-3',
        size: '-md-5'
    },
    {
        type: 'select',
        class: 'pl-3',
        required: true,
        label: 'LINK_CONTEXT',
        name: NOTE_WIN_LINK_Fields.LINK_CONTEXT,
        placeholder: '',
        maxLength: 20,
        size: '-md-5'
    }
];

export enum AUTH_WAIVE_DETER_VALUE_FIELDS {
    'DET_VALUE_FROM' = 'detFromValue',
    'DET_VALUE_TO' = 'detThruValue'
}

export const AuthWaiveDeterValueFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Det Value From',
        name: AUTH_WAIVE_DETER_VALUE_FIELDS.DET_VALUE_FROM,
        placeholder: '',
        required: true,
        maxLength: 30,
        class: 'pl-3',
        size: '-md-5',
        emitOnChange: true
    },
    {
        type: 'text',
        label: 'Det Value To',
        name: AUTH_WAIVE_DETER_VALUE_FIELDS.DET_VALUE_TO,
        placeholder: '',
        required: false,
        maxLength: 30,
        class: 'pl-3',
        size: '-md-5',
        emitOnChange: true
    }
];

export enum AUTH_PROCEDURE_RANGE_VALUE_FIELDS {
    'FROM_RANGE' = 'fromRange',
    'THRU_RANGE' = 'thruRange'
}

export const AuthProcedureRangeValueFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'From Range',
        name: AUTH_PROCEDURE_RANGE_VALUE_FIELDS.FROM_RANGE,
        placeholder: '',
        required: true,
        maxLength: 30,
        class: 'pl-3',
        size: '-md-5'
    },
    {
        type: 'text',
        label: 'Thru Range',
        name: AUTH_PROCEDURE_RANGE_VALUE_FIELDS.THRU_RANGE,
        placeholder: '',
        required: false,
        maxLength: 30,
        class: 'pl-3',
        size: '-md-5'
    }
];

// ------------------------------   Line of business


export enum LinbContractSearchesFields {
    'ORDER' = 'order',
    'CONTRACT_SEARCH_TYPE' = 'contractSearchType'
}

export const LinbContractSearchesFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Order',
        name: LinbContractSearchesFields.ORDER,
        placeholder: '',
        class: 'pl-4',
        maxLength: 20,
        required: true,
        disabled: false,
        size: '-md-5'
    },
    {
        type: 'text',
        label: 'Contract Search Type',
        name: LinbContractSearchesFields.CONTRACT_SEARCH_TYPE,
        placeholder: '',
        maxLength: 20,
        required: true,
        disabled: false,
        size: '-md-5'
    }
];

// ---------------- Prov Contract Grids

export enum ProvContractSpecialityFields {
    'SPECIALITY_TYPE' = 'specialityType',
    'SPECIALITY_DESC' = 'specialityDesc',
    'PRIMARY' = 'primary',
    'BOARD_STATUS' = 'boardStatus',
    'DIR_INC' = 'dirInc'
}

export const ProvContractSpecialityFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Speciality Type',
        name: ProvContractSpecialityFields.SPECIALITY_TYPE,
        placeholder: '',
        class: 'pl-1',
        maxLength: 6,
        required: true,
        size: '-md-2'
    },
    {
        type: 'text',
        label: '',
        name: ProvContractSpecialityFields.SPECIALITY_DESC,
        disabled: true,
        size: '-md-3'
    },
    {
        type: 'select',
        label: 'Primary',
        name: ProvContractSpecialityFields.PRIMARY,
        placeholder: '',
        maxLength: 1,
        size: '-md-2'
    },
    {
        type: 'select',
        label: 'Board Status',
        name: ProvContractSpecialityFields.BOARD_STATUS,
        placeholder: '',
        maxLength: 1,
        required: true,
        size: '-md-2'
    },
    {
        type: 'select',
        label: 'Dir Inc',
        name: ProvContractSpecialityFields.DIR_INC,
        placeholder: '',
        maxLength: 1,
        required: true,
        size: '-md-2'
    },
];


export enum ProvContractTaxonomyFields {
    'TAXONOMY_CODE' = 'taxonomyCode',
    'TYPE_DESC' = 'typeOrDesc',
    'PRIMARY' = 'primary',
}

export const ProvContractTaxonomyFormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Taxonomy',
        name: ProvContractTaxonomyFields.TAXONOMY_CODE,
        placeholder: '',
        class: 'pl-2',
        size: '-md-3',
        emitOnChange: true
    },  {
        type: 'text',
        label: 'Type/ Description',
        name: ProvContractTaxonomyFields.TYPE_DESC,
        disabled: true,
        placeholder: '',
        size: '-md-4'
    },
    {
        type: 'select',
        label: 'Primary',
        name: ProvContractTaxonomyFields.PRIMARY,
        placeholder: '',
        maxLength: 1,
        size: '-md-2'
    },
];

export enum ScreenAttributeFields {
    'SCREEN' = 'screen',
    'ATTRIBUTE' = 'attribute',
    'URBAN_TO_MILES' = 'urbanToMiles',
    'RURAL_TO_MILES' = 'ruralToMiles',
    'OPERATOR' = 'operator',
    'VALUE' = 'value'
}

export const ScreenAttributeFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Screen',
        name: ScreenAttributeFields.SCREEN,
        placeholder: '',
        maxLength: 1,
        size: '-md-2',
        options: []
    }, {
        type: 'select',
        label: 'Attribute',
        name: ScreenAttributeFields.ATTRIBUTE,
        placeholder: '',
        maxLength: 1,
        size: '-md-2',
        options: [],
        compareField: 'winId'
    }, {
        type: 'text',
        label: 'Urban To Miles',
        name: ScreenAttributeFields.URBAN_TO_MILES,
        disabled: true,
        placeholder: '',
        class: 'pl-2',
        size: '-md-2',
        emitOnChange: true
    }, {
        type: 'text',
        label: 'Rural To Miles',
        name: ScreenAttributeFields.RURAL_TO_MILES,
        placeholder: '',
        disabled: true,
        class: 'pl-2',
        size: '-md-2',
        emitOnChange: true
    }, {
        type: 'text',
        label: 'Operator',
        name: ScreenAttributeFields.OPERATOR,
        placeholder: '',
        disabled: true,
        class: 'pl-1',
        size: '-md-1',
        emitOnChange: true
    }, {
        type: 'text',
        label: 'Value',
        name: ScreenAttributeFields.VALUE,
        placeholder: '',
        disabled: true,
        class: 'pl-1',
        size: '-md-1',
        emitOnChange: true
    }

];



export enum ExternalCarrierFields {
  "PLAN" = "plan",
  "EFFECTIVE_DATE" = "effectiveDate",
  "END_DATE" = "endDate",
  "CARRIER_GROUP_NO" = "carrierGroupNo",
  "CARRIER_ID" = "carrierId",
  "CARRIER_NAME" = "carrierName",
  "PLAN_CODE" = "planCode",
  "PRODUCT_TYPE" = "productType",
  "SHARED_BENEFITO" = "sharedBenefitO",
  "SHARED_BENEFITD" = "sharedBenefitD",

  "SHARRING_METHOD" = "sharringMethod",
}

export const ExternalCarrierFromConfig: FormField[] = [
  {
    type: "text",
    value: " ",
    hideSingleField: false,
    label: "Plan",
    name: ExternalCarrierFields.PLAN,
    size: "-md-1",
    required: true,
    class: "pl-1",
    disabled: true,
  },
  {
    disabled: true,
    type: "text",
    value: " ",
    hideSingleField: false,

    label: "Eff Date",
    name: ExternalCarrierFields.EFFECTIVE_DATE,
    placeholder: "",
    maxLength: 5,
    size: "-md-1",
    emitOnChange: true,
  },
  {
    disabled: true,
    type: "text",
    value: " ",
    hideSingleField: false,

    label: "End Date",
    name: ExternalCarrierFields.END_DATE,
    placeholder: "",
    size: "-md-1",
    maxLength: 20,
    emitOnChange: true,
  },
  {
    type: "text",
    label: "Ext Carrier Group",
    name: ExternalCarrierFields.CARRIER_GROUP_NO,
    placeholder: "",
    value: " ",
    hideSingleField: false,

    size: "-md-1",
    emitOnChange: true,
  },
  {
    type: "select",
    value: " ",
    hideSingleField: false,

    label: "Product Type",
    name: ExternalCarrierFields.PRODUCT_TYPE,
    placeholder: "",
    size: "-md-2",
  },
  {
    type: "select",
    value: " ",
    label: "Ext Carrier Name",
    name: ExternalCarrierFields.CARRIER_NAME,
    placeholder: "",
    size: "-md-2",
    class: "p-0",
    hideSingleField: false,

    emitOnChange: true,
  },
  {
    type: "checkboxWithText",
    label: "Sharing benefit",
    name: ExternalCarrierFields.SHARED_BENEFITO,
    emitOnChange: true,
    size: "-md-1",
    hideSingleField: true,
    text: "OOP",
    value: " ",
  },
  {
    type: "checkboxWithText",
    label: "",
    name: ExternalCarrierFields.SHARED_BENEFITD,
    emitOnChange: true,
    text: "DEDUCTIBLE",
    hideSingleField: true,
    size: "-md-1",
    value: " ",
  },
  {
    type: "select",
    hideSingleField: false,

    label: "Sharing Method",
    name: ExternalCarrierFields.SHARRING_METHOD,
    maxLength: 20,
    size: "-md",
    value: " ",

    options: [
      {
        key: "Select",
        value: " ",
      },
      {
        key: "REAL TIME",
        value: "REAL TIME",
      },
      {
        key: "BATCH",
        value: "BATCH",
      },
    ],
    class: "pr-1",
    emitOnChange: true,
  },
];

export enum MatrixDeterminantXFields {
    "matrixSeq" = "matrixSeq",
    "xaxisDescription" = "xaxisDescription",
    "ageFrom" = "ageFrom",
    "ageThru" = "ageThru",
    "gender" = "gender",
    "salaryFrom"= "salaryFrom",
    "salaryThru"= "salaryThru",
    "medicareStatus" = "medicareStatus",
    "rateType" = "rateType"
}

export const MatrixDeterminantXFromConfig: FormField[] = [
    {
        type: "text",
        label: "X Matrix",
        name: MatrixDeterminantXFields.matrixSeq,
        hideSingleField: false,
        emitOnChange: true,
        disabled: true,
        text: "X Matrix",
        size: "-md-1",
        required: true
    },
    {
        type: "text",
        label: "Description",
        name: MatrixDeterminantXFields.xaxisDescription,
        hideSingleField: false,
        emitOnChange: true,
        text: "Description",
        size: "-md-1",
        required: true
    },
    {
        type: "text",
        label: "Age From",
        name: MatrixDeterminantXFields.ageFrom,
        hideSingleField: false,
        emitOnChange: true,
        text: "Age From",
        size: "-md-1",
        defaultValue: ".0"
    },
    {
        type: "text",
        label: "Age Thru",
        name: MatrixDeterminantXFields.ageThru,
        hideSingleField: false,
        emitOnChange: true,
        text: "Age Thru",
        size: "-md-1",
        defaultValue: ".0"
    },
    {
        type: "select",
        label: "Gender",
        name: MatrixDeterminantXFields.gender,
        hideSingleField: false,
        options: [
            {key: "Blank", value: null},
            {key: "Female", value: "F"},
            {key: "Male", value: "M"}
        ],
        emitOnChange: true,
        text: "Gender",
        size: "-md-1"
    },
    {
        type: "text",
        label: "Salary From",
        name: MatrixDeterminantXFields.salaryFrom,
        hideSingleField: false,
        emitOnChange: true,
        text: "Salary From",
        size: "-md-1"
    },
    {
        type: "text",
        label: "Salary Thru",
        name: MatrixDeterminantXFields.salaryThru,
        hideSingleField: false,
        emitOnChange: true,
        text: "Salary Thru",
        size: "-md-1"
    },
    {
        type: "text",
        label: "Medicate Status",
        name: MatrixDeterminantXFields.medicareStatus,
        hideSingleField: false,
        emitOnChange: true,
        text: "Medicate Status",
        size: "-md-1"
    },
    {
        type: "text",
        label: "Rate Type",
        name: MatrixDeterminantXFields.rateType,
        hideSingleField: false,
        emitOnChange: true,
        text: "Rate Type",
        size: "-md-1"
    }
];

export enum MatrixDeterminantYFields {
    "matrixSeq" = "matrixSeq",
    "yaxisDescription" = "yaxisDescription",
    "familySizeFrom" = "familySizeFrom",
    "familySizeThru" = "familySizeThru",
    "ageFrom" = "ageFrom",
    "ageThru"= "ageThru",
    "gender"= "gender",
    "spouseFlag" = "spouseFlag"
}

export const MatrixDeterminantYFromConfig: FormField[] = [
    {
        type: "text",
        label: "Y Matrix",
        name: MatrixDeterminantYFields.matrixSeq,
        hideSingleField: false,
        emitOnChange: true,
        disabled: true,
        text: "Y Matrix",
        size: "-md-1",
        required: true
    },
    {
        type: "text",
        label: "Description",
        name: MatrixDeterminantYFields.yaxisDescription,
        hideSingleField: false,
        emitOnChange: true,
        text: "Description",
        size: "-md-1",
        required: true
    },
    {
        type: "text",
        label: "Family Size From",
        name: MatrixDeterminantYFields.familySizeFrom,
        hideSingleField: false,
        emitOnChange: true,
        text: "Family Size From",
        size: "-md-1",
        defaultValue: "0"
    },
    {
        type: "text",
        label: "Family Size Thru",
        name: MatrixDeterminantYFields.familySizeThru,
        hideSingleField: false,
        emitOnChange: true,
        text: "Family Size Thru",
        size: "-md-1",
        defaultValue: "0"
    },
    {
        type: "text",
        label: "Age From",
        name: MatrixDeterminantYFields.ageFrom,
        hideSingleField: false,
        emitOnChange: true,
        text: "Age From",
        size: "-md-1",
        defaultValue: ".0"
    },
    {
        type: "text",
        label: "Age Thru",
        name: MatrixDeterminantYFields.ageThru,
        hideSingleField: false,
        emitOnChange: true,
        text: "Age Thru",
        size: "-md-1",
        defaultValue: ".0"
    },
    {
        type: "select",
        label: "Gender",
        name: MatrixDeterminantYFields.gender,
        hideSingleField: false,
        options: [
            {key: "Blank", value: null},
            {key: "Female", value: "F"},
            {key: "Male", value: "M"}
        ],
        emitOnChange: true,
        text: "Gender",
        size: "-md-1"
    },
    {
        label: "Spouse Flag",
        name: MatrixDeterminantYFields.spouseFlag,
        hideSingleField: false,
        emitOnChange: true,
        text: "Spouse Flag",
        type: "checkbox",
        size: "-md-1",
        class: "pl-1",
    }
];

export enum ClaimDiscountCalcRulesFieldNames {
    'OPERATOR' = 'operator',
    'SEC_DETERMINANT_TABLE' = 'secDeterminantTable',
    'SEC_DETERMINANT_COL' = 'secDeterminantColumn',
    'FROM_VALUE' = 'fromValue',
    'THRU_VALUE' = 'thruValue'
}

export const ClaimDiscountCalcRulesFormConfig: FormField[] = [
    {
        type: 'select',
        label: 'Operator',
        name: ClaimDiscountCalcRulesFieldNames.OPERATOR,
        options: [{key: 'Equal', value: 'EQ'},
            {key: 'Not', value: 'NOT'}
            ],
        placeholder: '',
        required: true,
        size: '-md-2',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'Sec Determinant Table',
        name: ClaimDiscountCalcRulesFieldNames.SEC_DETERMINANT_TABLE,
        placeholder: '',
        required: false,
        size: '-md-3',
        class: 'p-0',
        isTableLookup: true,
        tableNameField: 'secDeterminantTable',
        columnNameField: 'secDeterminantColumn',
    },
    {
        type: 'text',
        label: 'Sec Determinant Column',
        name: ClaimDiscountCalcRulesFieldNames.SEC_DETERMINANT_COL,
        required: false,
        size: '-md-2',
        isTableLookup: true,
        tableNameField: 'secDeterminantTable',
        columnNameField: 'secDeterminantColumn',
        disabled: false
    },
    {
        type: 'text',
        label: 'From Value',
        name: ClaimDiscountCalcRulesFieldNames.FROM_VALUE,
        class: 'p-0',
        size: '-md-2',
        disabled: false
    },
    {
        type: 'text',
        label: 'Thru Value',
        name: ClaimDiscountCalcRulesFieldNames.THRU_VALUE,
        class: 'p-0',
        size: '',
        disabled: false
    }
];
