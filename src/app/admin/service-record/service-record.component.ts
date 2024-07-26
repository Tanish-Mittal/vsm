import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceRecord } from '../../model/service-record';
import { ServiceRecordService } from '../../services/service-record.service';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../model/vehicle';


@Component({
  selector: 'app-service-record',
  templateUrl: './service-record.component.html',
  styleUrl: './service-record.component.css'
})

export class ServiceRecordComponent implements OnInit {
  allServiceRecords: ServiceRecord[] = [];
  upServiceRecord: ServiceRecord | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  Search_id: number | null = null;
  search: number = 2;

  constructor(private serviceRecordService: ServiceRecordService,private vehicleService:VehicleService) {}

  ngOnInit(): void {
    this.allServiceRecords = this.serviceRecordService.getAllServiceRecords();
  }

  create() {
    this.search = 2;
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    const serviceRecord: ServiceRecord = {
      serviceRecordID: form.value.serviceRecordID,
      vehicleID: form.value.vehicleId,
      serviceAdvisorID: form.value.serviceAdvisorId,
      serviceDate: form.value.serviceDate,
      status: form.value.status,
    };
    this.serviceRecordService.createServiceRecord(serviceRecord);
    this.updateVehicle(serviceRecord.vehicleID,serviceRecord.status);
    this.Create = false;
  }

  delete(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.serviceRecordService.deleteServiceRecordById(id);
  }

  update(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upServiceRecord = this.serviceRecordService.getServiceRecordById(id);
    } else {
      if (this.upServiceRecord) {
        this.serviceRecordService.updateServiceRecord(this.upServiceRecord);
        this.updateVehicle(this.upServiceRecord.vehicleID,this.upServiceRecord.status);
      }
    }
  }

  getServiceRecordById(id: number): ServiceRecord{
    return this.serviceRecordService.getServiceRecordById(id);
  }

  Search() {
    this.upServiceRecord = this.serviceRecordService.getServiceRecordById(this.Search_id || 0);
    this.search = this.upServiceRecord ? 0 : 1;
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }
  updateVehicle(v_id:number,st:string){
    let v:Vehicle=this.vehicleService.getVehicleById(v_id);
    v.status=st;
    this.vehicleService.updateVehicle(v);
  }
}
