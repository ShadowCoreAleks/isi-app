import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
  Signal, WritableSignal
} from '@angular/core';
import { UserTypeEnum } from '../../models/user-type.enum';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericButtonComponent } from '../generic-button/generic-button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';
import { filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { IUser } from '../../models/user.interface';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';

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
export class UserFormComponent implements OnInit {
  username = input.required<string>();
  $pageMode: Signal<PageModeEnum> = computed(() => !!this.username() ? PageModeEnum.update : PageModeEnum.create);
  $user: WritableSignal<UserType> = signal(null);
  user$!: Observable<UserType>;
  #backendApiService = inject(BackendApiService);
  #activatedRoute = inject(ActivatedRoute);
  #cdr = inject(ChangeDetectorRef);

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
        //       this.#cdr.markForCheck();
        //     })
        //   ))
        // )
      }
    });
  }

  ngOnInit(): void {
  }

  fillForm(user: UserType) {
    if (!user) return;

    this.form.reset(user);
  }
}
