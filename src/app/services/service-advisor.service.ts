import { Injectable } from '@angular/core';
import { ServiceAdvisor } from '../model/service-advisor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceAdvisorService {
  allServiceAdvisors:ServiceAdvisor[]=[
    {
      serviceAdvisorID: "1",
      firstName: 'Alice',
      lastName: 'Smith',
      password:"1234",
      phone: '123-555-7890',
      email: 'alice.smith@example.com'
    },
    {
      serviceAdvisorID: "2",
      firstName: 'Bob',
      lastName: 'Johnson',
      password:"2345",
      phone: '456-555-1234',
      email: 'bob.johnson@example.com'
    }
  ];
  constructor(private authService:AuthService) { }
  getAllServiceAdvisors(){
    return this.allServiceAdvisors;
  }
  createServiceAdvisor(sa:ServiceAdvisor){
    sa.serviceAdvisorID=this.getRandomId();
    sa.password=this.getRandomTaskId().toString();
    this.allServiceAdvisors.push(sa);
    this.authService.createSA({userid:sa.serviceAdvisorID,password:sa.password});
  }
  deleteServiceAdvisorById(id:string){
    for(let i=0;i<this.allServiceAdvisors.length;i++){
      if(this.allServiceAdvisors[i].serviceAdvisorID===id)
       { this.allServiceAdvisors.splice(i,1);
        break;
       }
    }
    this.authService.deleteSA(id);
  }
  getServiceAdvisorById(id:string):ServiceAdvisor{
    let sa:ServiceAdvisor;
    for(let i=0;i<this.allServiceAdvisors.length;i++){
      if(this.allServiceAdvisors[i].serviceAdvisorID==id)
       {
         sa=this.allServiceAdvisors[i];break;
       }  
    }
    return sa;
  }
  updateServiceAdvisor(sa:ServiceAdvisor){
    for(let i=0;i<this.allServiceAdvisors.length;i++){
      if(this.allServiceAdvisors[i].serviceAdvisorID==sa.serviceAdvisorID){
        this.allServiceAdvisors[i]=sa;
      }
    }
    this.authService.createSA({userid:sa.serviceAdvisorID,password:sa.password});
  }
  getRandomTaskId():number {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<4;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return parseInt(result,10);
  }
  getRandomId():string {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<4;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    result+="sa";
    for(let i=0;i<4;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return result;
  }
}
