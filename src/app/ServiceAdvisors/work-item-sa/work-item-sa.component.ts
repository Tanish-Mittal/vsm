import { Component, OnInit } from '@angular/core';
import { WorkItemService } from '../../services/work-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkItem } from '../../model/work-item';
import { NgForm } from '@angular/forms';
import { BillofmaterialService } from '../../services/billofmaterial.service';
import { BillOfMaterial } from '../../model/billof-material';
import { ServiceRecordService } from '../../services/service-record.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-work-item-sa',
  templateUrl: './work-item-sa.component.html',
  styleUrl: './work-item-sa.component.css'
})
export class WorkItemSaComponent implements OnInit{
  srId:number;
  close:boolean=false;
  upWorkItem: WorkItem | undefined;
  isEdit: boolean = false;
  constructor(private workItemService:WorkItemService,private activatedRoute:ActivatedRoute,private router:Router,
    private billServices:BillofmaterialService,private serviceRecordServices:ServiceRecordService,private vehicleServices:VehicleService
  ){
    this.srId=parseInt(activatedRoute.snapshot.paramMap.get('id'),10);
  }
  ngOnInit(): void {
    this.allworkItem=this.workItemService.getWorkItemBySRId(this.srId);
  }
  Create:boolean=false;
  allworkItem:WorkItem[]=[];
  create() {
   // this.search = 2;
   // this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    const workItem: WorkItem = {
      workItemID: form.value.workItemID,
      serviceRecordID: this.srId,
      itemName: form.value.itemName,
      quantity: form.value.quantity,
      cost: form.value.cost,
    };
    // form.reset();
    this.workItemService.createWorkItem(workItem);
    this.Create = false;
    this.allworkItem=this.workItemService.getWorkItemBySRId(this.srId);
  }
  delete(id: number) {
   // this.search = 2;
   // this.Search_id = null;
    this.workItemService.deleteWorkItemById(id);
    this.allworkItem=this.workItemService.getWorkItemBySRId(this.srId);
  }

  update(id: number) {
   // this.search = 2;
   // this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upWorkItem = this.getWorkItemById(id);
    } else {
      if (this.upWorkItem) {
        this.workItemService.updateWorkItem(this.upWorkItem);
      }
    }
   
  }

  getWorkItemById(id: number): WorkItem | undefined {
    return this.allworkItem.find(item => item.workItemID === id);
  }
  bom(){
    let sum:number=0;
    for(let i=0;i<this.allworkItem.length;i++){
      sum+=this.allworkItem[i].quantity*this.allworkItem[i].cost;
    }
    let bill:BillOfMaterial={
      billOfMaterialID: 0,
      serviceRecordID: this.srId,
      amount: sum
    }
    this.billServices.create(bill);
    console.log(sum);
    
    let v_id:number;
    let sr=this.serviceRecordServices.getServiceRecordById(this.srId);
    sr.status="Serviced";
    v_id=sr.vehicleID;
    this.serviceRecordServices.updateServiceRecord(sr);
    let vc=this.vehicleServices.getVehicleById(v_id);
    vc.status="Serviced";
    this.vehicleServices.updateVehicle(vc);
    this.close=true;
    return ;
  }

}
