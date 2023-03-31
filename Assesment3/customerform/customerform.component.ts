import { Component,OnInit } from '@angular/core';
import { AbstractControl,FormGroup,FormControl,Validators,FormsModule,FormArray,FormBuilder } from '@angular/forms';
import validation from '../Shared/validation';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.css']
})
export class CustomerformComponent {
  form:FormGroup=new FormGroup({
    
    companyname:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    amount:new FormControl('')
  });

  submitted=false;
  constructor(private fb:FormBuilder){}

  ngOnInit():void{
    this.form=this.fb.group({
      companyname:['',[Validators.required,Validators.minLength(4),Validators.maxLength(40)]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      skills:this.fb.array([]),
      amount:['',[Validators.required,Validators.min(0)]]
    },
    );
  }

  get f():{[key:string]:AbstractControl}
  {
    return this.form.controls;
  }

  get skillsForms() {
    return this.form.get('skills') as FormArray;
  }

  addSkillFormGroup() {
    this.skillsForms.push(
      this.fb.group({
        machine: [''],
        amount: ['0']
      })
    );
  }

  removeskillFormGroup(index: number) {
    this.skillsForms.removeAt(index);
  }


  onSubmit():void{
    this.submitted=true;
    console.log('onsubmit called');
    console.log(this.form.value);
    
    if(this.form.invalid)
    return
    console.log(JSON.stringify(this.form.value,null,2));
    
  }

  onReset():void{
    this.submitted=false;
    this.form.reset();
  }
}