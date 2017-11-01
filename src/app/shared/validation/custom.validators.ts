import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Object } from "core-js";

export class Unique {
  public static createValidator(db: AngularFireDatabase, recordPath: string, orderBy: string, bioId: string): ValidatorFn {
    return (control: FormControl) => {
      return new Promise( resolve => {
        const records: FirebaseListObservable<any[]> = db.list(recordPath, {
          query: {
            orderByChild: orderBy,
            equalTo: control.value
          }
        });

        records.subscribe( records => {
          records.length && records[0].$key !== bioId
            ? resolve({unique: true})
            : resolve(null);
        });
      });
    };
  }
}

export function atLeastOneRequired(): ValidatorFn {
  return (group: FormGroup) => hasOneValid(group) ? null : {atLeastOneRequired: true};
}

function hasOneValid(group: FormGroup): boolean {
  let isValid: boolean = false;

  Object.keys(group.value).forEach(val => {
    if (group.value[val] !== null && typeof group.value[val] === "object") {
      isValid = isValid || checkInnerOtherGroup(group.value[val]);
    } else {
      isValid = isValid || !!group.value[val];
    }
  });

  return isValid;
}

function checkInnerOtherGroup(otherGroup: Object): boolean {
  let isValid: boolean = false;

  Object.keys(otherGroup).forEach(val => {
    isValid = isValid || hasAllValid(otherGroup[val]);
  });

  return isValid;
}

function hasAllValid(groupProp: Object): boolean {
  return Object.values(groupProp).every(val => val !== "");
}