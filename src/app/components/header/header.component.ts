import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HeaderNotificationService } from '../../services/header-notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  #headerNotificationService = inject(HeaderNotificationService);
  $showSuccess = signal(false);
  $showError = signal(false);

  ngOnInit() {
    this.#headerNotificationService.successNotification$
      .pipe(
        filter(Boolean),
        tap(val => this.$showSuccess.set(val)),
        delay(5000),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(val => {
        this.$showSuccess.set(!val);
      });

    this.#headerNotificationService.errorNotification$
      .pipe(
        filter(Boolean),
        tap(val => this.$showError.set(val)),
        delay(5000),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(val => {
        this.$showError.set(!val);
      });
  }
}
