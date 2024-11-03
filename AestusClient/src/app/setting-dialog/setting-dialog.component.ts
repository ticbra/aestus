import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Setting } from '../services/settings.service';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.css']
})
export class SettingDialogComponent {
  setting: Setting;

  constructor(
    public dialogRef: MatDialogRef<SettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { setting: Setting }
  ) {
    // Kloniraj podatke kako bi se izbjegle neželjene promjene
    this.setting = { ...data.setting };

    // Ako je settingId undefined, radi se o novoj postavci
    if (!this.setting.settingId) {
      this.setting.name = 'Porez na dobit';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.setting);
  }
}
