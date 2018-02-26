import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent {

  onAdd = new EventEmitter();
  btnEnb: boolean = false;
  imagesUploaded = [];
  albumName: string;

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(this.data);
  }

  // images uploaded successfully, push them to imagesUploaded
  // make them ready to transfer o parent component
  onUploadFinished(event) {
    this.btnEnb = false;
    this.imagesUploaded.push(event.file);
    console.log(event, 'image upload');
  }


  addMe() {
    if (this.albumName == undefined || this.albumName == "") {
    } else {
      let data: any = {};
      data.imagesUploaded = this.imagesUploaded;
      data.albumName = this.albumName;
      this.onAdd.emit(data);
    }
  }
}
