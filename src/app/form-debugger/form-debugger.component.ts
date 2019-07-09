import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-debugger',
  templateUrl: './form-debugger.component.html',
  styleUrls: ['./form-debugger.component.css']
})
export class FormDebuggerComponent {

  @Input() form: any;
  constructor() {
  }

}
