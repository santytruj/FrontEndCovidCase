import { Component, Inject, Input } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Router } from '@angular/router';
import { CovidCaseI } from 'src/app/modelos/listaCovidCase.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-covid-case',
  templateUrl: './covid-case.component.html',
  styleUrls: ['./covid-case.component.css']
})
export class CovidCaseComponent {

  dataRows: CovidCaseI[] = [];
  selectedRowIndex: number | null = null;
  selectedRowData: CovidCaseI | null = null;
  rolesAutorizados: string[] = ["Admin", "Buscador"];

  showModal: boolean = false;


  constructor(private api:ApiService , private router:Router,private modalService: NgbModal) {  }

  ngOnInit(): void{
    var roles = localStorage.getItem('rol') || '';


    const rolesAutorizadosFiltrados = this.rolesAutorizados.filter((rol) => roles.includes(rol));

    if (rolesAutorizadosFiltrados.length >= 1) {

      this.api.getAllCovidCase().subscribe((data =>{
        let dataResponse:ResponseI = data;
        if (dataResponse.succeeded) {
          this.dataRows = dataResponse.data;
        }
      }));

    }else{


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
	    this.api.updateCovidCase(this.selectedRowData).subscribe((data => {
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

  const asdsasd = this.selectedRowData;
  this.api.createdCovidCase(this.selectedRowData).subscribe((data => {
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


}
  }

  onCloseModal() {
    this.selectedRowIndex = null;
    this.selectedRowData = null;
    this.showModal = false;
  }

  updateSelectedRowDate<K extends keyof CovidCaseI>(property: K, event: any): void {
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

    this.api.deleteCovidCase(idCovidCase).subscribe((data => {
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
      states: 0,
      positive: 0,
      negative: 0,
      pending: 0,
      hospitalizedCurrently: 0,
      hospitalizedCumulative: 0,
      inIcuCurrently: 0,
      inIcuCumulative: 0,
      onVentilatorCurrently: 0,
      onVentilatorCumulative: 0,
      dateChecked:'2023-02-21T03:02:52.792Z',
      death: 0,
      hospitalized: 0,
      totalTestResults: 0,
      lastModifiedTable: '2023-02-21T03:02:52.792Z',
      recovered: '0',
      total: 0,
      posNeg: 0,
      deathIncrease: 0,
      hospitalizedIncrease: 0,
      negativeIncrease: 0,
      positiveIncrease: 0,
      totalTestResultsIncrease: 0,
      hash: ''
    };
  }

  onNewRegister(){

  }

}
