import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TemplateService } from 'src/app/services/masterData/template.service';
import { Validators, Editor, Toolbar } from 'ngx-editor';


@Component({
  selector: 'app-template-add',
  templateUrl: './template-add.component.html',
  styleUrls: ['./template-add.component.css']
})
export class TemplateAddComponent {

  isEdit: boolean = false;
  isView: boolean = false;
  templateForm!: FormGroup;
  templateObj: any = null;

  editor!: Editor;
  html!: '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private templateService: TemplateService, private fb: FormBuilder, private location: Location, private route: ActivatedRoute,
    private router: Router) {
    this.templateForm = this.createForm();
    let routingUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    let id = this.route.snapshot.paramMap.get('id');
    
    console.log(routingUrl);
    if(routingUrl.includes('template-edit') && id != null || undefined){
      this.getTemplateById(id);
      this.isEdit = true;
    }
    else if(routingUrl.includes('template-view') && id != null || undefined){
      this.getTemplateById(id);
      this.templateForm.disable();
      this.isView = true;
    }
  }


  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get doc() { return this.templateForm.get('templateValue') }

  get control() { return this.templateForm.controls; }

  createForm() {
    return this.fb.group({
      templateValue: [{ value: null, disabled: false }, Validators.required]
    });
  }

  getTemplateById(id: any) {
    this.templateService.getTemplateById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.templateObj = res;
          this.control['templateValue'].patchValue(res.templateValue);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  clearForm() {
    this.templateForm.reset();
  }

  cancelBtn() {
    this.location.back();
  }

  submit() {
    if (this.templateForm.valid && this.templateObj.id != null) {
      this.templateService.updateTemplateById(this.templateObj.id, this.templateForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/master/template-list']);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      alert('fill mandate fields');
    }
  }

}
