import React,{useState} from 'react';
import { Meta, Story } from '@storybook/react';
import { TheTable,TheTableProps  } from '../src';
// import DATA from '../vars/MOCK_TABLE.json'
import {header,sample_payment} from '../vars/vars'


const meta: Meta = {
  title: 'Welcome',
  component: TheTable,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TheTableProps> = args => <TheTable {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
const validate=(prev:any,current:any)=>{
  //  if(current.name!=="john"){
  //   setError({name:"name",error:"not john"})
  //    return false
  //  } 

  //  setError({name:"",error:""})
   return true
  }


  const saveChanges=(prev:any,current:any)=>{
  console.log("saving ...",current,prev)
  }
  
  const deleteRow=(current:any)=>{
  // console.log("delteing current ,",current)
  // setError({name:"name",error:"not john"})
  }

  const clearError=()=>{
    // setError({name:"",error:""})
    }
Default.args = {rows:sample_payment,header,update:true,clearError,deleteRow,saveChanges,validate};
