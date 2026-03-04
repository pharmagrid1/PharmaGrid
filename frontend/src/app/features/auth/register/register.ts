import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { email } from "@angular/forms/signals";


@Component({
    selector:'app-register',
    standalone:true,
    imports:[CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl:'./register.html',
    styleUrl:'./register.scss'

})
export class Register{
    form;
    error='';
    loading=false;

    constructor(private fb: FormBuilder, private auth: AuthService, private router : Router){
        this.form=this.fb.group({
            full_name:['', Validators.required],
            email:['',[Validators.required, Validators.email]],
            password:['',[Validators.required, Validators.minLength(6)]]
        });
    }

    submit(){
        if(this.form.invalid) return;
        this.loading=true;
        this.error='';

        this.auth.register(this.form.value as any).subscribe({
            next:()=>this.router.navigate(['/']),
            error:(err)=>{
                this.error=err.error?.message || 'Registration failed';
                this.loading=false;
            }
        });
    }
}