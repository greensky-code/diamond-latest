import {FormField} from '../../shared/models/models';

export enum PricingPartnerDetailFields {
    ACTION = 'action',
    CHANGED_ON_DATE = 'changedOnDate',
    CHANGE_RECORD_INDICATOR = 'changeRecordIndicator',
    CHANGE_REASON = 'changeReason',
    PRICING_ACCOUNT_CODE = 'pricingAccountCode',
    EFFECTIVE_DATE = 'effectiveDate',
    TERM_DATE = 'termDate'
}


export enum WindoeAccessFields {
    WIN_ID = "winId",
    P_SEL = "pSel",
    P_INS = "pIns",
    P_UPD = "pUpd",
    P_DEL = "pDel",
    MAX_OPEN = "maxOpen",
}

export enum ProvinceTaxDetailFields {
    APPLY_RETRO = 'applyRetro',
    CHANGE_REASON = 'changeReason',
    TERM_DATE = 'termDate',
    EFFECTIVE_DATE = 'effectiveDate',
    EXEMPT_PRODUCT = 'exemptProduct',
    TAX_TYPE = 'taxType',
    TAX_REGION = 'taxRegion'
}
export enum LocalCurrencyConversionFields{
    SVC_DATE = 'serviceDate',
    PROC = 'billedProcedure',
    QTY = 'billedQty',
    LOCAL_BILLED = 'billedAmt',
    THRESHOLD = '',
    CURRENCY = 'incurredCurrencyCode',
    EXCHANGE_RATE = 'incurredExchRate',
    US_BILLED = 'incurredEuroBilledAmt',
    SELECT = 'select',
    LINE = 'line'

}

export enum FillingDetailFields {
    APPLY_TO_ALL_SUBGROUPS = 'applyToSubgroup',
    CHANGE_REASON = 'changeReason',
    TERM_DATE = 'termDate',
    EFFECTIVE_DATE = 'effectiveDate',
    SITUS_STATE = 'situsState',
    FILING_TYPE = 'filingType',
    SEQ_GRP_FILING_ID = 'seqGrpfilingId'
}

export enum PharmacyPayerDetailsFields {
    PLAN = "hsdPlancode",
    EFF_DATE = "planEffectiveDate",
    END_DATE = "planEndDate",
    PBM_ID = "payerPbmCode",
    DRUGS_LIST = "drugList",
    RX_PRIME = "rxprimePlancodeFlag",
    ACTION = ""
}

export enum PharmacyArgusDetailsFields {
    PLAN = "hsdPlancode",
    EFF_DATE = "planEffectiveDate",
    END_DATE = "planEndDate",
    RX_PRIME_ACC = "rxprimeAcctNum",
    CLAIM_DIVISION = "claimDivision",
    POLICY_CODE = "policyCode",
    RX_PRIME = "rxprimePlancodeFlag"
}

export enum ArgusDetailFields {
    PLAN = 'plan',
    EFFECTIVE_DATE = 'effectiveDate',
    END_DATE = 'endDate',
    RXPRIME_ACCOUNT = 'rxPrimeAccount',
    CLAIM_DIVISION = 'claimDivision',
    POLICY_CODE = 'policyCode',
    RXPRIME = 'rxPrime'
}
export enum PharmacyESIDetailsFields {
    PLAN = "hsdPlancode",
    EFF_DATE = "planEffectiveDate",
    END_DATE = "planEndDate",
    RX_PLAN_ID = "rxprimeAcctNum",
    RX_PRIME = "rxprimePlancodeFlag",
    ACTION = ""
}

export enum StateMandateFields {
    TERM_REASON = 'termReason',
    TERM_DATE = 'termDate',
    EFFECTIVE_DATE = 'effectiveDate',
    ET_STATE = 'state'
}

export enum StateMandateSubGroupFields {
    TERM_REASON = 'termReason',
    TERM_DATE = 'termDate',
    EFFECTIVE_DATE = 'effectiveDate',
    ET_STATE = 'state',
    EXCLUDE_TYPE = 'operator'
}

