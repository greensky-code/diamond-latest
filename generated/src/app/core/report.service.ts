/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
declare var pdfMake: any;


@Injectable()
export class ReportService {
    pdf: any;

    getCurrentDate(){
        return new Date().toLocaleDateString("en-IE", {month: "numeric", day: "numeric", year: "numeric" });
    }


    accumClaimsReportReport(): any {
        var reportDate = this.getCurrentDate();
        var twoDigitFormat = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        var fourDigitFormat = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        });
        var dataGridItems = [
            [
                 {text: "Value 1", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 2", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 3", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 4", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 5", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 6", alignment: 'left', style: 'tableBodyStyle'}
            ], 
            [
                 {text: "Value 1", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 2", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 3", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 4", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 5", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 6", alignment: 'left', style: 'tableBodyStyle'}
            ], 
            [
                 {text: "Value 1", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 2", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 3", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 4", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 5", alignment: 'left', style: 'tableBodyStyle'}, 
                 {text: "Value 6", alignment: 'left', style: 'tableBodyStyle'}
            ]
        ];

        var documentDefinition = {
            pageSize: 'LEGAL',
            pageOrientation: 'landscape',
            pageMargins: [ 40, 60, 40, 60 ],
            header: function(page: any, pages:any) {
                return {
                    columns: [
                        {width: '40%', text: reportDate, alignment: 'left', style: 'defaultStyle'},
                        {width: '35%', alignment: 'left', text: "Page " + page.toString() + " of " + pages.toString(), style: 'defaultStyle'}
                    ],
                    margin: [800, 40, 40, 50]
                };
            },
            content: [
                    {
                      columns: [



                      ]
                    }, 
                    {
                      columns: [


                      ]
                    }, 
                    {
                      columns: [


                      ]
                    }, 
                    {
                      columns: [
                               {width: '10%', text: 'The Following claims should be reviewed for possible manual Adjustment to the above members Accumulators:', alignment: 'left', style: 'defaultStyle'},
                      ]
                    }, 
                    {
                      columns: [




                      ]
                    }, 
                    {
                      columns: [




                      ]
                    }, 
                    {
                      columns: [




                      ]
                    }, 
                    {
                      columns: [




                      ]
                    }, 
                    {
                      columns: [



                      ]
                    }, 
                    {
                      columns: [
                               {width: '10%', text: 'The above Claim has credeted the follow benefit Accumulators in other benefit package', alignment: 'left', style: 'defaultStyle'},
                      ]
                    }, 
                    {
                      columns: [
                               {
                                 table: {
                                   widths: ['10%','10%','10%','10%','10%','10%'],
                                   body: [
                                        [
                                        {text: 'Group ID',alignment: 'left', style: 'tableHeaderStyle'}, 
                                        {text: 'Benefit Package ID',alignment: 'left', style: 'tableHeaderStyle'}, 
                                        {text: 'RULE ID',alignment: 'left', style: 'tableHeaderStyle'}, 
                                        {text: 'Accum Svc Date',alignment: 'left', style: 'tableHeaderStyle'}, 
                                        {text: 'Claim Amt',alignment: 'left', style: 'tableHeaderStyle'}, 
                                        {text: 'Claim Qty',alignment: 'left', style: 'tableHeaderStyle'}
                                        ]
                                   ].concat(dataGridItems)
                                 },
                                 layout: 'lightHorizontalLines'
                               }
                      ]
                    }, 

            ],
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

}