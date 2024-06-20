import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-confirmacion',
    templateUrl: 'confirmacion.component.html',
    styleUrls: ['confirmacion.component.css']
})

export class ConfirmacionComponent{
        constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>, 
            @Inject(MAT_DIALOG_DATA) public data:any
        ){

        }

        confirmar(){
            this.dialogRef.close(true); 
        }
}