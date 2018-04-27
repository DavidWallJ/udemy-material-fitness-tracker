import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesLoaded = new Subject<Exercise[]>();
  private completedExercises: Exercise[] = [];
  private availableExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {
    const settings = { timestampsInSnapshots: true };
    db.app.firestore().settings(settings);
  }

  private selectedExercise: Exercise;

  fetchAvailableExercises() {
    // how to not mutate an array
    this.db
      .collection('availableExercises')
      // here we are maping over the array of objects
      // and then mapping over and altering the contents of each object
      // we're doing this to change the structure of the results array
      // we want the 'id' feild with all the other data
      .snapshotChanges()
      // rxjs map operator
      .map(docArray => {
        // regular JavaScript map
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesLoaded.next([...this.availableExercises]);
      });
  }

  startExercise(exerciseName: string) {
    this.selectedExercise = this.availableExercises.find(
      exercise => exercise.id === exerciseName
    );
    this.exerciseChanged.next({ ...this.selectedExercise });
  }

  completeExercise() {
    this.addCompletedExerciseToDB({
      ...this.selectedExercise,
      date: new Date(),
      state: 'completed'
    });
    this.selectedExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addCompletedExerciseToDB({
      ...this.selectedExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.selectedExercise.duration * (progress / 100),
      calories: this.selectedExercise.calories * (progress / 100)
    });
    this.selectedExercise = null;
    this.exerciseChanged.next(null);
  }

  getSelectedExercise() {
    // how to not allow for mutation of an object
    return { ...this.selectedExercise };
  }

  getCompletedExercises() {
    // how to not allow for mutation of an object
    return this.completedExercises.slice();
  }

  addCompletedExerciseToDB(exercise) {
    this.db.collection('completedExercises').add(exercise);
  }
}
