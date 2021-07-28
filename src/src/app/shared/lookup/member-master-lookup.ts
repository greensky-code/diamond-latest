export class MemberMasterLookup {

    public static MEMBER_MASTER_DEFAULT = [
        {headerName: 'Diamond ID', field: 'diamondId', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Subscriber ID', field: 'subscriberId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Person Number', field: 'personNumber', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Last Name', field: 'lastName', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'First Name', field: 'firstName', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Address Line 1', field: 'addressLine1', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'City', field: 'city', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'State/Province', field: 'state', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Zip/Postal Code', field: 'privZipCode', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Country', field: 'privCountry', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Home Phone', field: 'homePhoneNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Business Phone', field: 'busPhoneNumber', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Contract Title', field: 'contactTitle', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Date Of Birth', field: 'dateOfBirth', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Gender', field: 'gender', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Marital Status', field: 'maritalStatus', width: 140, headerClass: 'font-weight-bold'},
        // {headerName: 'Long Code', field: 'seqParentId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Def 1', field: 'userDefined1', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'User Def 2', field: 'userDefined2', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Medicare No', field: 'medicareNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'MedicaId No', field: 'medicaidNo', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Social Sec No', field: 'socialSecNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Employee No', field: 'employeeNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Medical Rec No', field: 'medicalRecNo', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Hold Reason', field: 'holdReason', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Hold Date', field: 'holdDate', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Dep Verif State', field: 'depVerifStatus', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Aka last Name', field: 'akaLastName', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Aka First Name', field: 'akaFirstName', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Address 1', field: 'akaAddressLine1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Aka City', field: 'akaCity', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Aka State/Province', field: 'akaState', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Zip/Postal Code', field: 'akaZipCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Country', field: 'akaCountry', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Phone', field: 'akaPhoneNumber', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Last Name', field: 'respLastName', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Resp First Name', field: 'respFirstName', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Address 1', field: 'respAddressLine1', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Resp City', field: 'respCity', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp State / Province', field: 'respState', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Zip/ Postal Code', field: 'respZipCode', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Country', field: 'respCountry', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Phone', field: 'respPhoneNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Ver Thru Date', field: 'verfiedThruDate', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Subs Update', field: 'subsUpdate', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Prev Subscriber Id', field: 'prevSubscriberId', width: 140, headerClass: 'font-weight-bold'}];

    public static MEMBER_MASTER_ALL = [
        {headerName: 'Diamond ID', field: 'diamondId', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Subscriber ID', field: 'subscriberId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Person Number', field: 'personNumber', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Last Name', field: 'lastName', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'First Name', field: 'firstName', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Address Line 1', field: 'addressLine1', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'City', field: 'city', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'State/Province', field: 'state', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Zip/Postal Code', field: 'privZipCode', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Country', field: 'privCountry', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Home Phone', field: 'homePhoneNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Business Phone', field: 'busPhoneNumber', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Contract Title', field: 'contactTitle', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Date Of Birth', field: 'dateOfBirth', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Gender', field: 'gender', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Marital Status', field: 'maritalStatus', width: 140, headerClass: 'font-weight-bold'},
       // {headerName: 'Long Code', field: 'seqParentId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'User Def 1', field: 'userDefined1', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'User Def 2', field: 'userDefined2', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Medicare No', field: 'medicareNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'MedicaId No', field: 'medicaidNo', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Social Sec No', field: 'socialSecNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Employee No', field: 'employeeNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Medical Rec No', field: 'medicalRecNo', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Hold Reason', field: 'holdReason', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Hold Date', field: 'holdDate', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Dep Verif State', field: 'depVerifStatus', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Aka last Name', field: 'akaLastName', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Aka First Name', field: 'akaFirstName', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Address 1', field: 'akaAddressLine1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Aka City', field: 'akaCity', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Aka State/Province', field: 'akaState', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Zip/Postal Code', field: 'akaZipCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Country', field: 'akaCountry', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Aka Phone', field: 'akaPhoneNumber', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Last Name', field: 'respLastName', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Resp First Name', field: 'respFirstName', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Address 1', field: 'respAddressLine1', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Resp City', field: 'respCity', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp State / Province', field: 'respState', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Zip/ Postal Code', field: 'respZipCode', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Country', field: 'respCountry', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Resp Phone', field: 'respPhoneNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Ver Thru Date', field: 'verfiedThruDate', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Subs Update', field: 'subsUpdate', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Prev Subscriber Id', field: 'prevSubscriberId', width: 140, headerClass: 'font-weight-bold'}];
}
