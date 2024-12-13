import { Component,OnInit  } from '@angular/core';
import { CommonModule,Location  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardsService } from '../core/services/boards.service';

@Component({
  selector: 'app-make-post',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class editPostComponent implements OnInit {
  htmlContent: string = '';  // Este es el contenido del editor, que estará vinculado a [(ngModel)]
  postId: string ='';
  thenPost: string = '';

  constructor(public boardsService: BoardsService, private router: Router,private location: Location) {}
  
  ngOnInit(): void {
    const state = history.state;
    if (state) {
      this.postId = state.postId;
      this.thenPost = state.thenPost;
      console.log('Post ID:', this.postId);
      console.log('Other Data:', this.thenPost);
      this.htmlContent = this.thenPost;
    }
  }

  editPost(){
    this.boardsService.editBoard(this.postId,this.htmlContent).subscribe({
      next:(data)=>{
        console.log(data)
        this.router .navigate(['/board'])
      },error:(err)=>{
        console.error(err);
      }
    })
  }
  
  // Configuración del editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    translate: 'yes',
    sanitize: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    showToolbar: true,
    toolbarPosition: 'top',
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      { name: 'quote', class: 'quote' },
      { name: 'redText', class: 'redText' },
      { name: 'titleText', class: 'titleText', tag: 'h1' }
    ],
    uploadWithCredentials: false,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize'],
      ['insertImage'], // Elimina el botón de imagen
      ['insertLink'],
      ['insertVideo']
    ],
  };

  // Este método es el que se ejecuta al hacer submit del formulario
  postBoard(): void {
    console.log("contenido del html",this.htmlContent)
    // Aquí obtienes el contenido del editor desde `htmlContent`
    const newBoard = {
      content: this.htmlContent // Se envía el contenido al servicio
    };

    // Llamas al servicio para enviar el contenido
    this.boardsService.postBoard(newBoard).subscribe({
      next: (response) => {
        console.log('Tablero creado con éxito:', response);
        this.htmlContent = ''; // Limpiamos el contenido del editor
        this.router.navigate(['/board']); // Redirigimos al tablero
      },
      error: (error) => {
        console.error('Error al crear el tablero:', error);
      }
    });
  }
}
