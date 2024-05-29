import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { AssignmentsService } from '../../shared/assignments.service';
import { TitleService } from '../../shared/title.service';
import { User } from '../../models/token';
import { CanvasJSAngularChartsModule, CanvasJSChart  } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-note-student',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './note-student.component.html',
  styleUrl: './note-student.component.css'
})
export class NoteStudentComponent implements OnInit {
  notes: Note[] = [];
  userConnected!: User;
  chartOptions = {};

  constructor(
    private assignmentService: AssignmentsService,
    private titleService: TitleService,
  ){}

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      this.titleService.changeTitle(`${this.userConnected.name} ${this.userConnected.firstname}'s average marks`);
      this.getAverageMark();
    }

  }

  getAverageMark() {
    this.assignmentService.getAverageMarkStudent()
    .subscribe((data) => {
      this.notes = data.docs;
      this.chartOptions = {
        backgroundColor: "white",
        title:{
          text: "Average marks by subjects"
        },
        animationEnabled: true,
        axisY: {
          includeZero: true,
        },
        data: [{
          type: "bar",
          indexLabel: "{y}",
          dataPoints: this.notes.map(item => ({ label: item.subject.name, y: item.averageMark, color: "#bf8bff" }))
        }]
      };
    })
  }
}
