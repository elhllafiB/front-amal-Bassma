import { Component } from '@angular/core';

interface Question {
  title: string;  // Changé de "text" à "title" pour correspondre à votre utilisation
  type: string;
  options: string[];  // Changé pour un tableau simple de chaînes
  isRequired: boolean;
}

interface Questionnaire {
  title: string;
  description: string;
  questions: Question[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']  // Corrigé "styleUrl" en "styleUrls" (tableau)
})
export class AppComponent {
  questionTypes: string[] = ['Paragraphe', 'Choix multiple'];

  questions: Question[] = [
    {
      title: '',
      type: 'Paragraphe',
      options: [],
      isRequired: false
    }
  ];

  addQuestion() {
    this.questions.push({
      title: '',
      type: 'Paragraphe',
      options: [],
      isRequired: false
    });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
    // S'assurer qu'il y a toujours au moins une question
    if (this.questions.length === 0) {
      this.addQuestion();
    }
  }

  addOption(question: Question) {
    if (!question.options) {
      question.options = [];
    }
    question.options.push('');
  }

  removeOption(question: Question, index: number) {
    if (question.options && question.options.length > 1) {
      question.options.splice(index, 1);
    }
  }


  
}
