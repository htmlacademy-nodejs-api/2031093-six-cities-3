export const enum WeekDay {
  First = 1,
  Last = 7,
}

export const enum Rating {
  Min = 1,
  Max = 5,
  FloatingPointLength = 1,
}

export const enum MaxAdults {
  Min = 1,
  Max = 10,
}

export const enum Bedrooms {
  Min = 1,
  Max = 8,
}

export const enum Price {
  Min = 100,
  Max = 100000,
}

export const enum CommentsQuantity {
  Min = 0,
  Max = 4,
}

export enum Path {
  Root = '/',
  BundlesFavorite = '/bundles/favorite',
  BundlesPremium = '/bundles/premium',
  Login = '/login',
  CityId = '/:cityId',
  CityOffers = '/:cityId/offers',
  OfferId = '/:offerId',
  OfferComments = '/:offerId/comments',
  OfferImage = '/:offerId/image',
  OfferPreviewImage = '/:offerId/preview-image',
  Register = '/register',
  UserAvatar = '/:userId/avatar',
}

export enum Entity {
  CityId = 'cityId',
  Offer = 'Offer',
  OfferId = 'offerId',
  UserId = 'userId',
}

export enum ConfigService {
  JwtSecret = 'JWT_SECRET',
  Salt = 'SALT',
  UploadDirectory = 'UPLOAD_DIRECTORY',
}

export enum Property {
  _id = '$_id',
  Inc = '$inc',
  Cities = '$cities',
  Offers = '$offers',
  Set = '$set',
}

export enum Misc {
  Avatar = 'avatar',
  CityController = 'CityController',
  CommentController = 'CommentController',
  Image = 'image',
  Offers = 'offers',
  PreviewImage = 'previewImage',
  Unauthorized = 'Unauthorized',
  UserController = 'UserController',
}
