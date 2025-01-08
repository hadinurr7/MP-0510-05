
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.1.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "6.1.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  fullname: 'fullname',
  password: 'password',
  phoneNumber: 'phoneNumber',
  profilePicture: 'profilePicture',
  address: 'address',
  role: 'role',
  referralCode: 'referralCode',
  totalPoints: 'totalPoints',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.ReferralScalarFieldEnum = {
  id: 'id',
  referrerId: 'referrerId',
  referredById: 'referredById',
  createdAt: 'createdAt'
};

exports.Prisma.VoucherScalarFieldEnum = {
  id: 'id',
  voucherCode: 'voucherCode',
  userId: 'userId',
  eventId: 'eventId',
  isUsed: 'isUsed',
  qty: 'qty',
  value: 'value',
  validFrom: 'validFrom',
  validUntil: 'validUntil',
  createdAt: 'createdAt'
};

exports.Prisma.CouponScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  code: 'code',
  isUsed: 'isUsed',
  value: 'value',
  validFrom: 'validFrom',
  validUntil: 'validUntil',
  createdAt: 'createdAt'
};

exports.Prisma.PointScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  pointEarned: 'pointEarned',
  validFrom: 'validFrom',
  validUntil: 'validUntil',
  createdAt: 'createdAt'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  name: 'name',
  thumbnail: 'thumbnail',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  startDate: 'startDate',
  endDate: 'endDate',
  price: 'price',
  availableSeats: 'availableSeats',
  userId: 'userId',
  cityId: 'cityId',
  categoryId: 'categoryId'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.CityScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  eventId: 'eventId',
  voucherId: 'voucherId',
  couponId: 'couponId',
  pointId: 'pointId',
  totalPrice: 'totalPrice',
  qty: 'qty',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  transactionId: 'transactionId',
  paymentMethod: 'paymentMethod',
  paymentStatus: 'paymentStatus',
  amount: 'amount',
  paymentProof: 'paymentProof',
  createdAt: 'createdAt',
  validUntil: 'validUntil'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  message: 'message',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  message: 'message',
  isRead: 'isRead',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  ORGANIZER: 'ORGANIZER',
  USER: 'USER'
};

exports.TransactionStatus = exports.$Enums.TransactionStatus = {
  WAITING: 'WAITING',
  VERIFYING: 'VERIFYING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  TRANSACTION: 'TRANSACTION',
  PROMOTION: 'PROMOTION',
  INFORMATION: 'INFORMATION'
};

exports.Prisma.ModelName = {
  User: 'User',
  Referral: 'Referral',
  Voucher: 'Voucher',
  Coupon: 'Coupon',
  Point: 'Point',
  Event: 'Event',
  Category: 'Category',
  City: 'City',
  Transaction: 'Transaction',
  Payment: 'Payment',
  Review: 'Review',
  Notification: 'Notification'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
