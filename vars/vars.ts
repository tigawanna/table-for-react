
  

export  const header=[
  {name:"PayId",prop:"paymentId",type:"string",editable:true},    
  {name:"Payment",prop:"payment",type:"string",editable:true},
  {name:"Date",prop:"date",type:"date",editable:false},
  {name:"MadeBy",prop:"madeBy",type:"string",editable:true},
  {name:"Shop",prop:"shopnumber",type:"string",editable:true},
  {name:"mode",prop:"paymentmode",type:"string",editable:true},
  ]
  
  
  export const sample_payment =
  [
      {
          "date": {
              "seconds": 1628238863,
              "nanoseconds": 934000000
          },
          "paymentmode": "cash",
          "month": "August",
          "paymentId": "G-01ks03do3iground",
          "madeBy": "nimda",
          "payment": "20000",
          "floor": "ground",
          "shopnumber": "G-01"
      },
      {
          "date": {
              "seconds": 1628238851,
              "nanoseconds": 276000000
          },
          "paymentmode": "cash",
          "month": "August",
          "paymentId": "G-01ks03debwground",
          "madeBy": "nimda",
          "payment": "10000",
          "floor": "ground",
          "shopnumber": "G-01"
      },
      {
          "date":new Date(),
          "paymentmode": "cashino",
          "month": "August",
          "paymentId": "G-01ks03b7miground",
          "madeBy": "nimda",
          "payment": "20000",
          "floor": "ground",
          "shopnumber": "G-01"
      },
      {
        "date": "2022-07-09T08:55:47.156Z",
        "shopnumber": "G-01",
        "payment": 1000,
        "paymentId": "G-01l5dnjaauground",
        "madeBy": "Panda Mountain",
        "month": "July",
        "paymentmode": "cash"
    },
    {
        "date": "2022-07-09T08:56:11.770Z",
        "shopnumber": "G-01",
        "payment": 1000,
        "paymentId": "G-01l5dnjt12ground",
        "madeBy": "Panda Mountain",
        "month": "July",
        "paymentmode": "cash"
    },
    {
        "date": "2022-07-09T08:56:11.770Z",
        "shopnumber": "G-01",
        "payment": 1000,
        "paymentId": "G-01l5dnjt12ground",
        "madeBy": "Panda Mountain",
        "month": "July",
        "paymentmode": "cash"
    },
    {
        "date": "2022-07-09T08:56:11.770Z",
        "shopnumber": "G-01",
        "payment": 1000,
        "paymentId": "G-01l5dnjt12ground",
        "madeBy": "Panda Mountain",
        "month": "July",
        "paymentmode": "cash"
    }
  ]
  