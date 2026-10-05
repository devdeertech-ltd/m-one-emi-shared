// m-one-emi-shared/src/types.ts

/* ────────────────────────────────────────────────────────────
 * ENUMS — byte-identical to m-one-emi-server/prisma/schema.prisma.
 * Lowercase except CommandType and GeoEvent (UPPERCASE in schema).
 * ──────────────────────────────────────────────────────────── */

export const STAFF_ROLE_VALUES = ["admin", "moderator"] as const;
export type StaffRole = (typeof STAFF_ROLE_VALUES)[number];

export const CUSTOMER_STATUS_VALUES = [
  "pending",
  "active",
  "defaulted",
  "closed",
  "blacklisted",
] as const;
export type CustomerStatus = (typeof CUSTOMER_STATUS_VALUES)[number];

export const DOCUMENT_TYPE_VALUES = [
  "profile_photo",
  "nid_front",
  "nid_back",
  "signature",
  "device_photo",
  "other",
] as const;
export type DocumentType = (typeof DOCUMENT_TYPE_VALUES)[number];

export const RELATION_KIND_VALUES = [
  "spouse",
  "child",
  "father",
  "mother",
  "sibling",
  "nominee",
  "earning_member",
  "other",
] as const;
export type RelationKind = (typeof RELATION_KIND_VALUES)[number];

export const WORK_STATUS_VALUES = [
  "employed",
  "self_employed",
  "business",
  "unemployed",
  "student",
  "retired",
  "other",
] as const;
export type WorkStatus = (typeof WORK_STATUS_VALUES)[number];

export const DEVICE_STATUS_VALUES = [
  "pending",
  "enrolled",
  "active",
  "locked",
  "released",
  "lost",
  "retired",
] as const;
export type DeviceStatus = (typeof DEVICE_STATUS_VALUES)[number];

export const ENROLL_STATUS_VALUES = [
  "unused",
  "bound",
  "consumed",
  "revoked",
  "expired",
] as const;
export type EnrollStatus = (typeof ENROLL_STATUS_VALUES)[number];

export const PLAN_STATUS_VALUES = [
  "active",
  "completed",
  "defaulted",
  "cancelled",
] as const;
export type PlanStatus = (typeof PLAN_STATUS_VALUES)[number];

export const INSTALLMENT_STATUS_VALUES = [
  "pending",
  "partial",
  "paid",
  "overdue",
  "waived",
] as const;
export type InstallmentStatus = (typeof INSTALLMENT_STATUS_VALUES)[number];

export const PAY_METHOD_VALUES = [
  "cash",
  "bkash",
  "nagad",
  "bank",
  "other",
] as const;
export type PayMethod = (typeof PAY_METHOD_VALUES)[number];

export const COMMAND_TYPE_VALUES = [
  "LOCK",
  "UNLOCK",
  "LOCATE",
  "PLAY_ALARM",
  "STOP_ALARM",
  "SET_MESSAGE",
  "SYNC_POLICY",
  "SET_GEOFENCE",
  "RELEASE",
  "REBOOT",
  "WIPE_DISALLOW_TOGGLE",
] as const;
export type CommandType = (typeof COMMAND_TYPE_VALUES)[number];

export const COMMAND_STATUS_VALUES = [
  "queued",
  "sent",
  "acked",
  "failed",
  "expired",
] as const;
export type CommandStatus = (typeof COMMAND_STATUS_VALUES)[number];

export const GEO_EVENT_VALUES = ["EXIT", "ENTER"] as const;
export type GeoEvent = (typeof GEO_EVENT_VALUES)[number];

export const GEO_ACTION_VALUES = [
  "none",
  "warned",
  "locked",
  "ignored",
] as const;
export type GeoAction = (typeof GEO_ACTION_VALUES)[number];

export const OTP_PURPOSE_VALUES = [
  "email_verify",
  "password_reset",
  "email_change",
  "admin_reset",
  "customer_activate",
] as const;
export type OtpPurpose = (typeof OTP_PURPOSE_VALUES)[number];

export const APP_KIND_VALUES = ["dpc", "staff_app"] as const;
export type AppKind = (typeof APP_KIND_VALUES)[number];

