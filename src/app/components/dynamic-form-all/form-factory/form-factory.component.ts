import { Component, OnInit, input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidationMessage } from '../../../interfaces/validation-message';
import { ValidatorNames } from '../../../enums/validator-names';
import  * as funs  from '../../../validation/similar-password';
import { SpecialRuleError } from '../../../interfaces/special-rule-error';
import { FileOutput } from '../../../interfaces/file-output';

@Component({
  selector: 'app-form-factory',
  templateUrl: './form-factory.component.html',
  styleUrl: './form-factory.component.css'
})
export class FormFactoryComponent implements OnInit {
  
  model = input.required<any>(); 
  form! : FormGroup;
  fields : any = [];
  validationMessages = new Map<string,Map<string,ValidationMessage>>();
  specialValidationMessages = new Map<string,SpecialRuleError[]>();

  constructor(private formBuilder: FormBuilder){}  
  
  ngOnInit(): void {
    const [formGroupFields,formLevelValidation]  = this.getFormControlsFields();
    this.form = this.formBuilder.group(formGroupFields,{ validators: formLevelValidation});
  }

  getFormControlsFields() : [{},ValidatorFn[]] {

    const formGroupFields = {};
    const formLevelValidation : ValidatorFn[] = [];
    const fields =   this.model().fields;
    const crossFieldValidation: [] =   this.model().cross_field_validation;


    Object.keys(fields).forEach((field)=>{

      const fieldProps = fields[field];     
      const validators = this.addValidators(fieldProps.rules, field ,fieldProps.label);     
       
      if(fieldProps.type === 'checkbox'){
       let array = fieldProps.options.map(e=> new FormControl(e.value)); 
       formGroupFields[field] = new FormArray(array,this.minSelectedCheckboxes(fieldProps.rules[ValidatorNames.minLength]));
      }  
      else{        
        formGroupFields[field] = 'array' in fieldProps && fieldProps.type === 'text' ? this.formBuilder.array(fieldProps.value?.length > 0 ? fieldProps.value.map(e => new FormControl(e)): ['']) :  [fieldProps.value,validators];
      };      

       this.fields.push({ ...fieldProps, fieldName: field });
       
    });

    if(crossFieldValidation){
      crossFieldValidation.forEach(element => {
        formLevelValidation.push(...this.addFormLevelValidators(element));        
      });
    }

    return [formGroupFields,formLevelValidation];
}

  addFormLevelValidators(specialRule: Object): ValidatorFn[] {
  
    let functionName : string = specialRule['function'];    
    let validationFn : ValidatorFn[] = []; 

   switch(functionName){
      case 'match': {
        let args: Parameters<typeof funs.match> = specialRule['parameters'];
        validationFn.push(funs.match(...args));

        specialRule['inputs'].forEach(input => {
           let fieldValidationArray = this.specialValidationMessages.get(input)?? [];
           fieldValidationArray.push({errorName:specialRule['errorName'],errorMsg: specialRule['errorMsg']})
           this.specialValidationMessages.set(input,fieldValidationArray);
        })
        
       }
    }
  
    return validationFn;
  }

private addValidators(rules : string[], fieldName : string, fieldLabel: string) {

  if (!rules) { return [];}

  const validators = Object.keys(rules).map((rule) => {

    switch (rule) {
      case ValidatorNames.required: {
        this.addValidationMessage(fieldName, ValidatorNames.required, `${fieldLabel} is required`);
        return Validators.required;
      }
      case ValidatorNames.minLength: {
       this.addValidationMessage(fieldName, ValidatorNames.minLength, `${fieldLabel} min length should be ${rules[ValidatorNames.minLength]} characters`);
        return Validators.minLength(rules[ValidatorNames.minLength]);
      }
      case ValidatorNames.email: {
        this.addValidationMessage(fieldName, ValidatorNames.email, `Please enter a correct email format`);
        return Validators.email;
      }
      default: {throw new Error('NoMatchFoundError')};      
    }

  });

   return validators;
}


addValidationMessage = (fieldName: string, type : string, message : string) =>{
  let fieldMap = this.validationMessages.get(fieldName) ?? new Map<string, ValidationMessage>();
  fieldMap?.set(type, { msg: message });
  this.validationMessages.set(fieldName, fieldMap);
}

minSelectedCheckboxes = (min : number = 1) : ValidatorFn =>{

  const validator: ValidatorFn = (formArray: AbstractControl) => {

    const totalSelected = (formArray as FormArray).controls    
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required : true };

  };

   return validator;
 }

 getKeys(map): string[]{
  return Array.from(map.keys());
}


setFormFileField(fileOutput: FileOutput) {
  this.form.get(fileOutput.fieldKey)?.setValue(fileOutput.file)
}

 onSubmit() {
  
  let data  = this.form.getRawValue();
  console.log(data)
  // read checkboxes array
  //let checkboxArray = data[this.checkboxName];
  // delete checkboxes array, need to replace it
  //delete data[this.checkboxName];

  // getting the check boxes object to get the ids
  //let checkboxOptions =  this.fields[this.checkboxIndex].options;
  // checkboxes object array the have the ids and the values
  //let checkBoxesObject : any = [];

  // creating checkboxes objects
 /* checkboxOptions.forEach((element,index) => {    
    checkBoxesObject.push( { "name" : element.id , "value" : checkboxArray[index]});
  });
  */

  // adding checkboxes object to the data to be subbmitted
  //data[this.checkboxName]  = checkBoxesObject;

  
  //delete data.repassword;
  let newUser = JSON.stringify(data);
  console.log(newUser)

  this.form.markAllAsTouched();
}


}


