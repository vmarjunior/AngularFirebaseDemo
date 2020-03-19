import { Component, OnDestroy } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  courses: any[];
  subscription: Subscription;
  coursesList: AngularFireList<any>;
  courses$;
  author$;

  constructor(private db: AngularFireDatabase) {
    //Subscribe method
    this.subscription = db
      .list("/courses")
      .valueChanges()
      .subscribe(result => {
        this.courses = result;
        console.log(this.courses);
      });

    //Pipe method
    this.coursesList = db.list("/courses");
    this.courses$ = this.db
      .list("/courses")
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(change => ({
            key: change.payload.key,
            value: change.payload.val()
          }))
        )
      );

    this.author$ = db.object("/authors/1").valueChanges();
  }

  addCourse(course: string) {
    if (course.trim()) this.coursesList.push(course);
  }

  updateCourse(course) {
    this.db.object("/courses/" + course.key).set(course.value + " UPDATED");
  }

  deleteCourse(course) {
    this.db.object("/courses/" + course.key).remove();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
