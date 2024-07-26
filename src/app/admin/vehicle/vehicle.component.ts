import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit{
  allVehicles:Vehicle[]=[];
  upVehicle:Vehicle|undefined;
  isEdit:boolean=false;
  Create:boolean=false;
  Search_id:number;
  search:number=2;
  constructor(private vehicleService:VehicleService){}
  ngOnInit(): void {
    this.allVehicles=this.vehicleService.getAllVehicels();
  }
  create(){
    this.search=2;this.Search_id=null;
    this.Create=true;
  }
  submit(form:NgForm){
    let vehicle:Vehicle={
      vehicleID:form.value.vehicleId,
      company: form.value.company,
      model: form.value.model,
      year: form.value.year,
      vin: form.value.vin,
      customerID: form.value.customerId,
      serviceDueDate: form.value.serviceDueDate,
      status:form.value.status,
      
    };
    //form.reset();
    this.vehicleService.createVehicle(vehicle);
    this.Create=false;
  }
  delete(id:number){
    this.search=2;this.Search_id=null;
    this.vehicleService.deleteVehicleById(id);
  }
  update(id:number){
    this.search=2;this.Search_id=null;
    this.isEdit=!this.isEdit;
   if(this.isEdit==true) 
   this.upVehicle=this.getVehicleById(id);
  else{
    this.vehicleService.updateVehicle(this.upVehicle);
  }

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
   Search(){
    this.upVehicle=this.vehicleService.getVehicleById(this.Search_id);
    if(this.upVehicle!=undefined)this.search=0;
    else this.search=1;
   }
   close(){
    this.search=2;
    this.Search_id=null;
   }
}
