export class BenefitRuleLookup {

    public static BENEFIT_RULE_DEFAULT = [

        {headerName: 'Rule Id', field: 'ruleId', resizable: true, headerClass: 'font-weight-bold', comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
            if (valueA === valueB) { return 0; }
            return (valueA > valueB) ? 1 : -1;
        }},
        {headerName: 'Rule Type', field: 'ruleType',  resizable: true , headerClass: 'font-weight-bold'},
        {headerName: 'Short Description', field: 'shortDescription',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Med Def Filter', field: 'medDefFilter',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Narrative', field: 'narrative', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 1', field: 'attributeChar1',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 2', field: 'attributeChar2',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 3', field: 'attributeChar3',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 4', field: 'attributeChar4',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 5', field: 'attributeChar5',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 6', field: 'attributeChar6',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 7', field: 'attributeChar7',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 8', field: 'attributeChar8',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 9', field: 'attributeChar9',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 10', field: 'attributeChar10',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 11', field: 'attributeChar11',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 12', field: 'attributeChar12',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 13', field: 'attributeChar13',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 14', field: 'attributeChar14',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 15', field: 'attributeChar15',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 1', field: 'attributeNum1', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 2', field: 'attributeNum2', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 3', field: 'attributeNum3', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 4', field: 'attributeNum4', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 5', field: 'attributeNum5', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 6', field: 'attributeNum6', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 7', field: 'attributeNum7', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 8', field: 'attributeNum8', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 9', field: 'attributeNum9', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Num 10', field: 'attributeNum10', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Date 1', field: 'attributeDate1', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute Date 2', field: 'attributeDate2', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Datetime', field: 'insertDatetime', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Insert User', field: 'insertUser', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Process', field: 'insertProcess', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Update Datetime', field: 'updateDatetime', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Update User', field: 'updateUser', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Update Process', field: 'updateProcess', resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Multiply By Qty', field: 'multiplyByQty', resizable: true, headerClass: 'font-weight-bold'}

    ];

    public static BENEFIT_RULE_ALL = [
        {headerName: 'Rule Id', field: 'ruleId', resizable: true, headerClass: 'font-weight-bold', comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
            if (valueA === valueB) { return 0; }
            return (valueA > valueB) ? 1 : -1;
        }},
        {headerName: 'Rule Type', field: 'ruleType',  resizable: true , headerClass: 'font-weight-bold'},
        {headerName: 'Short Description', field: 'shortDescription',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Narrative ', field: 'narrative',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Datetime ', field: 'insertDatetime',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Insert User ', field: 'insertUser',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Process ', field: 'insertProcess',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Update Datetime', field: 'updateDatetime',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Update User', field: 'updateUser',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Update Process ', field: 'updateProcess',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Multiply by Qty', field: 'multiplyByQty',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 1', field: 'attributeChar1',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 2', field: 'attributeChar2',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 3', field: 'attributeChar3',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 4', field: 'attributeChar4',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 5', field: 'attributeChar5',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 6', field: 'attributeChar6',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 7', field: 'attributeChar7',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 8', field: 'attributeChar8',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 9', field: 'attributeChar9',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 10', field: 'attributeChar10',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 11', field: 'attributeChar11',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 12', field: 'attributeChar12',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 13', field: 'attributeChar13',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 14', field: 'attributeChar14',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Attribute char 15', field: 'attributeChar15',  resizable: true, headerClass: 'font-weight-bold'},
        {headerName: 'Med Def Filter', field: 'medDefFilter',  resizable: true, headerClass: 'font-weight-bold'},

    ];

}
