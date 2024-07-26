import { Injectable } from '@angular/core';
import { WorkItem } from '../model/work-item';
import { ServiceAdvisor } from '../model/service-advisor';

@Injectable({
  providedIn: 'root'
})
export class WorkItemService {
  allWorkItems:WorkItem[]=[
    {
      workItemID: 1,
      serviceRecordID:1,
      itemName: 'Engine Oil',
      cost: 50.00,
      quantity:1
    },
    {
      workItemID: 2,
      serviceRecordID:2,
      itemName: 'Fuel Filter',
      cost: 20.00,
      quantity:2
    }
  ];
  constructor() { }
  getAllWorkItems():WorkItem[]{
    return this.allWorkItems;
  }
  getWorkItemById(id:number):WorkItem{
   let workItem:WorkItem;
    for(let i=0;i<this.allWorkItems.length;i++){
      if(this.allWorkItems[i].workItemID==id)
       {
        workItem=this.allWorkItems[i];break;
       }
    }
    return workItem;
  }
  createWorkItem(work:WorkItem){
    work.workItemID=this.gtRandomTaskId();
    this.allWorkItems.push(work);
  }
  deleteWorkItemById(id:number){
    for(let i=0;i<this.allWorkItems.length;i++){
      if(this.allWorkItems[i].workItemID==id)
       { this.allWorkItems.splice(i,1);
        break;
       }
    }
  }
  updateWorkItem(workItem:WorkItem){
    for(let i=0;i<this.allWorkItems.length;i++){
      if(this.allWorkItems[i].workItemID==workItem.workItemID){
        this.allWorkItems[i]=workItem;break;
      }
  }
  }
  gtRandomTaskId():number {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<4;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return parseInt(result,10);
  }
  getWorkItemBySRId(id:number):WorkItem[]{
    let work:WorkItem[]=[];
    for(let i=0;i<this.allWorkItems.length;i++){
      if(this.allWorkItems[i].serviceRecordID==id){
        work.push(this.allWorkItems[i]);
      }
    }
    return work;
  }
}
