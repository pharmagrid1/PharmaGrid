import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";



@Component({
    selector:'app-login',
    standalone:true,
    imports:[CommonModule,ReactiveFormsModule,RouterLink],
    templateUrl:'./login.html',
    styleUrl:'./login.scss'
})

export class Login{
    form;
    error='';
    loading=false;

    constructor(private fb: FormBuilder, private auth:AuthService, private router:Router){
        this.form=this.fb.group({
            email:['', [Validators.required, Validators.email]],
            password:['', Validators.required]
        });
    }

    submit(){
        if(this.form.invalid) return;
        this.loading=true;
        this.error='';

        this.auth.login(this.form.value as any).subscribe({
            next:()=> this.router.navigate(['/']),
            error:(err)=>{
                this.error=err.error?.message || 'Login failed';
                this.loading=false;
                
            }
        });
    }
}