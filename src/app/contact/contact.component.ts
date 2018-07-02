import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../main.service";
import {Email, NewUser} from "./newuser.model";
import {Router} from "@angular/router";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  myForm: FormGroup;

  constructor(private mainService: MainService,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      phone: new FormControl(''),
      organization: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      image_url: new FormControl('')
    });
  }

  enrichContact() {
    // console.log(this.myForm.value);
    const user = new Email(this.myForm.value.email);
    this.spinnerService.show();
    this.mainService.enrichContact(user)
      .subscribe(
        data => {
          this.spinnerService.hide();
          // console.log(data);
          this.myForm = new FormGroup({
            firstname: new FormControl(this.myForm.value.firstname, Validators.required),
            lastname: new FormControl(this.myForm.value.lastname, Validators.required),
            email: new FormControl(this.myForm.value.email, [Validators.required,
              Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            phone: new FormControl(this.myForm.value.phone),
            organization: new FormControl(data.organization),
            title: new FormControl(data.title),
            description: new FormControl(data.bio),
            image_url: new FormControl(data.avatar)
          });
          this.toastr.success('Contact details fetched', 'Updated Contact!');
        },
        error => {
          console.error(error);
          if (error.status === 404) {
            this.spinnerService.hide();
            this.toastr.warning('Profile not found', 'No Profile!');
          }
          this.spinnerService.hide();
          this.toastr.error('Error from server', 'Error!');
        }
      );
  }

  saveContact() {
    // console.log(this.myForm.value);
    const user = new NewUser(this.myForm.value.firstname, this.myForm.value.lastname, this.myForm.value.email, this.myForm.value.phone, this.myForm.value.organization, this.myForm.value.title, this.myForm.value.description, this.myForm.value.image_url);
    this.spinnerService.show();
    this.mainService.addUser(user)
      .subscribe(
        data => {
          this.spinnerService.hide();
          this.toastr.success('New contact added', 'Contact Added!');
          this.router.navigateByUrl('/');
        },
        error => {
          console.error(error);
            this.spinnerService.hide();
            this.toastr.error('Error from server', 'Error!');
        }
      );
  }

}
