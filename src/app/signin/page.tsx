"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useActionState } from "react";
import { authenticate } from "../actions/auth";
import { Email, Eye, Hide, User, Lock, Alertcircle } from "~/Icons";

export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative h-[1024px] w-full overflow-hidden bg-greyscale-25 text-base-black">
      <Image
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="/bg.png"
        alt="Background"
        width={1440}
        height={1024}
        priority
      />

      <div className="border-2xl absolute left-[calc(50%_-_250px)] top-[calc(50%_-_295px)] box-border flex w-[500px] flex-col items-center justify-center gap-spacing-20 rounded-radius-2xl border-[1px] border-greyscale-100 bg-greyscale-0 p-spacing-40 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]">
        <div className="text-21xl flex flex-col items-center justify-center gap-spacing-16 self-stretch text-base-black">
          <div className="self-stretch text-center text-h2 font-semibold">
            Рад встречи, это RideX 👋
          </div>
          <div className="flex flex-row items-start justify-center gap-2 self-stretch text-base text-base-text-paragraph">
            <div className="font-medium-medium relative">Нет аккаунта?</div>
            <Link
              href="/signup"
              className="font-medium-medium text-primary-300 hover:text-primary-400"
            >
              Регистрация
            </Link>
          </div>
        </div>

        <form
          action={formAction}
          className="flex flex-col items-start justify-start gap-spacing-16 self-stretch text-left text-small-medium"
        >
          <input type="hidden" name="redirectTo" value="/dashboard" />
          <div className="flex flex-col items-start justify-start gap-1.5 self-stretch">
            <label className="relative inline-block w-full flex-1 text-left text-small-medium text-greyscale-900">
              Email
            </label>
            <div className="relative self-stretch">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Email />
              </div>
              <input
                type="email"
                name="email"
                required
                className="hover:bg-greyscale25 h-12 w-full rounded-radius-4xl border-[1px] border-greyscale-100 bg-greyscale-0 py-2 pl-11 pr-3 hover:border-greyscale-300 focus:border-primary-300 focus:shadow-[0px_0px_0px_1px_#1264ff_inset,_0px_0px_1px_3px_rgba(18,_100,_255,_0.15)] focus:outline-none"
                placeholder="Почта"
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-1.5 self-stretch">
            <label className="relative inline-block w-full flex-1 text-left text-small-medium text-greyscale-900">
              Пароль
            </label>
            <div className="relative self-stretch">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Lock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={8}
                className="hover:bg-greyscale25 h-12 w-full rounded-radius-4xl border-[1px] border-greyscale-100 bg-greyscale-0 py-2 pl-11 pr-3 hover:border-greyscale-300 focus:border-primary-300 focus:shadow-[0px_0px_0px_1px_#1264ff_inset,_0px_0px_1px_3px_rgba(18,_100,_255,_0.15)] focus:outline-none"
                placeholder="Пароль"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <Hide /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="font-medium-semibold relative mt-[4px] box-border flex w-full flex-row items-center justify-center rounded-radius-4xl bg-primary-300 px-6 py-3 text-center text-base text-base-white hover:bg-primary-400 disabled:bg-gray-300 disabled:text-gray-500"
          >
            {isPending ? "Авторизуемся..." : "Войти"}
          </button>

          {errorMessage && (
            <p className="flex items-center text-center text-small-regular text-alert-error-100">
              <div className="mr-2">
                <Alertcircle />
              </div>
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
