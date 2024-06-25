import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'ventas-edit',
    templateUrl: 'ventas-edit.component.html',
    styleUrls: ['ventas-edit.component.css']
})

export class VentasEditComponent{
        constructor(public dialogRef: MatDialogRef<VentasEditComponent>, 
            @Inject(MAT_DIALOG_DATA) public data:any
        ){

        }

        confirmar(){
            this.dialogRef.close(true); 
        }
        cerrar(){
            this.dialogRef.close(false);
        }
}

