export enum BadRequestMessage {
    InValidLoginData = "اطلاعات ارسال شده برای ورود صحیح نمیباشد",
    InValidRegisterData = "اطلاعات ارسال شده برای ثبت نام صحیح نمیباشد",
    SomeThingWrong = "خطایی پیش امده مجددا تلاش کنید",
    InvalidEmail = "ایمیل وارد شده نادرست میباشد",
    InvalidCategories = "دسته بندی وارد شده نادرست میباشد",
    AlreadyAccepted = "این کامنت از قبل تایید شده است",
    AlreadyRejected = "این کامنت از قبل رد شده است",
}
export enum AuthMessage {
    NotFoundAccount = "حساب کاربری یافت نشد",
    TryAgain = "دوباره تلاش کنید",
    AlreadyExistAccount = "حساب کاربری در سامانه موجود است",
    ExpiredCode = "کد تایید منقضی شده است مجددا تلاش کنید",
    LoginAgain = "مجددا وارد حساب کاربری خود شوید",
    LoginIsRequired = "وارد حساب کاربری خود شوید",
    Blocked = "حساب کاربری شما مسدود شده است لطفا با پشتیبانی در میان بگذارید",

}
export enum NotFoundMessage {
    NotFound = "موردی یافت نشد",
    NotFoundCategory = "دسته بندی یافت نشد",
    NotFoundPost = "مقاله ای یافت نشد",
    NotFoundUser = "کاربر مورد نظر یافت نشد",
}
export enum ValidationMessage {
    InvalidImageFormat = "فرمت تصویر آپلود شده نادرست مباشد(PNG, JPG, JPEG)",
    InvalidEmailFormat = "ایمیل وارد شده نادرست میباشد",
    InvalidMobileFormat = "شماره تماس وارد شده نادرست میباشد"
}

export enum ConflictMessage {
    CategoryTitle = "عنوان دسته بندی قبلا ثبت شده است",
    Email = "ایمیل توسط شخص دیگری استفاده شده است",
    Phone = "موبایل وارد شده نادرست است",
    Username = "نام کاربری قبلا استفاده شده است",
}