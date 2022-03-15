import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'somecontet', template: `
  <div class="modal-header">
    <h4 class="modal-title">Are you sure?</h4>
    <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(true)">OK</button>
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(false)">Close</button>
  </div>
  `
  })
  export class NgbdModalContent {
  
    constructor(public activeModal: NgbActiveModal) { }
  }