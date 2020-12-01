export default [
  {
    id: '1',
    text: "My Files",
    type: "Folder",
    children: [
      {
        id: '1.1',
        text: "Labels",
        type: "Folder",
        children: [
          {
            id: '1.1.1',
            text: "Labels-1",
            type: "File",
            extension:'docx',
            path:'http://www.africau.edu/images/default/sample.pdf'
          }
        ]
      },
      {
        id: '1.2',
        text: "Office",
        type: "Folder",
        children: [
          {
            id: '1.2.1',
            text: "Accounting",
            type: "Folder",
            children: [
              {
                id: '1.2.1.1',
                text: "Accounting-1",
                type: "File",
                extension:'ppt',
                children: [],
                path:'https://www.escaux.com/rsrc/EscauxCustomerDocs/DRD_T38Support_AdminGuide/T38_TEST_PAGES.pdf'
              }
            ]
          },
          {
            id: '1.2.2',
            text: "Excel2013",
            type: "File",
            extension:'excel',
            children: [],
            path:'https://app.printnode.com/testpdfs/multipage.pdf'
          }
        ]
      },
      {
        id: '1.3',
        text: "PDF Docs",
        type: "Folder",
        children: [
          {
            id: '1.3.1',
            text: "PDF-1",
            type: "File",
            extension:'pdf',
            children: [],
            path:'http://media.pragprog.com/titles/ktuk/excerpts.pdf'
          }
        ]
      },
      {
        id: '1.4',
        text: "Users",
        type: "Folder",
        children: [
          {
            id: '1.4.1',
            text: "User-1",
            type: "File",
            extension:'txt',
            children: [],
            path:'http://media.pragprog.com/titles/ktuk/excerpts.pdf'
          }
        ]
      },
    ]
  }
];
