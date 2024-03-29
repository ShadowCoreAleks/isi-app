import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  Signal, WritableSignal
} from '@angular/core';
import { UserTypeEnum } from '../../models/user-type.enum';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import { GenericButtonComponent } from '../generic-button/generic-button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';
import { filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { IUser } from '../../models/user.interface';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { GenericInputModule } from '../generic-input/generic-input.module';
import { HeaderNotificationService } from '../../services/header-notification.service';

enum PageModeEnum {
  create = 'create',
  update = 'update'
}

type UserType = IUser | null;

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    GenericButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    NgTemplateOutlet,
    AsyncPipe,
    GenericInputModule
  ],
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  username = input.required<string>();
  $pageMode: Signal<PageModeEnum> = computed(() => !!this.username() ? PageModeEnum.update : PageModeEnum.create);
  $user: WritableSignal<UserType> = signal(null);
  user$!: Observable<UserType>;
  #backendApiService = inject(BackendApiService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #headerNotificationService = inject(HeaderNotificationService);

  protected readonly userTypeEnum = UserTypeEnum;
  protected readonly pageModeEnum = PageModeEnum;
  protected form = new FormGroup({
    username: new FormControl<string>('', Validators.required, this.checkUniqueUsername()),
    first_name: new FormControl<string>('', Validators.required),
    last_name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    user_type: new FormControl<UserTypeEnum | null>(null, Validators.required),
    passwords: new FormGroup({
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[\w]+[\d]+/)
      ]),
      repeatPassword: new FormControl<string>('', Validators.required),
    }, { validators: this.passShouldMatch('password', 'repeatPassword')})
  });

  /** third variant */
  // $user3 = toSignal(this.#activatedRoute.paramMap.pipe(
  //   map(params => params.get('username')),
  //   filter(Boolean),
  //   switchMap(username => this.#backendApiService.loadSpecificUser(username).pipe(
  //     tap(user => {
  //       this.fillForm(user);
  //     })
  //   ))
  // ));

  constructor() {
    effect(async () => {
      if (this.username()) {
        this.form.controls.username.clearAsyncValidators();

        /** first variant */
        const user = await firstValueFrom(this.#backendApiService.loadSpecificUser(this.username())) || null;
        this.$user.set(user);
        this.fillForm(user);

        /** second variant */
        // this.user$ = this.#activatedRoute.paramMap.pipe(
        //   map(params => params.get('username')),
        //   filter(Boolean),
        //   switchMap(username => this.#backendApiService.loadSpecificUser(username).pipe(
        //     tap(user => {
        //       this.fillForm(user);
        //     })
        //   ))
        // )
      }
    });
  }

  fillForm(user: UserType) {
    if (!user) return;

    this.form.reset(user);
  }

  onDelete() {
    if (this.username() === 'johnweak') {
      this.#headerNotificationService.showErrorNotification(true);
      return;
    }
    this.#backendApiService.deleteUser(this.username())
      .subscribe(() => {
        this.#headerNotificationService.showSuccessNotification(true);
        this.#router.navigate(['/']);
      });
  }

  onCreate() {
    const user: IUser = {
      username: <string>this.form.value.username,
      first_name: <string>this.form.value.first_name,
      last_name: <string>this.form.value.last_name,
      email: <string>this.form.value.email,
      user_type: <UserTypeEnum>this.form.value.user_type,
    };
    this.#backendApiService.createUser(user)
      .subscribe(() => {
        this.#headerNotificationService.showSuccessNotification(true);
        this.#router.navigate(['/']);
      });
  }

  passShouldMatch(origin: string, repeat: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const match = form?.get(origin).value === form?.get(repeat).value;

      return match ? null : { passShouldMatch: true };
    };
  }

  checkUniqueUsername() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.#backendApiService.checkUserExist(control.value).pipe(
        map((result: boolean) => result ? { isExist: true } : null)
      )
    }
  }
}
