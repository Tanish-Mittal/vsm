import { Component } from '@angular/core';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  allVehicles: Vehicle[]=[];
  due:boolean=false;
  underServicing:boolean=false;
  serviced:boolean=false;
  //select vehicle
  selectedVehicle: Vehicle;
  constructor(private vehicleService:VehicleService){
  }
  ngOnInit(): void {
    this.allVehicles=this.vehicleService.getAllVehicels();
    for(let i=0;i<this.allVehicles.length;i++){
      if(this.allVehicles[i].status=="Due")this.due=true;
      if(this.allVehicles[i].status=="Under Servicing")this.underServicing=true;
      if(this.allVehicles[i].status=="Serviced")this.serviced=true;
    }
  }
  //select vehicle
  onVehicleSelect(event: Event) {
    const selectedVehicleID = (event.target as HTMLSelectElement).value;
    if (selectedVehicleID) {
      this.selectedVehicle = this.allVehicles.find(vehicle => vehicle.vehicleID.toString() === selectedVehicleID) || null;
    }
  }

}
