import { Component, OnInit } from '@angular/core';
import { ScoreViewModel } from '../../../shared/models/Score.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent implements OnInit {
  score!: ScoreViewModel;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const state = history.state;
    console.log(`state: ${state}`);
    if (!state || !state.scoreResult) {
      // fallback if direct access
      this.router.navigate(['/user/examAttempts/available-exams']);
    } else {
      this.score = state.scoreResult as ScoreViewModel;
    }
  }

  get isPassed(): boolean {
    return this.score?.scoreInPercentage > 60;
  }

  goBack(): void {
    this.router.navigate(['/user/examAttempts/available-exams']);
  }
}