export enum CignaLinkGroupFields {
    PARTNER_NAME = 'partnerCode',
    PARTICIPATION_IND = 'seqCodeId',
    PROVINCE_IND = 'countryCode',
    COUNTRY_NAME = 'countryName',
    NOTE_TYPE = 'noteType',
    EFFECTIVE_DATE = 'effDate',
    TERM_DATE = 'termDate',
    RENEWAL_DATE = 'renewalDate',
    RENEWAL_IND = 'AutoRenewFlag',
    CONTACTS_ADDRESS = 'Update',
    CLONE_COUNTRY = 'Clone'
}

export const CignaLinkDetailsConfig: FormField[] = [
    {
        type: 'checkbox',
        label: 'Participation Ind',
        name: CignaLinkGroupFields.PARTICIPATION_IND,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 20
    },
    {
        type: 'select',
        label: 'Province Ind',
        name: CignaLinkGroupFields.PROVINCE_IND,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 15
    },
    {
        type: 'text',
        label: 'Country Name',
        name: CignaLinkGroupFields.COUNTRY_NAME,
        placeholder: '',
        required: false,
        emitOnChange: false,
        size: '-md-1',
        maxLength: 15
    },
    {
        type: 'text',
        label: 'Note Type',
        name: CignaLinkGroupFields.NOTE_TYPE,
        placeholder: '',
        required: false,
        emitOnChange: false,
        size: '-md-1',
        maxLength: 15
    },
    {
        type: 'date',
        label: 'Effective Date',
        name: CignaLinkGroupFields.EFFECTIVE_DATE,
        placeholder: '',
        emitOnChange: true,
        size: '-md-1',
        maxLength: 20
    }, {
        type: 'date',
        label: 'Term Date',
        name: CignaLinkGroupFields.TERM_DATE,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
    },
    {
        type: 'date',
        label: 'Renewal Date',
        name: CignaLinkGroupFields.RENEWAL_DATE,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
    },
    {
        type: 'select',
        label: 'Renewal Ind',
        name: CignaLinkGroupFields.RENEWAL_IND,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 15
    },
    {
        type: 'action',
        label: 'Contacts/Address',
        value: '',
        name: CignaLinkGroupFields.CONTACTS_ADDRESS,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15
    },
    {
        type: 'action',
        label: 'Clone Country',
        value: '',
        name: CignaLinkGroupFields.CLONE_COUNTRY,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 15
    }
];


export const PricingPartnerDetailsConfig: FormField[] = [
    {
        type: 'date',
        label: 'Effective Date',
        name: PricingPartnerDetailFields.EFFECTIVE_DATE,
        placeholder: '',
        class: 'pl-1',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        required: false,
    }, {
        type: 'date',
        label: 'Term Date',
        name: PricingPartnerDetailFields.TERM_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
    }, {
        type: 'radioButton',
        label: 'Pricing Account Code',
        name: PricingPartnerDetailFields.PRICING_ACCOUNT_CODE,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20
    },

    {
        type: 'select',
        label: 'Change Reason',
        name: PricingPartnerDetailFields.CHANGE_REASON,
        placeholder: '',
        hideField: true,
        emitOnChange: true,
        size: '-md-2',
    }, {
        type: 'text',
        label: 'Change Record Indicator',
        emitOnChange: false,
        name: PricingPartnerDetailFields.CHANGE_RECORD_INDICATOR,
        size: '-md-1',
        maxLength: 10,
        hideField: true,
        disabled: true,
    }, {
        type: 'text',             // default type date
        label: 'Changed On Date',
        name: PricingPartnerDetailFields.CHANGED_ON_DATE,
        placeholder: '',
        required: false,
        emitOnChange: false,
        disabled: true,
        size: '-md-1',
        maxLength: 30,
        hideField: true,
    }, {
        type: 'action',
        label: 'Action',
        value: '',
        name: PricingPartnerDetailFields.ACTION,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 30
    }
];

export const StateMandateSubGroupConfig: FormField[] = [
    {
        type: 'select',
        label: 'Exclude Type',
        name: StateMandateSubGroupFields.EXCLUDE_TYPE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15,
        disabled: false
    }, {
        type: 'select',
        label: 'ET State',
        name: StateMandateSubGroupFields.ET_STATE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15,
        disabled: false
    }, {
        type: 'date',
        label: 'Effective Date',
        name: StateMandateSubGroupFields.EFFECTIVE_DATE,
        placeholder: '',
        class: 'pl-1',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        disabled: false
    }, {
        type: 'date',
        label: 'Term Date',
        name: StateMandateSubGroupFields.TERM_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
        disabled: false
    }, {
        type: 'select',
        label: 'Term Reason',
        name: StateMandateSubGroupFields.TERM_REASON,
        placeholder: '',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        disabled: false
    }
];

