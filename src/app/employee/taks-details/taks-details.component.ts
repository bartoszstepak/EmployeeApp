import { Component, OnInit } from '@angular/core';
import { MyTask } from '../model/MyTask';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taks-details',
  templateUrl: './taks-details.component.html',
  styleUrls: ['./taks-details.component.css']
})
export class TaksDetailsComponent implements OnInit {

  Task: MyTask;
  taskId: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.taskId = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(this.taskId).subscribe(result => {
      this.Task = result;
    });
  }

}
