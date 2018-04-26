import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private completedExercises: Exercise[] = [];
  private availableExercises: Exercise[] = [
    { id: 'drink-beer', name: 'Drink a Beer', duration: 30, calories: 280 },
    { id: 'take-a-nap', name: 'Take a Nap', duration: 180, calories: 15 },
    {
      id: 'ice-cream-curls',
      name: 'Ice Cream Curls',
      duration: 20,
      calories: 418
    },
    { id: 'walk-the-cat', name: 'Walk the Cat', duration: 60, calories: 8 }
  ];

  private selectedExercise: Exercise;

  getAvailableExercises() {
    // how to not mutate an array
    return this.availableExercises.slice();
  }

  startExercise(exerciseName: string) {
    this.selectedExercise = this.availableExercises.find(
      exercise => exercise.id === exerciseName
    );
    this.exerciseChanged.next({ ...this.selectedExercise });
  }

  completeExercise() {
    this.completedExercises.push({
      ...this.selectedExercise,
      date: new Date(),
      state: 'completed'
    });
    this.selectedExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.completedExercises.push({
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
}
