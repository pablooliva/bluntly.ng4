import { AbstractControl, Validators } from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

export class Unique {
  public static createValidator(db: AngularFireDatabase, recordPath: string, orderBy: string): Validators {
    return (control: AbstractControl) => {
      return new Promise( resolve => {
        const records: FirebaseListObservable<any[]> = db.list(recordPath, {
          query: {
            orderByChild: orderBy,
            equalTo: control.value
          }
        });

        records.subscribe( records => {
          records.length ? resolve({unique: true}) : resolve(null);
        });
      });
    };
  }
}