import { Injectable } from '@angular/core';
import { ServiceRecord } from '../model/service-record';


@Injectable({
  providedIn: 'root'
})
export class ServiceRecordService {
  allServiceRecords:ServiceRecord[]=[
    {
      serviceRecordID: 1,
      vehicleID: 1,
      serviceDate: new Date('2024-07-16'),
      serviceAdvisorID: "1",
      status: 'Serviced'
    },
    {
      serviceRecordID: 2,
      vehicleID: 2,
      serviceDate: new Date('2024-07-17'),
      serviceAdvisorID: "2",
      status: 'Under Servicing'
    }
  ];
  constructor() { }
  getAllServiceRecords(){
    return this.allServiceRecords;
  }
  createServiceRecord(sa:ServiceRecord){
    sa.serviceRecordID=this.gtRandomTaskId();
    this.allServiceRecords.push(sa);
    console.log(this.allServiceRecords);
  }
  deleteServiceRecordById(id:number){
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceRecordID==id)
       { this.allServiceRecords.splice(i,1);
        break;
       }
    }
  }
  getServiceRecordById(id:number):ServiceRecord{
    let sa:ServiceRecord;
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceRecordID==id)
       {
         sa=this.allServiceRecords[i];break;
       }  
    }
    return sa;
  }
  updateServiceRecord(sa:ServiceRecord){
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceRecordID==sa.serviceRecordID){
        this.allServiceRecords[i]=sa;
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
  getAllServiceRecordsBySAId(said:string):ServiceRecord[]{
    let s:ServiceRecord[]=[];
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].serviceAdvisorID==said && this.allServiceRecords[i].status==="Under Servicing"){
        s.push(this.allServiceRecords[i]);
      }
    }
    return s;
  }
  getServiceRecordByVId(id:number):ServiceRecord{
   let sr:ServiceRecord;
    for(let i=0;i<this.allServiceRecords.length;i++){
      if(this.allServiceRecords[i].vehicleID===id)
      {
        sr=this.allServiceRecords[i];break;
      }
    }
    
    return sr;
  }
 
}
