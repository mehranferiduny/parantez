export enum BadRequestExceptionMasseage{
  InValidLoginData="اطلاعات جهت ورود نادرست میباشد",
  InValidRegisterData="اطلاعات جهت ثبت نام نادرست میباشد",
  InValidExpierCode="کد ارسال شده هنور معتبر میباشد",
  BatTryAgen="مشکلی به وجود آمئه است مجددا تلاش نمایید"
}
export enum AuthMassege{
  AcontNotFind="حساب کاربری یافت نشد",
  ConfiltExistAcont="حساب کاربری وجود دارد لطفا وارد شوید",
  secessExsitCode="کد با موفقیت ذخیره شد",
  ExperidCode="کد تایید منقضی شده است مجدادا تلاش نمایید"
}
export enum PublicMassege{
  TryAgin="مجدادا تلاش نمایید",
  TryLogin="دوباره وارد حساب کاربری خود شوید",
  LogedIn="ورود موفقیت آمیز بود",
  Creaeted="با موفقیت ایجاد شد",
  Updaeted="با موفقیت ویرایش شد",
  Deleted="با موفقیت حذف شد",

}

export enum InvalidFormatMassage{
  InvalidFormatImage="عکس انتخاب شده باید فرمت آن jpg یا png باشد."
}
export enum ConflictExceptionMassage{
  categoryTitle="این دسته بندی از قبل ایجاد شده است",
  email="این ایمیل در دیتابیس موجود میباشد"
}

export enum NotFindMassege{
  NotCategory="دسته بندی یافت نشد!",
  NotPost="مقاله ای یافت نشد!",
  NotUser="کاربری یافت نشد!",
}