import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray, NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

// Sample Token Authentication
const httpOptions = {
  headers: new Headers({
    'Content-type': 'application/json; charset=UTF-8',
    'Authorization': 'my-auth-token-taken-form-the-server'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {
  showSearchBar: boolean = false;
  value = '';
  users = [];
  albums = [];
  photos = [];
  showLoader: boolean;
  selectedRow: Number;
  selectedUser;
  addAll: boolean = false;
  emptyAlbum: boolean = true;
  emptyPhoto: boolean = true;
  showSort: boolean = false;
  droppedItems = [];
  baseUrl = "http://jsonplaceholder.typicode.com/";
  order: string = 'title';
  reverse: boolean = false;
  selectedSort: string = "az";





  constructor( iconRegistry: MatIconRegistry, public http: Http, private fb: FormBuilder, public dialog: MatDialog, public snackBar: MatSnackBar) {


    // Initiallize the spinner
    this.showLoader = true;
    // On app start, get all the users
    http.get(this.baseUrl + 'users', httpOptions)
      .flatMap((data) => data.json())
      .subscribe((data) => {
        //console.log(data);
        this.users.push(data);

      }, (err) => {
        this.showLoader = false;
        this.snackBar.open("Error connecting to users", "OK", {
          duration: 4000,
        });
        console.log(err);
      }, () => {
        this.showLoader = false;
        //console.log('finished');
      });

  }

  hideShowSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  // select user
  getUser(user, index) {
    this.selectedUser = user;
    this.showLoader = true;

    // On self click - deselect itself
    if (this.selectedRow == index) {
      this.selectedRow = -1;
      this.emptyAlbum = true;
      this.emptyPhoto = true;
      this.showLoader = false;
    } else {
      // On user switch empty all the previous user data
      this.emptyPhoto = true;
      this.photos = [];
      this.droppedItems = [];
      this.emptyAlbum = false;
      // Add .active class on selected user row
      this.selectedRow = index;
      // Get all the albums of this user
      this.getAlbums(user.id);
    }
  }

  // Get all albums of a specific user
  getAlbums(userId) {

    // Empty the array for the next user click
    this.albums = [];
    this.http.get(this.baseUrl + 'albums?userId=' + userId, httpOptions)
      .flatMap((data) => data.json())
      // .filter((album) => album.userId == userId)
      .subscribe((data) => {
        let tempVar: any;
        tempVar = data;

        // For each album, get the number of photos it contains 
        // (length of the array) by subscribing to this observable.
        // The data is loaded asyncronosly even after albums are loaded
        this.getAlbumLength(data).subscribe(mediaItems => {
          tempVar.albumLength = mediaItems.length;
        });
        this.albums.push(tempVar);

      }, (err) => {
        this.showLoader = false;
        this.snackBar.open("Error connecting to albums", "OK", {
          duration: 4000,
        });
        console.log(err);
      }, () => {
        this.showLoader = false;
        console.log('finished');
      });

  }


  getAlbumLength(albumId) {
    return this.http.get(this.baseUrl + 'photos?albumId=' + albumId.id).map(response => response.json());
  }

  // Get photos from one or multiple albums
  getPhotos(albumId) {

    this.http.get(this.baseUrl + 'photos?albumId=' + albumId, httpOptions)
      .flatMap((data) => data.json())
      // .filter((photo) => photo.albumId == albumId)
      .subscribe((data) => {
        this.photos.push(data);

      }, (err) => {
        this.showLoader = false;
        this.snackBar.open("Error connecting to photos", "OK", {
          duration: 4000,
        });
        console.log(err);
      }, () => {
        this.showLoader = false;
        console.log('finished');
        return this.photos.length;
      });

  }

  // Called on album drop event
  // Creates an array with the dropped albums 
  onItemDrop(e: any) {
    this.showLoader = true;

    // Get the dropped data here
    this.droppedItems.push(e.dragData);

    // If no album is dropped/selected or if all
    // albums are removed - show empty album text
    if (this.droppedItems.length == 0) {
      this.emptyPhoto = true;
    } else {
      this.emptyPhoto = false;
      // Albums may be dropped multiple times so we have to remove the duplicates
      this.droppedItems = this.removeDuplicates(this.droppedItems);
      // Empty existing photos to avoid duplicates
      this.photos = [];
      // Loop through all the albums and get their photos
      this.droppedItems.map((albumSelcected) => {
        this.getPhotos(albumSelcected.id);
      })
    }
  }

  // Select all albums using checkbox
  addAllAlbums() {
    this.showLoader = true;
    this.addAll = !this.addAll;

    // On deselect of the checkbox, clear all data and show the correct messages
    if (!this.addAll) {
      this.emptyPhoto = true;
      this.photos = [];
      this.droppedItems = [];
      this.showLoader = false;
    } else {
      this.photos = [];
      this.droppedItems = this.albums;
      this.droppedItems = this.removeDuplicates(this.droppedItems);
      this.droppedItems.map((album) => {
        this.getPhotos(album.id);
      })
      this.emptyPhoto = false;
    }
  }

  // Remove selected/dropped albums
  removeAlbum(albumId) {
    // if it's the last album, clear all data
    if (this.droppedItems.length == 1) {
      this.emptyPhoto = true;
      this.photos = [];
      this.droppedItems = [];
    } else {
      // loop through all the albums and remove the clicked one
      let tempVar = this.droppedItems.filter((albumRem) => {
        return albumRem.id !== Number(albumId);
      });
      this.photos = [];
      this.droppedItems = tempVar;
      this.droppedItems.map((album) => {
        this.getPhotos(album.id);
      })
    }
  }

  // Function that removes the arrays from an array
  removeDuplicates(arr) {
    let unique_array = arr.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });
    return unique_array
  }

  // Sort the photos
  getSort(event, selV) {

    if (this.selectedSort == 'az') {
      this.reverse = false;
    } else {
      this.reverse = true;
    }
  }


  // Opens the modal/dialog used to create new albums
  openAlbumCreationDialog() {
    const ref = this.dialog.open(MyDialogComponent, {
      // send the selected user to the dialog component
      data: { user: this.selectedUser },
    });
    // Subscribe to an emmiter so the components can talk with each other
    const sub = ref.componentInstance.onAdd.subscribe((data) => {
      this.showLoader = true;

      // On modal form submit, get all the data entered, including the images
      // uploaded even though at the moment we won't send them to the server

      // Make a http call to the server to create a new album with the data just received from the modal
      const req = this.http.post('http://jsonplaceholder.typicode.com/albums', {
        title: data.albumName,
        userId: this.selectedUser.id
      })
        .subscribe(
        res => {
          console.log(res);
          this.showLoader = false;
          // Notify the user using a snackBar
          this.snackBar.open('Album ' + data.albumName + ' Created Succesfully', 'OK', {
            duration: 4000,
          });
        },
        err => {
          this.showLoader = false;
          this.snackBar.open("Error creating album" + JSON.stringify(err), "OK", {
            duration: 2000,
          });
          console.log("Error occured");
        }
        );


    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }



}
