import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-middle-content',
  templateUrl: './middle-content.component.html',
  styleUrls: ['./middle-content.component.scss']
})
export class MiddleContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayTaskname(task):void{
    console.log(task);
    var input = document.querySelector("#task-name");
    input.innerHTML = task;
  }

}