export const StateMandateGroupFilingsConfig: FormField[] = [
    {
        type: 'select',
        label: 'ET State',
        name: StateMandateFields.ET_STATE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15
    }, {
        type: 'date',
        label: 'Effective Date',
        name: StateMandateFields.EFFECTIVE_DATE,
        placeholder: '',
        class: 'pl-1',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20
    }, {
        type: 'date',
        label: 'Term Date',
        name: StateMandateFields.TERM_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
    }, {
        type: 'select',
        label: 'Term Reason',
        name: StateMandateFields.TERM_REASON,
        placeholder: '',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20
    }
];

export const FillingDetailFieldsConfig: FormField[] = [
  {
    type: "DescSelect", //To show key after selection
    label: "Filing Type",
    name: FillingDetailFields.FILING_TYPE,
    placeholder: "",
    required: true,
    emitOnChange: true,
    size: "-md-2",
    maxLength: 15,
    disabled: false,
    hideField: false
  },
  {
    type: "select",
    label: "Situs State",
    name: FillingDetailFields.SITUS_STATE,
    placeholder: "",
    required: true,
    emitOnChange: true,
    size: "-md-2",
    maxLength: 15,
    disabled: false,
    hideField: false
  },
  {
    type: "date",
    label: "Effective Date",
    name: FillingDetailFields.EFFECTIVE_DATE,
    placeholder: "",
    class: "pl-1",
    required: true,
    emitOnChange: true,
    size: "-md-2",
    maxLength: 20,
    disabled: false,
    hideField: false
  },
  {
    type: "date",
    label: "Term Date",
    name: FillingDetailFields.TERM_DATE,
    placeholder: "",
    size: "-md-2",
    maxLength: 20,
    emitOnChange: true,
    disabled: false,
    hideField: false
  },
  {
    type: "DescSelect",
    label: "Change Reason",
    name: FillingDetailFields.CHANGE_REASON,
    placeholder: "",
    emitOnChange: true,
    size: "-md-2",
    maxLength: 20,
    disabled: false,
    hideField: false
  },
  {
    type: "select",
    label: "Apply to all Subgroups",
    emitOnChange: true,
    name: FillingDetailFields.APPLY_TO_ALL_SUBGROUPS,
    size: "-md-1",
    required: true,
    maxLength: 10,
    disabled: false,
    hideField: false
  },
  {
    type: "hidden",
    label: "",
    name: FillingDetailFields.SEQ_GRP_FILING_ID,
    size: "-md-1",
    required: true,
    maxLength: 10,
    disabled: false,
    hideField: false
  },
];

export const PharmacyArgusDetailsConfig: FormField[] = [
    {
        type: 'text',
        label: 'Plan',
        name: PharmacyArgusDetailsFields.PLAN,
        placeholder: '',
        class: 'pl-1',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20
    }, {
        type: 'date',
        label: 'Eff Date',
        name: PharmacyArgusDetailsFields.EFF_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
    }, {
        type: 'date',
        label: 'End Date',
        name: PharmacyArgusDetailsFields.END_DATE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20
    }, {
        type: 'text',
        label: 'RXPrime Account#',
        name: PharmacyArgusDetailsFields.RX_PRIME_ACC,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 10
    }, {
        type: 'text',
        label: 'Claim Division',
        emitOnChange: false,
        name: PharmacyArgusDetailsFields.CLAIM_DIVISION,
        size: '-md-1',
        maxLength: 10
    }, {
        type: 'text',
        label: 'Policy Code',
        name: PharmacyArgusDetailsFields.POLICY_CODE,
        placeholder: '',
        required: false,
        emitOnChange: false,
        disabled: true,
        size: '-md-1',
        maxLength: 30
    },  {
        type: 'select',
        label: 'RXPrime?',
        name: PharmacyArgusDetailsFields.RX_PRIME,
        placeholder: '',
        required: false,
        emitOnChange: false,
        disabled: true,
        size: '-md-1',
        maxLength: 30
    }
];

