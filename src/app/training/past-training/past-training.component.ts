import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  columnsToDisplay = ['date', 'name', 'duration', 'calories', 'state'];
  // with this 'mat-table' will expect and array of 'Exercise's
  // not just one 'Exercise'
  dataSource = new MatTableDataSource<Exercise>();
  private completedExercisesLoadedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    // when completed exercises has loaded...
    this.completedExercisesLoadedSubscription = this.trainingService.completedExercisesLoaded.subscribe(
      (completedExercises: Exercise[]) => {
        this.dataSource.data = completedExercises;
      }
    );

    // ask db for completed exercises
    this.trainingService.fetchCompletedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.completedExercisesLoadedSubscription.unsubscribe();
  }
}
