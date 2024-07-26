import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  allVehicles:Vehicle[]=[
    {
      vehicleID: 1,
      company: 'Toyota',
      model: 'Camry',
      year: 2020,
      vin: '1HGBH41JXMN109186',
      customerID: 1,
      serviceDueDate: new Date('2024-07-20'),
      status:"Under Servicing"
    },
    {
      vehicleID: 2,
      company: 'Honda',
      model: 'Civic',
      year: 2018,
      vin: '2HGBH41JXMN109187',
      customerID: 2,
      serviceDueDate: new Date('2024-08-15'),
      status:"Due"
    }
  ];
  constructor() { }
  getAllVehicels():Vehicle[]{
    return this.allVehicles;
  }
  getVehicleById(id:number):Vehicle{
   let vehicle:Vehicle;
    for(let i=0;i<this.allVehicles.length;i++){
      if(this.allVehicles[i].vehicleID==id)
       {
        vehicle=this.allVehicles[i];break;
       }
    }
    return vehicle;
  }
  createVehicle(vehicle:Vehicle){
    vehicle.vehicleID=this.getRandomTaskId();
    this.allVehicles.push(vehicle);
  }
  deleteVehicleById(id:number){
    for(let i=0;i<this.allVehicles.length;i++){
      if(this.allVehicles[i].vehicleID==id)
       { this.allVehicles.splice(i,1);
        break;
       }
    }
  }
  updateVehicle(vehicle:Vehicle){
    for(let i=0;i<this.allVehicles.length;i++){
      if(this.allVehicles[i].vehicleID==vehicle.vehicleID){
        this.allVehicles[i]=vehicle;break;
      }
  }
  }
  getRandomTaskId():number {
    const characterSet="0123456789";
    let result="";
    for(let i=0;i<4;i++){
      result+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
    }
    return parseInt(result,10);
  }
}