/* ────────────────────────────────────────────────────────────
 * RESPONSE VIEW-MODELS — match actual server service returns.
 * Money (Prisma Decimal) serializes to STRING over JSON. Dates are ISO strings.
 * ──────────────────────────────────────────────────────────── */

/** customer.service.ts#list — select projection, take:100, no pagination envelope. */
export interface CustomerListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  areaId: string | null;
  createdAt: string; // ISO
}

/** device list rows (device.service.ts#list over the Device model, Decimal→string, dates ISO). */
export interface DeviceListItem {
  id: string;
  orgId: string;
  customerId: string | null;
  imei: string | null;
  serial: string | null;
  model: string | null;
  brand: string | null;
  status: DeviceStatus;
  assignedAreaId: string | null;
  lastSeenAt: string | null; // ISO
  lastLat: number | null;
  lastLng: number | null;
  offlineLockMin: number;
  simLockOnSwap: boolean;
}

/** emi_plan row. Decimal columns are strings. */
export interface PlanRow {
  id: string;
  customerId: string;
  deviceId: string | null; // null until the customer's phone enrolls
  deviceModel: string | null;
  commodityPrice: string; // Decimal(12,2)
  downPayment: string;
  financedAmount: string;
  emiAmount: string;
  termCount: number;
  dueDay: number;
  startDate: string; // ISO date
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
}

/** emi_installment row. */
export interface InstallmentRow {
  id: string;
  planId: string;
  seq: number;
  dueDate: string; // ISO date
  amount: string; // Decimal
  paidAmount: string; // Decimal
  status: InstallmentStatus;
  paidAt: string | null;
  deferred: boolean;
}

/** payment row. */
export interface PaymentRow {
  id: string;
  installmentId: string | null;
  planId: string;
  amount: string; // Decimal
  method: PayMethod;
  reference: string | null;
  paidAt: string; // ISO
  createdAt: string;
}

/**
 * billing.service.ts#get return: the plan row + included installments/payments
 * + the summary() fields (all strings via .toFixed(2)).
 */
export interface PlanDetail extends PlanRow {
  installments: InstallmentRow[];
  payments: PaymentRow[];
  totalPaid: string; // summary()
  outstanding: string; // summary()
  effectiveArrears: string; // summary() (deferred excluded)
}

/** device_command row (command.service.ts#list / #pending). */
export interface CommandRow {
  id: string;
  deviceId: string;
  type: CommandType;
  status: CommandStatus;
  issuedBy: string | null;
  issuedAt: string; // ISO
  sentAt: string | null;
  ackedAt: string | null;
}

/** analytics.service.ts#overview — exact nested shape; outstanding is a string. */
export interface AnalyticsOverview {
  customers: number;
  devices: {
    total: number;
    active: number;
    locked: number;
    lost: number;
  };
  plans: {
    active: number;
    completed: number;
  };
  overdueInstallments: number;
  outstanding: string; // Decimal .toFixed(2)
}

/** analytics.service.ts#earnings — monthly buckets; total is a string. */
export interface EarningsBucket {
  month: string; // 'YYYY-MM'
  total: string; // Decimal .toFixed(2)
}
export interface EarningsSeries {
  collected: EarningsBucket[];
  scheduled: EarningsBucket[];
}

/** device.service.ts#heartbeat policy block returned to the DPC. */
export interface DevicePolicy {
  status: DeviceStatus;
  locked: boolean;
  offlineLockMin: number;
  simLockOnSwap: boolean;
  /** first fence only; kept for DPC builds that predate `areas` */
  area: {
    centerLat: number | null;
    centerLng: number | null;
    radiusM: number | null;
  } | null;
  /** every circular fence the device may stay inside (device area + customer areas) */
  areas: { id: string; centerLat: number; centerLng: number; radiusM: number }[];
  /** true while the active plan has an overdue installment: leaving ALL areas locks locally */
  lockOutsideArea: boolean;
  /** ISO; after this instant the DPC treats the plan as overdue even while offline */
  overdueFrom: string | null;
}
export interface HeartbeatResult {
  simChanged: boolean;
  policy: DevicePolicy;
}
