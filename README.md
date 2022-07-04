# table-for-react 
<div align="center">
  
This is a basic react html table component with added functionality for doing database operations directly in the table[**table-for-react**](https://github.com/tigawanna/table-for-react) data <br>
It provides basic displaying ,sorting and editing of json as table rows.<br>
</div>





## Installation

Use npm to install this wrapper together with Handsontable.
```
npm install table-for-react
```

## Usage

```
import {TheTable } from 'table-for-react'
```

The prop types are:

```
interface TheTableProps {
rows:any[]
error:{name:string,error:string}
update:boolean
header:{name:string,prop:string}[]
validate: (prev: any, current: any) => boolean
saveChanges: (prev: any, current: any) => void
deleteRow: (current: any) => void
clearError: () => void
}
```

### **rows:**
This prop takes an array of objects with each object being mapped to it's own row.

in this example 
``` [
  {"id":6,"name":"Aleen","age":92,"email":"apedrollo5@telegraph.co.uk","date":"27/09/2020"},
   {"id":7,"name":"Alison","age":22,"email":"apedo5@telegraph.co.re","date":"27/03/2020"}]
```
> The object requires an unique id key preferably the same one used in the database,
> any date values should also have the type set to date in the header array , other fields are can be anyting else of  > type string or number
> 
```
   const header = [
    {
      name: "ID",
      prop: "id",
      type:"string"
    },
    {
      name: "Name",
      prop: "name",
      type:"string"
    },
    {
      name: "Age",
      prop: "age",
      type:"number"
    },
    {
      name: "Email",
      prop: "email",
      type:"string"
    },
    {
      name: "Date",
      prop: "date",
      type:"date"
    }
  ];
  ```

### **error:**
This props requires you to add a useState hook and pass in the error prop


```
const [error, setError] = useState({name:"",error:""});
```


### **update:**
You can hard code this value or pass it in with a hook to enable toggling to display edit icons.

```
  const [update, setUpdate] = useState(true);
```
### **header:**
This prop is an array of objects that  will determine how any header columns are displayed, make sure to match them to the row object keys. id and date are needed and any date values should have the type set to date

```
  const header = [
    {
      name: "ID",
      prop: "id",
      type:"string"
    },
    {
      name: "Name",
      prop: "name",
      type:"string"
    },
    {
      name: "Age",
      prop: "age",
      type:"number"
    },
    {
      name: "Email",
      prop: "email",
      type:"string"
    },
    {
      name: "Date",
      prop: "date",
      type:"date"
    }
  ];
  ```

### **validate:** 
This prop will be a function that will have access to the current row being edited and a copy before the edit began , handle validation here and return false and set an error if validation failed. this function is called after the ✔ icon after editing.

the error should be mapped to the respective field for example a check to ensure positive values in age field sould set an error like 

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

the parent app component should look like 

```
import DATA from './MOCK_TABLE.json'
import { useState } from 'react';
import { TheTable } from './components/TheTable/TheTable';
// import {TheTable } from 'table-for-react'

function App() {
  const [update, setUpdate] = useState(true);
  const [error, setError] = useState({name:"",error:""});

  const header = [
    {
      name: "ID",
      prop: "id",
      type:"string"
    },
    {
      name: "Name",
      prop: "name",
      type:"string"
    },
    {
      name: "Age",
      prop: "age",
      type:"number"
    },
    {
      name: "Email",
      prop: "email",
      type:"string"
    },
    {
      name: "Date",
      prop: "date",
      type:"date"
    }
  ];

  const validate=(prev:any,current:any)=>{
   if(current.name!=="john"){
    setError({name:"name",error:"not john"})
     return false
   } 

   setError({name:"",error:""})
   return true
  }


  const saveChanges=(prev:any,current:any)=>{
  // console.log("saving ...",current)
  }
  
  const deleteRow=(current:any)=>{
  // console.log("delteing current ,",current)
  setError({name:"name",error:"not john"})
  }

  const clearError=()=>{
    setError({name:"",error:""})
    }

  return (
    <div className="w-screen h-screen ">
     <TheTable
     rows={DATA}
     error={error}
     update={update}
     validate={validate}
     saveChanges={saveChanges}
     deleteRow={deleteRow}
     header={header}
     clearError={clearError}
     />
    </div>
  );
}

export default App;

```

### [for example usage](https://github.com/tigawanna/table-for-react-example)



##  Support and contribution 
Am just getting started and have no particular framework for contributio so opening an issue or a pull request will work for now @ [table-for-react](https://github.com/tigawanna/tigawanna/table-for-reac) 




## License
MIT licence 
[licence](https://github.com/tigawanna/table-for-react/blob/master/LICENSE)

Created and maintained by [Tigawanna](https://github.com/tigawanna/tigawanna) 
