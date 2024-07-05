import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../services/model.service';


@Component({
  selector: 'app-dynamic-form-all',
  templateUrl: './dynamic-form-all.component.html',
  styleUrl: './dynamic-form-all.component.css'
})
export class DynamicFormAllComponent {

  model : any; 

  constructor(private modelService: ModelService){
    this.modelService.getModel().subscribe({
      next: (data) => {this.model = data;}
    });
  }
  
}
