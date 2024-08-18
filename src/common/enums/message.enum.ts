export enum BadRequestExceptionMasseage{
  InValidLoginData="اطلاعات جهت ورود نادرست میباشد",
  InValidRegisterData="اطلاعات جهت ثبت نام نادرست میباشد",
  InValidCategoryData="اطلاعات دسته بندی را به درستی وارد نمایید",
  InValidExpierCode="کد ارسال شده هنور معتبر میباشد",
  BatTryAgen="مشکلی به وجود آمده است مجددا تلاش نمایید",
  AllredyAcsepted="این دیدگاه قبلا تایید شده است",
  AllredyReject="این دیدگاه قبلا رد شده است"

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
  Like="مقاله لایک شد",
  Dislike="لایک مقاله برداشته شد",
  Bookmark="مقاله ذخیره شد",
  UnBookmark="مقاله از ذخیره شده ها خارج شد",
  CommentBlog="دیدگا با موفقیت ایجاد شد",
  RiportComment="دیدگاه حاوی کلمات رکیک میباشد لطفا اصلاح شود"

}

export enum InvalidFormatMassage{
  InvalidFormatImage="عکس انتخاب شده باید فرمت آن jpg یا png باشد.",
  InvalidEmail="ایمیل وارد شده صحیح نمیباشد",
  InvalidPhone="شماره موبایل وارد شده صحیح نمیباشد",
}
export enum ConflictExceptionMassage{
  categoryTitle="این دسته بندی از قبل ایجاد شده است",
  email="این ایمیل در دیتابیس موجود میباشد",
  phone="این شماره در دیتابیس موجود میباشد",
  username="این نام کاربری در دیتابیس موجود میباشد",
}

export enum NotFindMassege{
  NotCategory="دسته بندی یافت نشد!",
  NotPost="مقاله ای یافت نشد!",
  NotUser="کاربری یافت نشد!",
  NotComment="دیدگاهی بافت نشد"
}