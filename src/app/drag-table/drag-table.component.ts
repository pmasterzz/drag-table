import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-table',
  templateUrl: './drag-table.component.html',
  styleUrls: ['./drag-table.component.scss']
})
export class DragTableComponent implements OnInit {

  public data: any[];
  public rows: any[];
  public columns: string[];
  constructor() { }

  ngOnInit() {
    this.data = [];
    this.columns = ['first', 'second', 'third'];
    this.rows = [
      {
        title: 'pwep',
        items: {
          first: [
            {
              id: 1,
              name: 'pweppy'
            }
          ],
          second: [
            {
              id: 2,
              name: 'pwappy'
            }
          ]
        }
      },
      {title: 'pwap', items: []},
      {title: 'pwepper',
        items: {
          second: [
            {
              id: 3,
              name: 'item row 3'
            }
          ]
        }}];
  }

  drop(event: CdkDragDrop<string[]>) {

    console.log(event);
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
  }

  dropItem(event: CdkDragDrop<string[]>) {
    const [row, column] = event.container.id.split('-');
    const [previousRow, previousColumn] = event.previousContainer.id.split('-');

    this.rows[previousRow].items[previousColumn] =
      this.rows[previousRow].items[previousColumn].filter((item) => {
      return item.id !== event.item.data.id;
    });

    if (!this.rows[row].items[column]) {
      this.rows[row].items[column] = [event.item.data];
    } else {
      this.rows[row].items[column].push(event.item.data);
    }

    moveItemInArray(this.rows[row].items[column], this.rows[row].items[column].length - 1, event.currentIndex);
  }

}
