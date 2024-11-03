# Angular Project Setup

This Angular application is built with various components and modules, including Angular Material and `ngx-mat-datetime-picker`, to create a responsive and user-friendly UI. Follow the steps below to set up the project, install dependencies, and configure necessary modules.

## Prerequisites

- Node.js (version 12 or above)
- Angular CLI (version 12 or above)

## Project Setup and Installation

1. **Clone the Repository**

   Clone the project repository and navigate into the project directory:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Angular CLI**

   If Angular CLI is not already installed, install it globally:

   ```bash
   npm install -g @angular/cli
   ```

3. **Install Project Dependencies**

   Run the following command to install all required dependencies:

   ```bash
   npm install
   ```

## Required Libraries and Modules

To set up this project, you will need to install specific Angular libraries and third-party modules. Run the following commands to install these dependencies:

### Angular Material

This application uses Angular Material for dialogs, form fields, input fields, and select dropdowns.

1. Install Angular Material:

   ```bash
   ng add @angular/material
   ```

   During setup, select a theme (e.g., Indigo/Pink), and confirm to set up global typography and animations.

2. **Angular Material Modules Used**:

   - `MatDialogModule`: For displaying dialogs.
   - `MatFormFieldModule`: For styling and behavior of form fields.
   - `MatInputModule`: Material design input fields.
   - `MatSelectModule`: Material design select dropdown.

### Forms and Reactive Forms

Forms and Reactive Forms modules are used for managing form inputs.

```bash
npm install @angular/forms
```

- **`FormsModule`**: Provides template-driven forms functionality.
- **`ReactiveFormsModule`**: Provides reactive form functionality.

### ngx-mat-datetime-picker

This library provides a customizable date and time picker component, which is used for selecting dates and times in this application.

```bash
npm install @angular-material-components/datetime-picker
```

#### ngx-mat-datetime-picker Modules

- `NgxMatDatetimePickerModule`: Provides the datetime picker component.
- `NgxMatNativeDateModule`: Provides native date adapter support for datetime picker.

### Additional Modules

- **BrowserModule**: Required by every Angular app.
- **BrowserAnimationsModule**: Required for Angular Material animations.
- **HttpClientModule**: Enables HTTP services to interact with backend APIs.

### Summary of Angular Imports in `app.module.ts`

Your `app.module.ts` should look like this:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// ngx-mat-datetime-picker modules
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

// Your components
import { AppComponent } from './app.component';
import { SettingComponent } from './components/setting/setting.component';
import { SettingDialogComponent } from './setting-dialog/setting-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    SettingDialogComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

## Running the Application

To run the application locally:

```bash
ng serve
```

The app will be available at `http://localhost:4200`.

## Database Setup

This application requires an SQL database. Follow these steps to set up the database:

1. **Create the Database and Table**

   Use the following SQL script to create the `Aestus` database and `Settings` table:

   ```sql
   CREATE DATABASE Aestus;
   USE Aestus;

   CREATE TABLE dbo.Settings (
       SettingId INT IDENTITY(1,1) PRIMARY KEY,
       Name NVARCHAR(100) NOT NULL,
       Value DECIMAL(10, 2) NOT NULL,
       EffectiveDate DATETIME NOT NULL,
       CreatedAt DATETIME DEFAULT GETDATE()
   );
   ```

2. **Insert Initial Data**

   Add an initial row of data to the `Settings` table:

   ```sql
   INSERT INTO dbo.Settings (Name, Value, EffectiveDate)
   VALUES ('Porez na dobit', 18.00, GETDATE());
   ```

## Project Components

- **AppComponent**: The root component of the application.
- **SettingComponent**: Component to display and manage settings.
- **SettingDialogComponent**: Component to add or edit settings through a dialog.
- **DeleteConfirmDialogComponent**: Component to confirm the deletion of a setting.

## Additional Notes

- This application uses Angular Material for UI components. Ensure you have the theme and animations configured correctly during the setup process.
- The application is configured to support Croatian (`hr`) locale settings, which include date and time formatting in 24-hour format.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
