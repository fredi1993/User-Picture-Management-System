import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { SpinnerComponentModule } from 'ng2-component-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgDragDropModule } from 'ng-drag-drop';
import {NgxPaginationModule} from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { OrderModule } from 'ngx-order-pipe';
import { ImageUploadModule } from 'angular2-image-upload';


import {CdkTableModule} from '@angular/cdk/table';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class DemoMaterialModule {}


import { AppComponent } from './app.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    DemoMaterialModule,
    NgMatSearchBarModule,
    SpinnerComponentModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    OrderModule,
    NgDragDropModule.forRoot(),
    ImageUploadModule.forRoot()
  ],
  providers: [],
  entryComponents: [MyDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
