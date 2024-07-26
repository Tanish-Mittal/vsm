import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceAdvisor } from '../../model/service-advisor';
import { ServiceAdvisorService } from '../../services/service-advisor.service';

@Component({
  selector: 'app-service-advisor',
  templateUrl: './service-advisor.component.html',
  styleUrl: './service-advisor.component.css'
})
export class ServiceAdvisorComponent implements OnInit {
  allServiceAdvisors: ServiceAdvisor[] = [];
  upServiceAdvisor: ServiceAdvisor | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  Search_id: string;
  search: number = 2;

  constructor(private serviceAdvisorService: ServiceAdvisorService) {}

  ngOnInit(): void {
    this.allServiceAdvisors = this.serviceAdvisorService.getAllServiceAdvisors();
  }

  create() {
    this.search = 2; 
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    let serviceAdvisor: ServiceAdvisor = {
      serviceAdvisorID: form.value.serviceAdvisorID,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password,
      phone: form.value.phone,
      email: form.value.email,
    };
    this.serviceAdvisorService.createServiceAdvisor(serviceAdvisor);
    this.Create = false;
  }

  delete(id: string) {
    this.search = 2; 
    this.Search_id = null;
    this.serviceAdvisorService.deleteServiceAdvisorById(id);
  }

  update(id: string) {
    this.search = 2; 
    this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upServiceAdvisor = this.getServiceAdvisorById(id);
    } else {
      this.serviceAdvisorService.updateServiceAdvisor(this.upServiceAdvisor);
    }
  }

  getServiceAdvisorById(id: string): ServiceAdvisor {
    let serviceAdvisor: ServiceAdvisor;
    for (let i = 0; i < this.allServiceAdvisors.length; i++) {
      if (this.allServiceAdvisors[i].serviceAdvisorID === id) {
        serviceAdvisor = this.allServiceAdvisors[i];
        break;
      }
    }
    return serviceAdvisor;
  }

  Search() {
    this.upServiceAdvisor = this.serviceAdvisorService.getServiceAdvisorById(this.Search_id);
    if (this.upServiceAdvisor != undefined) this.search = 0;
    else this.search = 1;
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }
}