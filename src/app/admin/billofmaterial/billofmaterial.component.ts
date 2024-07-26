import { Component, OnInit } from '@angular/core';
import { BillOfMaterial } from '../../model/billof-material';
import { BillofmaterialService } from '../../services/billofmaterial.service';
import { ServiceRecordService } from '../../services/service-record.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-billofmaterial',
  templateUrl: './billofmaterial.component.html',
  styleUrl: './billofmaterial.component.css'
})
export class BillofmaterialComponent implements OnInit{
  allBillOfMaterials: BillOfMaterial[] = [];
  upBillOfMaterial: BillOfMaterial | undefined;
  Search_id: number | null = null;
  search: number = 2;

  constructor(private billOfMaterialService: BillofmaterialService) { }

  ngOnInit(): void {
    this.allBillOfMaterials = this.billOfMaterialService.getAllBillOfMaterials();
  }

  delete(id: number): void {
    this.search = 2;
    this.Search_id = null;
    this.billOfMaterialService.deleteBillOfMaterialById(id);
    this.allBillOfMaterials = this.billOfMaterialService.getAllBillOfMaterials();
  }

  Search(): void {
    this.upBillOfMaterial = this.billOfMaterialService.getBillOfMaterialById(this.Search_id!);
    this.search = this.upBillOfMaterial ? 0 : 1;
  }

  close(): void {
    this.search = 2;
    this.Search_id = null;
  }
}
