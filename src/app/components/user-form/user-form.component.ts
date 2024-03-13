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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericButtonComponent } from '../generic-button/generic-button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';
import { filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { IUser } from '../../models/user.interface';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

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
    AsyncPipe
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

  protected readonly userTypeEnum = UserTypeEnum;
  protected readonly pageModeEnum = PageModeEnum;
  protected form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    first_name: new FormControl<string>('', Validators.required),
    last_name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    user_type: new FormControl<UserTypeEnum | null>(null, Validators.required),
    password: new FormControl<string>('', Validators.required),
    repeatPassword: new FormControl<string>('', Validators.required),
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
    this.#backendApiService.deleteUser(this.username())
      .subscribe(() => this.#router.navigate(['/']));
  }

  onCreate() {
    const user: IUser = {
      username: <string>this.form.value.username,
      first_name: <string>this.form.value.first_name,
      last_name: <string>this.form.value.last_name,
      email: <string>this.form.value.email,
      user_type: <UserTypeEnum>this.form.value.user_type,
      password: <string>this.form.value.password,
    };
    this.#backendApiService.createUser(user)
      .subscribe(() => this.#router.navigate(['/']));
  }
}
