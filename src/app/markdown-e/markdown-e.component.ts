
import { Component, effect } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import { MarkdownModule } from 'ngx-markdown';			

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MarkdownModule,	                                
  ],
  templateUrl: './markdown-e.component.html',
  styleUrl: './markdown-e.component.scss'
})
export class MarkdownEComponent {

}