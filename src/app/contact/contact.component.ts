import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
declare var google: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name = '';
  email = '';
  noName = false;
  noEmail = false;
  invalidEmail = false;
  emailSentSuccessful = false;
  emailSentUnsuccessful = false;
  showSpinner = false;
  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.init_map();
  }

  removeEmailAlert() {
    this.noEmail = false;
    this.invalidEmail = false;
  }

  removeNameAlert() {
    this.noName = false;
  }
  init_map() {
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(28.6036527,77.077775328),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(
      document.getElementById('gmap_canvas'),
      myOptions
    );
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(28.6036527,77.077775328 )
    });
    var infowindow = new google.maps.InfoWindow({
      content:
        `<p style="color:black"><strong>Anurag's Place</strong><br></p>`
    });
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
  }
  // google.maps.event.addDomListener(window, 'load', init_map);
  sendMail() {
    if (!this.name || this.name.trim() == '') {
      this.noName = true;
      return
    }

    if (!this.email) {
      this.noEmail = true;
      return
    }
    if (!/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(this.email))
      return this.invalidEmail = true;


    let obj = {
      name: this.name,
      email: this.email
    }

    this.showSpinner = true;

    this.http.sendMail(obj)
      .subscribe((data: any) => {
        this.showSpinner = false;
        if (data.message == "Resume sent successfully, check your mail.") {
          this.showSpinner = false;
          this.emailSentSuccessful = true;
          this.email='';
          this.name='';
        }

        else {
          this.showSpinner = false;
          this.emailSentUnsuccessful = true;
        }
        setTimeout(() => {
          this.emailSentSuccessful = false;
          this.emailSentUnsuccessful = false;
        }, 3000);
      }, err => {
        this.showSpinner = false;
        console.log("err", err)
        this.emailSentUnsuccessful = true;
        setTimeout(() => {
          this.emailSentUnsuccessful = false;
        }, 3000);
      })


  }

}
