import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  courses: any[];

  constructor(db: AngularFireDatabase) {
    db.list("/courses")
      .valueChanges()
      .subscribe(result => {

        this.courses = result;
        console.log(this.courses);

      });
  }
}