export const PharmacyPayerDetailsConfig: FormField[] = [
    {
        type: 'text',
        label: 'Plan',
        name: PharmacyPayerDetailsFields.PLAN,
        placeholder: '',
        class: 'pl-1',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15,
        disabled: true
    }, {
        type: 'date',
        label: 'Eff Date',
        name: PharmacyPayerDetailsFields.EFF_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
        disabled: true
    }, {
        type: 'date',
        label: 'End Date',
        name: PharmacyPayerDetailsFields.END_DATE,
        placeholder: '',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        disabled: true
    }, {
        type: 'text',
        label: 'PBM ID',
        name: PharmacyPayerDetailsFields.PBM_ID,
        placeholder: '',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 10,
        disabled: true

    }, {
        type: 'select',
        label: 'Drugs List',
        emitOnChange: true,
        name: PharmacyPayerDetailsFields.DRUGS_LIST,
        size: '-md-2',
        maxLength: 20,
        disabled: true

    }, {
        type: 'select',
        label: 'RXPrime?',
        name: PharmacyPayerDetailsFields.RX_PRIME,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 30
    }
];

export const PharmacyESIDetailsConfig: FormField[] = [
    {
        type: 'text',
        label: 'Plan',
        name: PharmacyESIDetailsFields.PLAN,
        placeholder: '',
        class: 'pl-1',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15,
        disabled: true
    }, {
        type: 'date',
        label: 'Eff Date',
        name: PharmacyESIDetailsFields.EFF_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
        disabled: true
    }, {
        type: 'date',
        label: 'End Date',
        name: PharmacyESIDetailsFields.END_DATE,
        placeholder: '',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        disabled: true
    }, {
        type: 'text',
        label: 'RX Plan ID',
        name: PharmacyESIDetailsFields.RX_PLAN_ID,
        placeholder: '',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 10
    }, {
        type: 'select',
        label: 'RXPrime?',
        name: PharmacyESIDetailsFields.RX_PRIME,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 30
    }
];

export enum ContactFields {
    ACTION = 'action',
    EMAIL_ADDRESS = 'emailAddress',
    LAST_NAME = 'lastName',
    FIRST_NAME = 'firstName',
    DESCRIPTION = 'contactCode',
    DESCRIPTION_HIDDEN = 'contactCodeHidden',
    EFFECTIVE_DATE = 'effDate',
    TERM_DATE = 'termDate',
    PHONE_NUMBER = 'phoneNum',
    EXTENSION = 'phoneExt'
}



export const ContactConfig: FormField[] = [
   {
        type: 'select',
        label: 'Description',
        name: ContactFields.DESCRIPTION,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
       options:  []
    },

    {
        type: 'text',
        label: 'First Name',
        name: ContactFields.FIRST_NAME,
        placeholder: '',
        required: true,
        size: '-md-2',
        maxLength: 20
    }, {
        type: 'text',
        label: 'Last Name',
        emitOnChange: false,
        name: ContactFields.LAST_NAME,
        size: '-md-1',
        maxLength: 10
    },  {
        type: 'nested',
        label: 'Email Address',
        emitOnChange: false,
        name: ContactFields.EMAIL_ADDRESS,
        size: '-md-3',
        maxLength: 30,
        data:[{
            type: 'text',
            label: 'Phone Number',
            emitOnChange: false,
            name: ContactFields.PHONE_NUMBER,
          }

        ]
    }, {
        type: 'nestedDate',
        label: 'Effective Date',
        name: ContactFields.EFFECTIVE_DATE,
        placeholder: '',
        class: 'pl-1',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        data:[{
            type: 'text',
            label: 'Extension',
            emitOnChange: false,
            name: ContactFields.EXTENSION,
            size: '-md-1',
            maxLength: 10
        }    
        ]
    }, {
        type: 'date',
        label: 'Term Date',
        name: ContactFields.TERM_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
        compareField: ContactFields.EFFECTIVE_DATE
    },
];


