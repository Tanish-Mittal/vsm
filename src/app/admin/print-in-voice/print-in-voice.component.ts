import { Component, OnInit } from '@angular/core';
import { BillofmaterialService } from '../../services/billofmaterial.service';
import { ServiceRecordService } from '../../services/service-record.service';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkItemService } from '../../services/work-item.service';
import { ServiceRecord } from '../../model/service-record';
import { WorkItem } from '../../model/work-item';
import { BillOfMaterial } from '../../model/billof-material';
import { Vehicle } from '../../model/vehicle';

@Component({
  selector: 'app-print-in-voice',
  templateUrl: './print-in-voice.component.html',
  styleUrl: './print-in-voice.component.css'
})
export class PrintInVoiceComponent implements OnInit{
  v_id:number;
  vr:Vehicle;
  sr:ServiceRecord;
  wi:WorkItem[];
  bill:BillOfMaterial
  constructor(private billService:BillofmaterialService,private serviceRecordService:ServiceRecordService,private vehicleService:VehicleService,
    private router:Router,private activatedRoute:ActivatedRoute,private workItemService:WorkItemService
  ){
    this.v_id=parseInt(activatedRoute.snapshot.paramMap.get('id'),10);
  }
  ngOnInit(): void {
   // this.sr=this.serviceRecordService.getAllServiceRecords().find(x=>x.vehicleID===this.v_id);
   this.sr = this.serviceRecordService.getServiceRecordByVId(this.v_id);
   
   this.wi=this.workItemService.getWorkItemBySRId(this.sr.serviceRecordID);
   
    this.bill=this.billService.getBillOfMaterialBySRId(this.sr.serviceRecordID);
   this.vr=this.vehicleService.getVehicleById(this.v_id);
  }
  dispatch(){
    this.vr.status="Dispatched";
    this.vehicleService.updateVehicle(this.vr);
    this.sr.status="Dispatched";
    this.serviceRecordService.updateServiceRecord(this.sr);
    this.router.navigate(["/admin/dashboard"]);
  }

}
