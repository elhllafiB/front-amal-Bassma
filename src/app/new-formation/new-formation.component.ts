import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Module} from '../model/module';
import {Formation} from '../model/formation';
import {FormationService} from '../service/formation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-formation',
  standalone: false,
  templateUrl: './new-formation.component.html',
  styleUrl: './new-formation.component.css'
})
export class NewFormationComponent implements OnInit {

  formationFormGroup !: FormGroup;

  constructor(private fb: FormBuilder , private formationService: FormationService ,  private router: Router) { }

  ngOnInit() {
    this.formationFormGroup = this.fb.group({
      nom: this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      description: this.fb.control(null, [Validators.required, Validators.minLength(10)]),
      ecole: this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      listeModule: this.fb.array([], [Validators.required])
    });
  }

  // Getter pour accéder facilement au FormArray des modules
  get modules(): FormArray {
    return this.formationFormGroup.get('listeModule') as FormArray;
  }

  // Méthode pour ajouter un nouveau module
  ajouterModule() {
    const moduleFormGroup = this.fb.group({
      nom: this.fb.control(null, [Validators.required])
    });

    this.modules.push(moduleFormGroup);
  }

  // Méthode pour supprimer un module
  supprimerModule(index: number) {
    this.modules.removeAt(index);
  }



  enregistrerFormation(){

    if(this.formationFormGroup.invalid){
      return ;
    }


    const formation: Formation = {
      id: '', // l'ID sera généré dans le service
      nom: this.formationFormGroup.value.nom,
      description: this.formationFormGroup.value.description,
      ecole: this.formationFormGroup.value.ecole,
      listeModule: this.formationFormGroup.value.listeModule.map((m: any, index: number) => ({
        id: index + 1, // ou utilise un UUID si besoin
        nom: m.nom
      }))
    };

    this.formationService.AjouterFormation(formation).subscribe(
      () => {
        this.router.navigate(['/formation']); // redirige vers la liste après ajout
      }
    )


  }

  }