export enum AddonPhoneFields {
    PHONE_TYPE = 'phoneType',
    PHONE_OR_Fax_NO = 'phoneOrFax',
    EFFECTIVE_DATE = 'effDate',
    TERM_DATE = 'termDate',
    EXTENSION = 'extension'
}
export const AddonPhoneConfig: FormField[] = [
    {
        type: 'select',
        label: 'Phone Type',
        name: AddonPhoneFields.PHONE_TYPE,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        options: []
    },

    {
        type: 'text',
        label: 'Phone /Fax #',
        name: AddonPhoneFields.PHONE_OR_Fax_NO,
        placeholder: '',
        required: true,
        size: '-md-2',
        maxLength: 25
    }, {
        type: 'text',
        label: 'Extension',
        emitOnChange: false,
        name: AddonPhoneFields.EXTENSION,
        size: '-md-2',
        maxLength: 8
    }, {
        type: 'date',
        label: 'Effective Date',
        name: AddonPhoneFields.EFFECTIVE_DATE,
        placeholder: '',
        class: 'pl-1',
        emitOnChange: true,
        size: '-md-2',
        maxLength: 20,
        required: true
    }, {
        type: 'date',
        label: 'Term Date',
        name: AddonPhoneFields.TERM_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
        compareField: AddonPhoneFields.EFFECTIVE_DATE
    },
];

export enum ContactPlanDetailsFields {
    ACTION = 'action',
    VAT_REGISTRATION_NUMBER = 'vATRegistrationNumber',
    VAT_REGISTRATION_NAME = 'vATRegistrationName',
    EFFECTIVE_DATE = 'effDate',
    TERM_DATE = 'termDate',
    DUMMY_TERM_DATE = 'DummytermDate'
}

export const ContactPlanDetailsConfig: FormField[] = [
   {
        type: 'text',
        label: 'VAT Registration Number',
        name: ContactPlanDetailsFields.VAT_REGISTRATION_NUMBER,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        disabled: false
    },

    {
        type: 'text',
        label: 'VAT Registration Name',
        name: ContactPlanDetailsFields.VAT_REGISTRATION_NAME,
        placeholder: '',
        emitOnChange: true,
        required: true,
        size: '-md-3',
        disabled: false
    }, {
        type: 'date',
        label: 'Effective Date',
        name: ContactPlanDetailsFields.EFFECTIVE_DATE,
        placeholder: '',
        class: 'pl-1',
        required: true,
        emitOnChange: true,
        size: '-md-3',
        disabled: false
    }, {
        type: 'date',
        label: 'Term Date',
        name: ContactPlanDetailsFields.TERM_DATE,
        placeholder: '',
        size: '-md-3',
        required: false,
        emitOnChange: true,
        maxLength: 20,
        disabled: false
    }
];

export const ArgusDetailFieldsConfig: FormField[] = [
    {
        type: 'text',
        label: 'Plan',
        name: ArgusDetailFields.PLAN,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 15
    },
    {
        type: 'date',
        label: 'EFF Date',
        name: ArgusDetailFields.EFFECTIVE_DATE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15
    },
    {
        type: 'date',
        label: 'End Date',
        name: ArgusDetailFields.END_DATE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15
    },
    {
        type: 'text',
        label: 'RX Prime Account',
        name: ArgusDetailFields.RXPRIME_ACCOUNT,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15
    },
    {
        type: 'text',
        label: 'Claim Division',
        name: ArgusDetailFields.CLAIM_DIVISION,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 15
    },
    {
        type: 'text',
        label: 'Policy Code',
        name: ArgusDetailFields.POLICY_CODE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 15
    },
    {
        type: 'select',
        label: 'RX PRIME',
        name: ArgusDetailFields.RXPRIME,
        placeholder: '',
        required: true,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 15
    },

];

