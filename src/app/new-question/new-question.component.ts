import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../service/question.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-question',
  standalone: false,
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent {



  formulaireFormGroup!: FormGroup;

  formulaireId!: number;


  constructor(private fb: FormBuilder ,  private route: ActivatedRoute, private questionService: QuestionService ,) { }

  ngOnInit(): void {
    this.formulaireFormGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      lSectionFormulaire: this.fb.array([])
    });


    this.formulaireId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadFormulaire();


  }



  initForm(): void {
    this.formulaireFormGroup = this.fb.group({
      name: [''],
      type: [''],
      lSectionFormulaire: this.fb.array([])
    });
  }


  loadFormulaire(): void {
    this.questionService.getFormulaireById(this.formulaireId).subscribe(formulaire => {
      if (formulaire) {
        this.formulaireFormGroup.patchValue({
          name: formulaire.name,
          type: formulaire.type
        });

        formulaire.lSectionFormulaire.forEach(section => {
          const sectionGroup = this.fb.group({
            Description: [section.Description],
            lQuestionnaire: this.fb.array(
              section.lQuestionnaire.map(q =>
                this.fb.group({ content: [q.content] })
              )
            )
          });
          this.sections.push(sectionGroup);
        });
      }
    });
  }









  get sections(): FormArray {
    return this.formulaireFormGroup.get('lSectionFormulaire') as FormArray;
  }

  ajouterSection(): void {
    const sectionGroup = this.fb.group({
      id: [null],
      Description: ['', Validators.required],
      lQuestionnaire: this.fb.array([])
    });
    this.sections.push(sectionGroup);
  }

  supprimerSection(index: number): void {
    this.sections.removeAt(index);
  }

  getQuestions(sectionIndex: number): FormArray {
    return this.sections.at(sectionIndex).get('lQuestionnaire') as FormArray;
  }

  ajouterQuestion(sectionIndex: number): void {
    const questionGroup = this.fb.group({
      id: [null],
      content: ['', Validators.required]
    });
    this.getQuestions(sectionIndex).push(questionGroup);
  }

  supprimerQuestion(sectionIndex: number, questionIndex: number): void {
    this.getQuestions(sectionIndex).removeAt(questionIndex);
  }

  enregistrerFormulaire(): void {
    if (this.formulaireFormGroup.valid) {
      const formulaire: any = this.formulaireFormGroup.value;
      console.log('Formulaire à enregistrer :', formulaire);
      // Ici tu peux appeler ton service pour POST le formulaire vers l’API
    } else {
      this.formulaireFormGroup.markAllAsTouched();
    }
  }


}
