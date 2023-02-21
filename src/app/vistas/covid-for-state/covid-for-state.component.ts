import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CovidForStateI } from 'src/app/modelos/listaCovidForState.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmación</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('cancel')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ message }}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('confirm')">Aceptar</button>
    </div>
  `
})
export class NgbdModalConfirm {
  @Input() title: string = 'Mensaje';
  @Input() message: string = 'Mensaje No Definido';

  constructor(@Inject(NgbActiveModal) public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'app-covid-for-state',
  templateUrl: './covid-for-state.component.html',
  styleUrls: ['./covid-for-state.component.css']
})
export class CovidForStateComponent {

  dataRows: CovidForStateI[] = [];
  selectedRowIndex: number | null = null;
  selectedRowData: CovidForStateI | null = null;
  rolesAutorizados: string[] = ["Admin", "Ciudadado"];

  showModal: boolean = false;

  constructor(private api:ApiService , private router:Router,private modalService: NgbModal) {  }


  ngOnInit(): void{

    var roles = localStorage.getItem('rol') || '';


    const rolesAutorizadosFiltrados = this.rolesAutorizados.filter((rol) => roles.includes(rol));
    if (rolesAutorizadosFiltrados.length >= 1) {
      this.api.getAllCovidForState().subscribe((data =>{
        let dataResponse:ResponseI = data;
        if (dataResponse.succeeded) {
          this.dataRows = dataResponse.data;
        }
      }));

    } else {

      const modalRef = this.modalService.open(NgbdModalConfirm);
	        modalRef.componentInstance.message = 'Acceso No Autorizado.';
	        modalRef.result.then((result) => {
            this.router.navigate(['dashboard']);
	        }, () => {});

    }

  }


  onEdit(index: number): void {
    this.selectedRowIndex = index;
    this.selectedRowData = this.dataRows[index];
  }


  onSave(): void {

    if (!this.selectedRowData) {
      return;
    }
    // Actualizar los datos del elemento en el arreglo
if (this.selectedRowData.id >= 1) {
	    this.api.updateCovidForState(this.selectedRowData).subscribe((data => {
	      let dataResponse: ResponseI = data;
	      if (dataResponse.succeeded) {
	        const modalRef = this.modalService.open(NgbdModalConfirm);
	        modalRef.componentInstance.message = 'Se actualizó correctamente.';
	        modalRef.result.then((result) => {
	          // utilizando el índice guardado en la propiedad `selectedRowIndex`
	          this.selectedRowIndex = null;
	          this.selectedRowData = null;
	          location.reload();
	        }, () => {});
	      }
	    }));
}else{
  this.api.createdCovidForState(this.selectedRowData).subscribe((data => {
    let dataResponse: ResponseI = data;
    if (dataResponse.succeeded) {
      const modalRef = this.modalService.open(NgbdModalConfirm);
      modalRef.componentInstance.message = 'Ingresado Correctamente';
      modalRef.result.then((result) => {
        // utilizando el índice guardado en la propiedad `selectedRowIndex`
        this.selectedRowIndex = null;
        this.selectedRowData = null;
        location.reload();
      }, () => {});
    }
  }));
}}


onCloseModal() {
  this.selectedRowIndex = null;
  this.selectedRowData = null;
  this.showModal = false;
}

updateSelectedRowDate<K extends keyof CovidForStateI>(property: K, event: any): void {
  if (this.selectedRowData) {
    this.selectedRowData[property] = event.target.value;
  }
}

//Delete

onDelete(index: number): void {
  this.selectedRowIndex = null;
  this.selectedRowData = null;

  this.showModal = false;
  const idCovidCase = this.dataRows[index].id;

  this.api.deleteCovidForState(idCovidCase).subscribe((data => {
    let dataResponse: ResponseI = data;
    if (dataResponse.succeeded) {
      const modalRef = this.modalService.open(NgbdModalConfirm);
      modalRef.componentInstance.message = 'Se BorroCorrectamente';
      modalRef.result.then((result) => {
        location.reload();
      }, () => {});

    }
  }));
}


onNewModal() {
  this.selectedRowIndex = 0;
  this.selectedRowData = {
    id: 0,
    date: 0,
    state: '',
    positive: 0,
    probableCases: 0,
    negative: 0,
    pending: '',
    totalTestResultsSource: '',
    totalTestResults: 0,
    hospitalizedCurrently: 0,
    hospitalizedCumulative: 0,
    inIcuCurrently: 0,
    inIcuCumulative: 0,
    onVentilatorCurrently: 0,
    onVentilatorCumulative: 0,
    recovered: 0,
    lastUpdateEt: '',
    dateModified: '2023-02-21T11:23:26.498Z',
    checkTimeEt: '',
    death: 0,
    hospitalized: 0,
    hospitalizedDischarged: 0,
    dateChecked: '2023-02-21T11:23:26.498Z',
    totalTestsViral: 0,
    positiveTestsViral: 0,
    negativeTestsViral: 0,
    positiveCasesViral: 0,
    deathConfirmed: 0,
    deathProbable: 0,
    totalTestEncountersViral: 0,
    totalTestsPeopleViral: 0,
    totalTestsAntibody: 0,
    positiveTestsAntibody: 0,
    negativeTestsAntibody: 0,
    totalTestsPeopleAntibody: 0,
    positiveTestsPeopleAntibody: '',
    negativeTestsPeopleAntibody: '',
    totalTestsPeopleAntigen: 0,
    positiveTestsPeopleAntigen: 0,
    totalTestsAntigen: '',
    positiveTestsAntigen: '',
    fips: '',
    positiveIncrease: 0,
    negativeIncrease: 0,
    total: 0,
    totalTestResultsIncrease: 0,
    posNeg: 0,
    dataQualityGrade: '',
    deathIncrease: 0,
    hospitalizedIncrease: 0,
    hash: '',
    commercialScore: 0,
    negativeRegularScore: 0,
    negativeScore: 0,
    positiveScore: 0,
    score: 0,
    grade: ''
  };
}

}