export const ProvinceTaxDetailsConfig: FormField[] = [
    {
        type: 'select',
        label: 'Tax Region',
        name: ProvinceTaxDetailFields.TAX_REGION,
        placeholder: '',
        required: true,
        emitOnChange: true,
        disabled: false,
        size: '-md-1',
        maxLength: 20
    },
    {
        type: 'select',
        label: 'Tax Type',
        name: ProvinceTaxDetailFields.TAX_TYPE,
        placeholder: '',
        required: true,
        emitOnChange: true,
        disabled: false,
        size: '-md-2',
        maxLength: 10
    },
    {
        type: 'select',
        label: 'Exempt Product',
        required: true,
        emitOnChange: true,
        disabled: false,
        name: ProvinceTaxDetailFields.EXEMPT_PRODUCT,
        size: '-md-1',
        maxLength: 10
    },
    {
        type: 'date',
        label: 'Effective Date',
        name: ProvinceTaxDetailFields.EFFECTIVE_DATE,
        placeholder: '',
        required: true,
        class: 'pl-1',
        emitOnChange: true,
        disabled: false,
        size: '-md-2',
        maxLength: 20
    }, {
        type: 'date',
        label: 'Term Date',
        name: ProvinceTaxDetailFields.TERM_DATE,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
    },
      {
        type: 'select',
        label: 'Change Reason',
        name: ProvinceTaxDetailFields.CHANGE_REASON,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-2',
        maxLength: 30
    }, {
        type: 'select',
        label: 'Apply Retro',
        value: '',
        name: ProvinceTaxDetailFields.APPLY_RETRO,
        placeholder: '',
        required: false,
        emitOnChange: true,
        size: '-md-1',
        maxLength: 30
    }
];

export const LocalCurrencyConversionConfig: FormField[] = [

   

    {
        type: 'checkbox',
        label: 'Select',
        name: LocalCurrencyConversionFields.SELECT,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
    },
    {
        type: 'text',
        label: 'Line',
        name: LocalCurrencyConversionFields.LINE,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
        disabled: true,

    },
    {
        type: 'date',
        label: '*Svc Date',
        name: LocalCurrencyConversionFields.SVC_DATE,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
    },
    {
        type: 'text',
        label: '*Proc',
        name: LocalCurrencyConversionFields.PROC,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
    },
    {
        type: 'text',
        label: '*Qty',
        name: LocalCurrencyConversionFields.QTY,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
    },
    {
        type: 'text',
        label: '*Local Billed',
        name: LocalCurrencyConversionFields.LOCAL_BILLED,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
    },
    {
        type: 'text',
        label: 'Threshold',
        name: LocalCurrencyConversionFields.THRESHOLD,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
        disabled: true,

    },
    {
        type: 'text',
        label: 'Currency',
        name: LocalCurrencyConversionFields.CURRENCY,
        placeholder: '',
        size: '-md-2',
        maxLength: 20,
        emitOnChange: true,
        disabled: true,

    },
    {
        type: 'text',
        label: 'Exchange Rate',
        name: LocalCurrencyConversionFields.EXCHANGE_RATE,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
        disabled: true,

    },
    {
        type: 'text',
        label: 'U.S. Billed ',
        name: LocalCurrencyConversionFields.US_BILLED,
        placeholder: '',
        size: '-md-1',
        maxLength: 20,
        emitOnChange: true,
        disabled: true,

    },
]





export const WindowAccessConfig: FormField[] = [
  {
    type: "select",
    label: "Win ID",
    name: WindoeAccessFields.WIN_ID,
    placeholder: "",
    class: "pl-1",
    emitOnChange: true,
    size: "-md-2",
    maxLength: 20,
    required: false,
  },
  {
    type: "checkbox",
    label: "P Sel",
    name: WindoeAccessFields.P_SEL,
    placeholder: "",
    size: "-md-2",
    maxLength: 20,
    emitOnChange: true,
  },
  {
    type: "checkbox",
    label: "P Ins",
    name: WindoeAccessFields.P_INS,
    placeholder: "",
    required: false,
    emitOnChange: true,
    size: "-md-2",
    maxLength: 20,
  },

  {
    type: "checkbox",
    label: "P Upd",
    name: WindoeAccessFields.P_UPD,
    placeholder: "",
    emitOnChange: true,
    size: "-md-2",
  },
  {
    type: "checkbox",
    label: "P Del",
    emitOnChange: true,
    name: WindoeAccessFields.P_DEL,
    size: "-md-1",
    maxLength: 10,
  },
  {
    type: "text", // default type date
    label: "Max Open",
    name: WindoeAccessFields.MAX_OPEN,
    placeholder: "",
    required: false,
    emitOnChange: true,
    size: "-md-1",
    maxLength: 30,
  },
];

