import { Exercise } from './exercise.model';

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'drink-beer', name: 'Drink a Beer', duration: 30, calories: -280 },
    { id: 'take-a-nap', name: 'Take a Nap', duration: 1800, calories: 15 },
    {
      id: 'ice-cream-curls',
      name: 'Ice Cream Curls',
      duration: 120,
      calories: -418
    },
    { id: 'walk-the-cat', name: 'Walk the Cat', duration: 60, calories: 8 }
  ];

  private selectedExercise: Exercise;

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    this.selectedExercise = this.availableExercises.find(
      exercise => exercise.id === exerciseId
    );
  }
}
