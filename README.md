# table-for-react 
<div align="center">
  
This is a basic react html table component with added functionality for doing database operations directly in the table 
@[**table-for-react**](https://github.com/tigawanna/table-for-react) <br>
It provides basic displaying ,sorting and editing of json as table rows.<br>
</div>





## Installation

```
npm install table-for-react
```

## Usage

```
import {TheTable } from 'table-for-react'
```
and in your app.tsx/app.js 
```
import '../node_modules/table-for-react/dist/tailwind.css'
```
The prop types are:

```
interface TheTableProps {
  rows:any[]
  header:{name:string,prop:string,type:string,editable:boolean}[]

  //optional props use ?. for fuctions before invoking them 
  update?:boolean
  sort?:boolean
  error?:{name:string,error:string}
  validate?: (prev: any, current: any) => boolean
  saveChanges?: (prev: any, current: any) => void
  deleteRow?: (current: any) => void
  clearError?: () => void
}
```

| prop | description | required   |
|------|-------------|------------|
| rows | array of row objects| yes |
| header | array of row description| yes |
| update | boolean:default false | no |
| sort  | boolean ;default false | no |
| error | onject with name and error strings| no |
|valiadte | function that handles row input validation after edits | no|
|saveChanges | function that will be called on submit if validation  passes , make database updates here| no |
| deleteRow | function that will be called on trash icon click | no |
| clearError | call this fuction to manually clear errors in edge cases | no |

&nbsp;

> Only **rows** and **header**  props are mandatory because the table could be simply used to display data with no row data updating required , for example when printing 

&nbsp;
### **rows:**
This prop takes an array of objects with each object being mapped to it's own row.

in this example 
``` [
  {"id":6,"name":"Aleen","age":92,"email":"apedrollo5@telegraph.co.uk","date":"27/09/2020"},
   {"id":7,"name":"Alison","age":22,"email":"apedo5@telegraph.co.re","date":"27/03/2020"}]
```
### **header:**
This prop is an array of objects that  will determine how the table columns are displayed, make sure to match them to the row object keys. id and date are needed and any date values should have the type set to date

- **name** : is what the header column will be called , changing this only affects what name is displayed on the header and doesn't affect table behaviour
- **prop** :this should be strictly what the database element is called 
- **type** :string defining the item type "string","number","date"and "id" id  being the row's unique key , 
  
- - Any item marked with id type will be mapped to the id prop for standardisation, if you pass in userId with the id prop you'll be able to access it as **item.id** in the item objects inside the save,update,delete and validate methods  
  
- - Date being any elements with dates.
  for now we're only checking for firebase time-stamps and the javascript date (new Date()) which are objects and not acceptable as react children so we have to parse them to their string equivalent with dayjs
  
  
  &nbsp;
- **editable** field determines if the item should be editable , for example dates should be system genrated and not user editable to enforce data integrity

 &nbsp;
```
export  const header=[
    {name:"PayId",prop:"paymentId",type:"string",editable:true},    
    {name:"Payment",prop:"payment",type:"string",editable:true},
    {name:"Date",prop:"date",type:"date",editable:false},
    {name:"MadeBy",prop:"madeBy",type:"string",editable:true},
    {name:"Shop",prop:"shopno",type:"string",editable:true},
    {name:"mode",prop:"paymentmode",type:"string",editable:true},
    ]
    
  ```




### **update:**
_optional default: false_ <br/>
You can hard code this value or pass it in with a hook to enable toggling to display edit icons.


```
  const [update, setUpdate] = useState(true);
```

### **sort:**
_optional default: false_ <br/>
set to true to display the table sorting icons

### **error:**
This props requires you to add a useState hook and pass in the error prop


```
const [error, setError] = useState({name:"",error:""});
This prop will be a function that will have access to the current row being edited and a copy before the edit began , handle validation here and return false and set an error if validation failed. this function is called after the ✔ icon after editing.
the error should be mapped to the respective field for example a check to ensure positive values in age field sould set an error like 
```


```
setError({name:"age",error:"age:"can't be negative"})
```


make sure to match the name prop to a key in the row object
```
  const validate=(prev:any,current:any)=>{
   
  if(current===prev){
    setError({name:"name",error:"nothing changed"})
     return false
   } 

   setError({name:"",error:""})
   return true
  }
```


### **saveChanges && deleteRow:**
This prop is a function that willget called if the validation passes
it has access to the prev and current , prev being a copy ofthe row object before the edit and current being the changed object which is what you might want to save as an update to the  database. delet row will delete the said row which why the unique id should be in the row object

```
  const saveChanges=(prev:any,current:any)=>{
  console.log("saving ...",current)
  }
  
  const deleteRow=(current:any)=>{
  console.log("delteing current ,",current)
  }
```

### **clearError**

```
  const clearError=()=>{
    setError({name:"",error:""})
    }
```
use this to clear any error that was unresloved when you cancel an update


## Styling

> The table has a position relative and top-0
> The thead component has a position sticky top-0

> Wrap the table component with  position absolute to make the header stick to the top

&nbsp;
```
    <div className="w-full h-full overflow-y-hidden">
    {/* <div className="p-[10%] bg-red-400 h-[40%]">top</div> */}
    <div className="absolute h-[60%] w-full z-40 bg-white">
     <TheTable
     rows={small_data}
     error={error}
     update={update}
     validate={validate}
     saveChanges={saveChanges}
     deleteRow={deleteRow}
     header={header}
     clearError={clearError}
     />
     </div>
    </div>
```

&nbsp;
the parent app component should look like 


```
import DATA from './MOCK_TABLE.json'
import { useState } from 'react';
// import { TheTable } from './components/TheTable/TheTable';
import {TheTable } from 'table-for-react'

const small_data =DATA.splice(0,)
function App() {
  const [update, setUpdate] = useState(true);
  const [error, setError] = useState({name:"",error:""});

  const header = [
    {
      name: "ID",
      prop: "theid",
      type:"id",
      editable:true
    },
    {
      name: "Name",
      prop: "name",
      type:"string",
      editable:true
    },
    {
      name: "Age",
      prop: "age",
      type:"number",
      editable:true
    },
    {
      name: "Email",
      prop: "email",
      type:"string",
      editable:true
    },
    {
      name: "Date",
      prop: "date",
      type:"date",
      editable:false
    }
  ];

  const validate=(prev:any,current:any)=>{
  //  if(current.name!=="john"){
  //   setError({name:"name",error:"not john"})
  //    return false
  //  } 

   setError({name:"",error:""})
   return true
  }


  const saveChanges=(prev:any,current:any)=>{
  console.log("saving ...",current,prev)
  }
  
  const deleteRow=(current:any)=>{
  // console.log("delteing current ,",current)
  setError({name:"name",error:"not john"})
  }

  const clearError=()=>{
    setError({name:"",error:""})
    }

  return (
    <div className="w-full h-full overflow-y-hidden">
    {/* <div className="p-[10%] bg-red-400 h-[40%]">top</div> */}
    <div className="absolute h-[60%] w-full z-40 bg-white">
     <TheTable
     rows={small_data}
     header={header}

     //optional
     error={error}
     update={update}
     sort={true}
     validate={validate}
     saveChanges={saveChanges}
     deleteRow={deleteRow}
     clearError={clearError}
     />
     </div>
    </div>
  );
}

export default App;


```

### [for example usage](https://github.com/tigawanna/table-for-react-example)

### **resource that helped:**
#### [tsdx setup with tailwindcss](https://zach.codes/build-your-own-flexible-component-library-using-tsdx-typescript-tailwind-css-headless-ui/)

#### [editable table rows](https://www.youtube.com/watch?v=wi_vD0Yvc0g&t=184s)


##  Support and contribution 
Am just getting started and have no particular framework for contributio so opening an issue or a pull request in contribute branch will work for now @ [table-for-react](https://github.com/tigawanna/tigawanna/table-for-reac) 




## License
MIT licence 
[licence](https://github.com/tigawanna/table-for-react/blob/master/LICENSE)

Created and maintained by [Tigawanna](https://github.com/tigawanna/tigawanna) 
