export class Menu {
    menuItem: string;
    dropdownItems?: Array<DropDownItem>;
    disabled?: boolean;
}

export class DropDownItem {
    name?: string;
    shortcutKey?: string;
    disabled?: boolean;
    isHorizontal?: boolean = false;
    dropdownItems?: Array<DropDownItem>;
}

export class SearchModel {
    url: string; // /diamond/group-master
    columnDefs: Array<any>;
    defaultColumnDefs: Array<any>;
    searchOption: Array<Object>;
    defaultLoad?: boolean;
    isMatch: boolean; // [{"Short_Name": "test", "Level": "1"}, {"Short_Name": "thing", "Level": "2"}]
    isMatchAllContracts: boolean;
    isContracts: boolean;
    httpMethod: string;
    userId: string;
    winId: string;
    dwName: string;

    // TODO: convert all lookups to GET as all are readonly
    constructor(url, columnDefs, defaultColumnDefs, searchOpt, isMatch = false, defaultLoad = false, httpMethod = 'post') {
        this.url = url;
        this.columnDefs = columnDefs;
        this.defaultColumnDefs = defaultColumnDefs;
        this.searchOption = searchOpt;

        this.isMatchAllContracts = false;
        this.isMatch = isMatch;
        this.isContracts = false;
        this.defaultLoad = defaultLoad;
        this.httpMethod = httpMethod;
    }
}

export class Option {
    key: string;
    value: string;
}

export enum OPERATIONS {
    UPDATE = 'update',
    DELETE = 'delete',
    ADD = 'add',
}

export enum FORM_FIELD_ACTION_TYPES {
    UPDATE = 'update',
    DELETE = 'delete',
    ADD = 'add',
    SELECT = 'select'          // records selected
}


export class FormRow {
    formFields: Array<FormField>;
    id?: any;                   // id could be primary key (string/Object) of record
    action?: FORM_FIELD_ACTION_TYPES;             // default action is add new field
    index?: number;
}

export class DynamicConfigFormRow {

    formFields: Array<FormField>;
    id?: any;                   // id could be primary key (string/Object) of record
    action?: FORM_FIELD_ACTION_TYPES;             // default action is add new field
    config?: Array<FormField>;
    showCancelButton?: boolean;
    showSaveButton?: boolean;
    index?: number;        // temp formField state index
    //
    constructor(fields?: Array<FormField>, id?: any, action?: FORM_FIELD_ACTION_TYPES) {
        this.formFields = fields;
        this.id = id;
        this.action = action;
        this.showCancelButton = false;
        this.showSaveButton = false;
    }
}


export class FormField {
  type: string;
  label?: string;
  name: string;
  text?:string;
  value?: string | any;
  options?: Array<Option>;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  size?: string;
  class?: string;
  disabled?: boolean;
  hideSingleField?: boolean;
  emitOnChange?: boolean; // emit form values if it has been set tu true
  min?: number;
  max?: number;
  isLookup?: boolean;
  isTableLookup?: boolean;
  searchModel?: any;
  lookupUrl?: string;
  emitChangeFieldWhenf5?: boolean;
  data?: any;
  lookupResponseField?: string;
  tableNameField?: string;
  columnNameField?: string;
  lookupColumns?: any;
  hideField?: boolean;
  compareField?: string;
  defaultValue?: any;

  constructor() {
    this.class = "";
    this.value = "";
  }
}


export class ClaimBatchInit {
    batchNumber: string;
    dateReceived: string

    constructor() {
        this.batchNumber = '';
        this.dateReceived = '';
    }
}

export class ApiResult {
    results: Array<any>;
    pageSize?: number;
    size?: number;

    constructor() {
    }
}
