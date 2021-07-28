/* Copyright (c) 2020 . All Rights Reserved. */
import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { ArCashReceipt } from "../api-models/ar-cash-receipt.model";
declare var pdfMake: any;

@Injectable()
export class ReportService {
  pdf: any;

  getCurrentDate() {
    return new Date().toLocaleDateString("en-IE", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  }

  accumClaimsReportReport(): any {
    var reportDate = this.getCurrentDate();
    var twoDigitFormat = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    var fourDigitFormat = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
    var dataGridItems = [
      [
        { text: "Value 1", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 2", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 3", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 4", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 5", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 6", alignment: "left", style: "tableBodyStyle" },
      ],
      [
        { text: "Value 1", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 2", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 3", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 4", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 5", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 6", alignment: "left", style: "tableBodyStyle" },
      ],
      [
        { text: "Value 1", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 2", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 3", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 4", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 5", alignment: "left", style: "tableBodyStyle" },
        { text: "Value 6", alignment: "left", style: "tableBodyStyle" },
      ],
    ];

    var documentDefinition = {
      pageSize: "LEGAL",
      pageOrientation: "landscape",
      pageMargins: [40, 60, 40, 60],
      header: function (page: any, pages: any) {
        return {
          columns: [
            {
              width: "40%",
              text: reportDate,
              alignment: "left",
              style: "defaultStyle",
            },
            {
              width: "35%",
              alignment: "left",
              text: "Page " + page.toString() + " of " + pages.toString(),
              style: "defaultStyle",
            },
          ],
          margin: [800, 40, 40, 50],
        };
      },
      content: [
        {
          columns: [],
        },
        {
          columns: [],
        },
        {
          columns: [],
        },
        {
          columns: [
            {
              width: "10%",
              text:
                "The Following claims should be reviewed for possible manual Adjustment to the above members Accumulators:",
              alignment: "left",
              style: "defaultStyle",
            },
          ],
        },
        {
          columns: [],
        },
        {
          columns: [],
        },
        {
          columns: [],
        },
        {
          columns: [],
        },
        {
          columns: [],
        },
        {
          columns: [
            {
              width: "10%",
              text:
                "The above Claim has credeted the follow benefit Accumulators in other benefit package",
              alignment: "left",
              style: "defaultStyle",
            },
          ],
        },
        {
          columns: [
            {
              table: {
                widths: ["10%", "10%", "10%", "10%", "10%", "10%"],
                body: [
                  [
                    {
                      text: "Group ID",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "Benefit Package ID",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "RULE ID",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "Accum Svc Date",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "Claim Amt",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "Claim Qty",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                  ],
                ].concat(dataGridItems),
              },
              layout: "lightHorizontalLines",
            },
          ],
        },
      ],
      styles: {
        tableHeaderStyle: {
          bold: true,
          color: "black",
          fontSize: 10,
        },
        tableFooterStyle: {
          bold: true,
          color: "black",
          fontSize: 10,
        },
        tableBodyStyle: {
          color: "black",
          fontSize: 10,
        },
        headerStyle: {
          bold: true,
          color: "black",
          fontSize: 12,
        },
        defaultStyle: {
          color: "black",
          fontSize: 10,
        },
      },
    };

    this.pdf = pdfMake;
    this.pdf.createPdf(documentDefinition).open();
  }

  arAdjustmentPostingReportByCustomerReport(customerIds: string[], reportData: any[]): any {
    var page = 'X';
    var postingMonth = 'X';
    var date = 'X';
    var name = 'X';
    var customerType = 'X';
    var customerId = 'X';
    var customersTotal = 'X';
    var grandTotals = 0;
    var reportDate = this.getCurrentDate();
    var twoDigitFormat = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    var fourDigitFormat = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });

    let contents = []
    contents.push( {
      columns: [{ width: '100%', text: 'Date : ' + new Date().toLocaleDateString(), alignment: 'right', style: 'defaultStyle' }]
    });
    contents.push({
      columns: [
        { width: '30%', text: 'AR Adjustment Posting Report By Customer', alignment: 'left', style: 'defaultStyle' },
      ]
    });

    // contents.push(
    //   {
    //     columns: [
    //       { width: '10%', text: postingMonth, alignment: 'left', style: 'defaultStyle' },
    //       { width: '10%', text: date, alignment: 'left', style: 'defaultStyle' },
    //     ]
    //   });
    // contents.push(
    //   {
    //     columns: [
    //       { width: '10%', text: name, alignment: 'left', style: 'defaultStyle' },
    //     ]
    //   });

    // Iterate through each customer Id
    let totalAmount = 0;
    customerIds.forEach((element: any) => {
      console.log(element);
      let reportDataGridItems: any[] = [];

      let customerData = reportData.filter(data => data.customerId === element);
      let customerTypeTxt = '', customerNameTxt = '';
      let amount = 0;
      customerData.forEach(customer => {
        amount += customer.amount;
        let rowData = [
          { text: customer.companyCode, alignment: 'left', style: 'tableBodyStyle' },
          { text: customer.glRefCode, alignment: 'left', style: 'tableBodyStyle' },
          { text: customer.adjustmentId, alignment: 'left', style: 'tableBodyStyle' },
          { text: customer.date, alignment: 'left', style: 'tableBodyStyle' },
          { text: customer.description, alignment: 'left', style: 'tableBodyStyle' },
          { text: '$' + customer.amount, alignment: 'left', style: 'tableBodyStyle' }
        ];
        customerNameTxt = customer.name;
        customerTypeTxt = customer.customerType;
        reportDataGridItems.push(rowData);
      });
      let totalAmountRow = [
        { text: '', alignment: 'left', style: 'tableBodyStyle' },
        { text: '', alignment: 'left', style: 'tableBodyStyle' },
        { text: '', alignment: 'left', style: 'tableBodyStyle' },
        { text: '', alignment: 'left', style: 'tableBodyStyle' },
        { text: 'Customer Totals : ', alignment: 'right', style: 'tableBodyStyle' },
        { text: '$' + amount, alignment: 'left', style: 'tableBodyStyle' },
      ];
      grandTotals += amount;
      reportDataGridItems.push(totalAmountRow);
      contents.push({
        columns: [
          {width: '20%', text: 'Name: ' + customerNameTxt, alignment: 'left', style: 'defaultStyle' }
        ]
      });
      contents.push({
        columns: [
          { width: '10%', text: 'Customer Type : ' + customerTypeTxt, alignment: 'left', style: 'defaultStyle' },
          { width: '20%', text: 'Customer Id : ' + element, alignment: 'left', style: 'defaultStyle' },
        ]
      });
      contents.push(
        {
          columns: [
            {
              table: {
                widths: ['10%', '10%', '10%', '10%', '30%', '20%'],
                body: [
                  [
                    { text: 'Company Cd', alignment: 'left', style: 'tableHeaderStyle' },
                    { text: 'GI Ref Code', alignment: 'left', style: 'tableHeaderStyle' },
                    { text: 'Adj. ID', alignment: 'left', style: 'tableHeaderStyle' },
                    { text: 'Date', alignment: 'left', style: 'tableHeaderStyle' },
                    { text: 'Description', alignment: 'left', style: 'tableHeaderStyle' },
                    { text: 'Amount', alignment: 'left', style: 'tableHeaderStyle' }
                  ]
                ].concat(reportDataGridItems)
              },
              layout: 'lightHorizontalLines'
            }
          ]
        });
    });

    contents.push(
      {
        columns: [
          { width: '10%', text: '', alignment: 'left', style: 'tableBodyStyle' },
          { width: '10%', text: '', alignment: 'left', style: 'tableBodyStyle' },
          { width: '10%', text: '', alignment: 'left', style: 'tableBodyStyle' },
          { width: '10%', text: '', alignment: 'left', style: 'tableBodyStyle' },
          { width: '30%', text: 'Grand Totals : ', alignment: 'right', style: 'defaultStyle' },
          { width: '20%', text: '$' + grandTotals, alignment: 'left', style: 'defaultStyle' },
        ]
      });

    var documentDefinition = {
      pageSize: 'LEGAL',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
      header: function (page: any, pages: any) {
        return {
          columns: [
            { width: '100%', alignment: 'right', text: "Page " + page.toString() + " of " + pages.toString(), style: 'defaultStyle' }
          ],
          margin: [800, 40, 40, 50]
        };
      },
      content: contents,
      styles: {
        tableHeaderStyle: {
          bold: true,
          color: 'black',
          fontSize: 10,
        },
        tableFooterStyle: {
          bold: true,
          color: 'black',
          fontSize: 10,
        },
        tableBodyStyle: {
          color: 'black',
          fontSize: 10,
        },
        headerStyle: {
          bold: true,
          color: 'black',
          fontSize: 12,
        },
        defaultStyle: {
          color: 'black',
          fontSize: 10,
        }
      }
    }

    this.pdf = pdfMake;
    this.pdf.createPdf(documentDefinition).open();
  }

  public printCashBatchPostingByCustomer(arCashReceipts: ArCashReceipt[]): any {
    const dataGridItems: any[] = arCashReceipts.map((arCashReceipt: ArCashReceipt) => {
      return [
        { text: arCashReceipt.transDate, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transNo, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transReceiptDate, alignment: "left", style: "tableBodyStyle" },
        { text: '$' + arCashReceipt.transAmt, alignment: "left", style: "tableBodyStyle" }
      ];
    });

    const documentDefinition = this.getDocumentDefinition(dataGridItems);

    this.pdf = pdfMake;
    this.pdf.createPdf(documentDefinition).open();
  }

  public printCashPostingSummary(arCashReceipts: ArCashReceipt[]): any {
    const dataGridItems: any[] = arCashReceipts.map((arCashReceipt: ArCashReceipt) => {
      return [
        { text: arCashReceipt.transDate, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transNo, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transReceiptDate, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transAmt, alignment: "left", style: "tableBodyStyle" }
      ];
    });

    const documentDefinition = this.getDocumentDefinition(dataGridItems);

    this.pdf = pdfMake;
    this.pdf.createPdf(documentDefinition).open();
  }

  public printCashReportByCustomer(arCashReceipts: ArCashReceipt[]): any {
    const dataGridItems: any[] = arCashReceipts.map((arCashReceipt: ArCashReceipt) => {
      return [
        { text: arCashReceipt.transDate, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transNo, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transReceiptDate, alignment: "left", style: "tableBodyStyle" },
        { text: arCashReceipt.transAmt, alignment: "left", style: "tableBodyStyle" }
      ];
    });

    const documentDefinition = this.getDocumentDefinition(dataGridItems);

    this.pdf = pdfMake;
    this.pdf.createPdf(documentDefinition).open();
  }

  private getDocumentDefinition(dataGridItems: any[]) {
    var reportDate = this.getCurrentDate();
    return {
      pageSize: "LEGAL",
      pageOrientation: "landscape",
      pageMargins: [40, 60, 40, 60],
      header: function (page: any, pages: any) {
        return {
          columns: [
            {
              width: "40%",
              text: reportDate,
              alignment: "left",
              style: "defaultStyle",
            },
            {
              width: "35%",
              alignment: "left",
              text: "Page " + page.toString() + " of " + pages.toString(),
              style: "defaultStyle",
            },
          ],
          margin: [800, 40, 40, 50],
        };
      },
      content: [
        {
          columns: [
            {
              table: {
                widths: ["10%", "10%", "10%", "10%"],
                body: [
                  [
                    {
                      text: "Check Date",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "Check Number",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "Check Receive Date",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    },
                    {
                      text: "Check Amt",
                      alignment: "left",
                      style: "tableHeaderStyle",
                    }
                  ],
                ].concat(dataGridItems),
              },
              layout: "lightHorizontalLines",
            },
          ],
        },
      ],
      styles: {
        tableHeaderStyle: {
          bold: true,
          color: "black",
          fontSize: 10,
        },
        tableFooterStyle: {
          bold: true,
          color: "black",
          fontSize: 10,
        },
        tableBodyStyle: {
          color: "black",
          fontSize: 10,
        },
        headerStyle: {
          bold: true,
          color: "black",
          fontSize: 12,
        },
        defaultStyle: {
          color: "black",
          fontSize: 10,
        },
      },
    };
  }
}
