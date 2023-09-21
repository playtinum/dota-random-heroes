import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroupControls } from '../../+utils/utils';
import { Settings, SettingsService } from './settings.service';
import { LabelInputTextComponent } from '../../components/label-input-text.component';
import { MessagesService } from '../../components/notifications/messages.service';

type SettingsFormFields = FormGroupControls<Settings>;

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LabelInputTextComponent],
  template: `
    <form [formGroup]="formGroup" class="flex flex-col gap-4" (ngSubmit)="handleSaveSettings()">
      <app-label-input-text formControlName="randomizeCount" label="Randomize Count"></app-label-input-text>
      <app-label-input-text formControlName="excludedHeroes" label="Excluded Heroes"></app-label-input-text>
      <button type="submit" class="w-fit">Save</button>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  formGroup = new FormGroup<SettingsFormFields>({
    randomizeCount: new FormControl(3, {
      validators: [Validators.required, Validators.min(1), Validators.pattern(/^([0-9])*$/)],
      nonNullable: true,
    }),
    excludedHeroes: new FormControl('', { validators: [], nonNullable: true }),
  });
  private settingsService = inject(SettingsService);
  private messagesService = inject(MessagesService);

  constructor() {
    effect(() => {
      this.formGroup.patchValue(this.settingsService.settings());
    });
  }

  handleSaveSettings() {
    if (this.formGroup.invalid) {
      return;
    }

    const settings: Settings = this.formGroup.value as Settings;
    this.settingsService.settings.set(settings);

    this.messagesService.addMessage({
      title: 'Settings Saved',
      summary: 'Settings have been saved.',
      severity: 'success',
    });
  }
}
