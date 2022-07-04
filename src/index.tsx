// import React, { FC, HTMLAttributes, ReactChild } from 'react';

// export interface Props extends HTMLAttributes<HTMLDivElement> {
//   /** custom content, defaults to 'the snozzberries taste like snozzberries' */
//   children?: ReactChild;
// }

// // Please do not use types off of a default export module or else Storybook Docs will suffer.
// // see: https://github.com/storybookjs/storybook/issues/9556
// /**
//  * A custom Thing component. Neat!
//  */
// export const Thing: FC<Props> = ({ children }) => {
//   return <div>{children || `the snozzberries taste like snozzberries`}</div>;
// };

import React,{useState} from 'react'
import { useCountdownTimer } from 'use-countdown-timer';
import { mainRow } from './components/tableparts/tableRows';
import { ErrorState } from './components/TheTable/utils/types';
import { UndoModal } from './components/tableparts/UndoModal';


export interface TheTableProps {
rows:any[]
error:ErrorState
update:boolean
header:{name:string,prop:string}[]
validate: (prev: any, current: any) => boolean
saveChanges: (prev: any, current: any) => void
deleteRow: (current: any) => void
}

export const TheTable: React.FC<TheTableProps> = (
  {rows,
  error,
  update,
  header,
  validate,
  saveChanges,
  deleteRow
}
  ) => {


const data = rows;
const [editIdx, setEditIdx] = useState(-1);
const [before, setBefore] = useState<any>({});
const [input, setInput] = useState<any>();

const { countdown, start,reset} = useCountdownTimer({timer: 1000 * 5,resetOnExpire:true});


 //@ts-ignore
 const handleChange = (e, item) => {
   const { value } = e.target;

   setInput({
     ...input,
     [e.target.id]: value

   });
 };

 //convert row from td cell to input to start editing
 const startEditing = (index: number) => {
   if (index === -23) {
     setEditIdx(-23);
   } else {
     setEditIdx(index);
   }
//copy the row selected to before to compare to changes in input
 data?.map((row:any, j:number) => (j === index ? setBefore(row) : row));
 data?.map((row:any, j:number) => (j === index ? setInput(row) : row));

};

 const removeItem = (index: number) => {
   if (index === -69) {
     setEditIdx(-1);
   } else {
     setEditIdx(-1);
     deleteRow(input)
     data?.splice(index, 1);
     start()
   }
 };
 //restore item to the top of the list
 const undoRemove = () => {
   reset()
   data?.unshift(input);
 };

 //save the edits to db
 const stopEditing = async (index: number) => {
    if(validate(before,input)){
     data?.splice(index, 1,input);
    setEditIdx(-1);
    saveChanges(before,input)
   
   }
  
  //  if(index!==9){
  //   setError({name:"date",error:"deeznuts"})
  //  }
 };


return (
    <div className="w-full h-full">
  <div className="w-full h-full overflow-x-scroll lg:overflow-x-hidden">
        <table border={1} className="table-auto  border-slate-600 h-full w-full">
          <thead className="p-5 w-screen sticky top-0">
            <tr>
              {header &&
                header.map((x, i) => {
                  return <th key={x.name + i}
                  className="p-[12px] bg-slate-900 border-slate-900 border align-middle text-center text-white"
                  >{x.name}</th>;
                })}
              {update ? <th className=" bg-slate-900 opacity-100 text-white">Edit</th> : null}
            </tr>
          </thead>
          <tbody className="border-slate-800 border-2">
            {data &&
              data.map((dataitem:Object, dataindex:number) => {
                return mainRow(
                  dataindex,
                  dataitem,
                  header,
                  handleChange,
                  editIdx,
                  startEditing,
                  stopEditing,
                  removeItem,
                  input,
                  update,
                  error
                );
              })}
   
          </tbody>
        </table>
         {/* undo butto to restore removed row after edit */}
        {countdown!==5000? (
        <div className="fixed bottom-[10%] right-[10%] rounded-lg w-24 p-2  font-medium 
        hover:bg-purple-800 bg-slate-900">
          <UndoModal  undoRemove={undoRemove} countdown={countdown} />
        </div>
      ) : null}
      </div>

    </div>
);
}
