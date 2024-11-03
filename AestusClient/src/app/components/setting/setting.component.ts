import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService, Setting } from '../../services/settings.service';
import { SettingDialogComponent } from '../../setting-dialog/setting-dialog.component';
import { DeleteConfirmDialogComponent } from '../../delete-confirm-dialog/delete-confirm-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  currentSetting?: Setting;
  settings: Setting[] = [];
  selectedDate: string = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en-US'); // Default to current date and time
  errorMessage: string | null = null; // Holds error message if no setting is found

  constructor(
    private settingsService: SettingsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCurrentSetting();
    this.loadAllSettings();
  }

  // Refreshes the current setting based on the selected date
  onDateChange(): void {
    this.getCurrentSetting();
  }

  // Retrieves the current setting for the selected date
  getCurrentSetting(): void {
    this.settingsService.getSetting('Porez na dobit', this.selectedDate).subscribe({
      next: (setting) => {
        this.currentSetting = setting;
        this.errorMessage = null; // Clear error message if setting is found
      },
      error: () => {
        this.currentSetting = undefined; // Clear current setting if there's an error
        this.errorMessage = 'Nema postavke za odabrani datum.'; // Set error message
      }
    });
  }

  // Loads all settings for the list view
  loadAllSettings(): void {
    this.settingsService.getAllSettings().subscribe((data) => {
      this.settings = data;
    });
  }

  // Opens dialog to add a new setting
  openAddDialog(): void {
    const dialogRef = this.dialog.open(SettingDialogComponent, {
      width: '400px',
      data: { setting: { name: '', value: 0, effectiveDate: new Date().toISOString() } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.addSetting(result).subscribe(() => {
          window.location.reload(); // Reload the page after adding
        });
      }
    });
  }

  // Opens dialog to edit an existing setting
  openEditDialog(setting: Setting): void {
    const dialogRef = this.dialog.open(SettingDialogComponent, {
      width: '400px',
      data: { setting }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.updateSetting(result).subscribe(() => {
          window.location.reload(); // Reload the page after updating
        });
      }
    });
  }

  // Opens confirmation dialog before deleting a setting
  deleteSetting(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: 'Jeste li sigurni da želite obrisati ovu postavku?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.settingsService.deleteSetting(id).subscribe({
          next: () => {
            window.location.reload(); // Reload the page after deleting
          },
          error: (err) => {
            const errorMessage = err?.error?.message || 'Posljednja postavka se ne može obrisati jer je trenutno u upotrebi!';
            this.dialog.open(DeleteConfirmDialogComponent, {
              data: {
                message: errorMessage
              }
            });
          }
        });
      }
    });
  }
}
